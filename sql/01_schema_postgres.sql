-- UTP Match / SyllabusX - PostgreSQL physical schema
-- Compatible con PostgreSQL/Supabase. Ejecutar en una base limpia.

create extension if not exists "pgcrypto";

-- =========================
-- Enumeraciones controladas
-- =========================
do $$ begin
  create type user_role as enum ('guest','student','guardian','advisor','admin','system');
exception when duplicate_object then null; end $$;

do $$ begin
  create type account_status as enum ('active','inactive','blocked','deleted');
exception when duplicate_object then null; end $$;

do $$ begin
  create type plan_status as enum ('draft','active','completed','archived');
exception when duplicate_object then null; end $$;

-- =========================
-- Función updated_at
-- =========================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =========================
-- Identidad y perfil
-- =========================
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  role user_role not null default 'student',
  auth_provider text not null default 'supabase',
  external_auth_id text,
  status account_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint users_email_required_for_non_guest check (role = 'guest' or email is not null)
);

create trigger trg_users_updated_at
before update on users
for each row execute function set_updated_at();

create table if not exists student_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  first_name text,
  school_year text not null default '5_secundaria',
  campus_interest text,
  age_band text,
  preferred_language text not null default 'es-PE',
  family_share_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint chk_school_year check (school_year in ('4_secundaria','5_secundaria','egresado','otro')),
  constraint chk_age_band check (age_band is null or age_band in ('under_16','16_17','18_plus','unknown'))
);

create trigger trg_student_profiles_updated_at
before update on student_profiles
for each row execute function set_updated_at();

create table if not exists consent_records (
  id uuid primary key default gen_random_uuid(),
  student_profile_id uuid not null references student_profiles(id) on delete cascade,
  consent_type text not null,
  version text not null,
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  evidence_json jsonb not null default '{}'::jsonb,
  constraint chk_consent_type check (consent_type in ('terms','privacy','vocational_report_processing','ai_processing','family_share'))
);

-- =========================
-- Reporte vocacional
-- =========================
create table if not exists vocational_reports (
  id uuid primary key default gen_random_uuid(),
  student_profile_id uuid not null references student_profiles(id) on delete cascade,
  source_type text not null,
  report_date date,
  top_careers_json jsonb not null default '[]'::jsonb,
  scores_json jsonb not null default '{}'::jsonb,
  raw_file_url text,
  import_status text not null default 'manual',
  created_at timestamptz not null default now(),
  constraint chk_source_type check (source_type in ('manual','utp_pdf','utp_json','advisor_entry','mock_demo')),
  constraint chk_import_status check (import_status in ('manual','uploaded','parsed','failed'))
);

-- =========================
-- Catálogo académico
-- =========================
create table if not exists careers (
  id uuid primary key default gen_random_uuid(),
  utp_code text unique,
  name text not null,
  faculty text,
  study_mode text,
  status text not null default 'active',
  short_description text,
  tags_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint chk_career_status check (status in ('draft','active','inactive','archived')),
  constraint chk_study_mode check (study_mode is null or study_mode in ('presencial','semipresencial','virtual','mixta'))
);

create trigger trg_careers_updated_at
before update on careers
for each row execute function set_updated_at();

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  utp_code text unique,
  name text not null,
  credits integer not null default 0,
  area text not null,
  summary text,
  skill_tags_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint chk_credits_non_negative check (credits >= 0),
  constraint chk_course_area check (area in ('matematica','programacion','gestion','comunicacion','ciencias','humanidades','especialidad','empleabilidad','otro'))
);

create trigger trg_courses_updated_at
before update on courses
for each row execute function set_updated_at();

create table if not exists career_courses (
  id uuid primary key default gen_random_uuid(),
  career_id uuid not null references careers(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  cycle_number integer not null,
  is_required boolean not null default true,
  sequence_order integer not null,
  intensity_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint chk_cycle_number check (cycle_number between 1 and 14),
  constraint chk_sequence_order check (sequence_order > 0),
  constraint uq_career_course_cycle unique (career_id, course_id, cycle_number)
);

create table if not exists syllabi (
  id uuid primary key default gen_random_uuid(),
  career_course_id uuid not null references career_courses(id) on delete cascade,
  version_label text not null,
  pdf_url text,
  pdf_hash text not null,
  extracted_text text,
  parsed_json jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  constraint uq_syllabus_version unique (career_course_id, version_label)
);

create table if not exists syllabus_explanations (
  id uuid primary key default gen_random_uuid(),
  syllabus_id uuid not null references syllabi(id) on delete cascade,
  target_audience text not null default 'student',
  provider text not null default 'chatly_ai',
  model text not null,
  prompt_version text not null,
  explanation_json jsonb not null,
  created_at timestamptz not null default now(),
  constraint chk_target_audience check (target_audience in ('student','family','advisor'))
);

-- =========================
-- Comparaciones, planes y sharing
-- =========================
create table if not exists career_comparisons (
  id uuid primary key default gen_random_uuid(),
  student_profile_id uuid not null references student_profiles(id) on delete cascade,
  left_career_id uuid not null references careers(id),
  right_career_id uuid not null references careers(id),
  vocational_report_id uuid references vocational_reports(id) on delete set null,
  audience_mode text not null default 'student',
  explanation_style text not null default 'clear_youthful',
  comparison_json jsonb not null,
  created_at timestamptz not null default now(),
  constraint chk_distinct_careers check (left_career_id <> right_career_id),
  constraint chk_audience_mode check (audience_mode in ('student','family','advisor'))
);

create table if not exists plans_of_action (
  id uuid primary key default gen_random_uuid(),
  student_profile_id uuid not null references student_profiles(id) on delete cascade,
  target_career_id uuid not null references careers(id),
  target_term text,
  status plan_status not null default 'draft',
  tasks_json jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_plans_updated_at
before update on plans_of_action
for each row execute function set_updated_at();

create table if not exists shared_links (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references student_profiles(id) on delete cascade,
  comparison_id uuid references career_comparisons(id) on delete cascade,
  plan_id uuid references plans_of_action(id) on delete cascade,
  token_hash text not null unique,
  audience text not null default 'family',
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  constraint chk_shared_link_target check (comparison_id is not null or plan_id is not null),
  constraint chk_shared_audience check (audience in ('family','advisor','public_demo'))
);

-- =========================
-- Analítica, auditoría y AI logs
-- =========================
create table if not exists event_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  event_name text not null,
  event_props_json jsonb not null default '{}'::jsonb,
  request_id text,
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references users(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id uuid,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists ai_request_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  provider text not null default 'chatly_ai',
  model text not null,
  use_case text not null,
  prompt_version text not null,
  input_token_estimate integer,
  output_token_estimate integer,
  latency_ms integer,
  cache_hit boolean not null default false,
  status text not null default 'ok',
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint chk_ai_use_case check (use_case in ('career_comparison','syllabus_explanation','plan_generation')),
  constraint chk_ai_status check (status in ('ok','fallback','failed','validation_failed'))
);

-- =========================
-- Índices recomendados
-- =========================
create index if not exists idx_users_role on users(role);
create index if not exists idx_student_profiles_user on student_profiles(user_id);
create index if not exists idx_consent_profile_type on consent_records(student_profile_id, consent_type, revoked_at);
create index if not exists idx_vocational_reports_profile on vocational_reports(student_profile_id, created_at desc);
create index if not exists idx_vocational_reports_scores_json on vocational_reports using gin (scores_json);
create index if not exists idx_vocational_reports_top_careers_json on vocational_reports using gin (top_careers_json);
create index if not exists idx_careers_status on careers(status);
create index if not exists idx_careers_tags_json on careers using gin (tags_json);
create index if not exists idx_courses_area on courses(area);
create index if not exists idx_courses_skill_tags_json on courses using gin (skill_tags_json);
create index if not exists idx_career_courses_career_cycle on career_courses(career_id, cycle_number, sequence_order);
create index if not exists idx_syllabi_career_course on syllabi(career_course_id);
create index if not exists idx_syllabi_parsed_json on syllabi using gin (parsed_json);
create index if not exists idx_syllabus_explanations_lookup on syllabus_explanations(syllabus_id, target_audience, provider, model, prompt_version);
create index if not exists idx_comparisons_profile_created on career_comparisons(student_profile_id, created_at desc);
create index if not exists idx_comparisons_json on career_comparisons using gin (comparison_json);
create index if not exists idx_plans_profile_status on plans_of_action(student_profile_id, status);
create index if not exists idx_plans_tasks_json on plans_of_action using gin (tasks_json);
create index if not exists idx_shared_links_token_hash on shared_links(token_hash);
create index if not exists idx_event_logs_event_created on event_logs(event_name, created_at desc);
create index if not exists idx_event_logs_props on event_logs using gin (event_props_json);
create index if not exists idx_audit_logs_resource on audit_logs(resource_type, resource_id, created_at desc);
create index if not exists idx_ai_logs_usecase_created on ai_request_logs(use_case, created_at desc);

-- =========================
-- Vistas útiles para frontend
-- =========================
create or replace view v_career_curriculum as
select
  c.id as career_id,
  c.name as career_name,
  c.faculty,
  cc.cycle_number,
  cc.sequence_order,
  co.id as course_id,
  co.name as course_name,
  co.credits,
  co.area,
  co.summary,
  co.skill_tags_json,
  cc.intensity_json,
  s.id as syllabus_id,
  s.version_label as syllabus_version
from careers c
join career_courses cc on cc.career_id = c.id
join courses co on co.id = cc.course_id
left join syllabi s on s.career_course_id = cc.id
where c.status = 'active'
order by c.name, cc.cycle_number, cc.sequence_order;
