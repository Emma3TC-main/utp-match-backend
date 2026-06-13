# Diccionario de datos - UTP Match / SyllabusX

## Convenciones

- `uuid`: identificador global generado con `gen_random_uuid()`.
- `jsonb`: datos semiestructurados validados por JSON Schema en backend.
- Fechas: `timestamptz` para eventos con hora; `date` para fecha de reporte o vencimiento.
- Datos sensibles: se minimizan en logs y en payloads enviados al proveedor IA.

## Tablas núcleo

### users
Identidad técnica y rol base.

| Campo | Tipo | Reglas | Descripción |
|---|---:|---|---|
| id | uuid | PK | Identificador del usuario. |
| email | text | unique, nullable solo guest | Correo de usuario. |
| role | user_role | guest/student/guardian/advisor/admin/system | Control de autorización. |
| auth_provider | text | not null | Proveedor de identidad: supabase, google, guest, etc. |
| external_auth_id | text | nullable | ID externo si aplica. |
| status | account_status | active/inactive/blocked/deleted | Estado de cuenta. |
| created_at / updated_at | timestamptz | default now | Auditoría temporal. |

### student_profiles
Perfil vocacional y preferencias del estudiante.

| Campo | Tipo | Reglas | Descripción |
|---|---:|---|---|
| id | uuid | PK | Perfil del estudiante. |
| user_id | uuid | FK users, unique | Un perfil por usuario estudiante. |
| first_name | text | nullable | Nombre visible. |
| school_year | text | check | 4_secundaria, 5_secundaria, egresado u otro. |
| campus_interest | text | nullable | Sede/campus de interés. |
| age_band | text | nullable | Banda de edad, no edad exacta para minimizar datos. |
| preferred_language | text | default es-PE | Idioma/locale. |
| family_share_enabled | boolean | default false | Permite compartir resumen. |

### consent_records
Registro versionado de consentimiento.

| Campo | Tipo | Reglas | Descripción |
|---|---:|---|---|
| id | uuid | PK | Consentimiento puntual. |
| student_profile_id | uuid | FK | Perfil que otorga consentimiento. |
| consent_type | text | check | terms, privacy, AI, reporte, sharing. |
| version | text | not null | Versión legal aceptada. |
| granted_at | timestamptz | default now | Fecha de aceptación. |
| revoked_at | timestamptz | nullable | Revocación. |
| evidence_json | jsonb | default {} | IP truncada, user_agent reducido, etc. |

### vocational_reports
Resultado vocacional importado o digitado.

| Campo | Tipo | Reglas | Descripción |
|---|---:|---|---|
| id | uuid | PK | Reporte vocacional. |
| student_profile_id | uuid | FK | Dueño del reporte. |
| source_type | text | check | manual, utp_pdf, utp_json, advisor_entry, mock_demo. |
| report_date | date | nullable | Fecha del reporte si se conoce. |
| top_careers_json | jsonb | array | Carreras sugeridas y puntajes. |
| scores_json | jsonb | object | Dimensiones vocacionales. |
| raw_file_url | text | nullable | Archivo original en object storage. |
| import_status | text | check | Estado de procesamiento. |

### careers
Carreras publicables.

| Campo | Tipo | Reglas | Descripción |
|---|---:|---|---|
| id | uuid | PK | Carrera. |
| utp_code | text | unique | Código institucional si existe. |
| name | text | not null | Nombre de carrera. |
| faculty | text | nullable | Facultad. |
| study_mode | text | check nullable | presencial, semipresencial, virtual, mixta. |
| status | text | active/draft/inactive/archived | Publicación. |
| short_description | text | nullable | Descripción corta para cards. |
| tags_json | jsonb | array | Tags de búsqueda y UI. |

### courses
Cursos maestros reutilizables.

| Campo | Tipo | Reglas | Descripción |
|---|---:|---|---|
| id | uuid | PK | Curso. |
| utp_code | text | unique | Código institucional. |
| name | text | not null | Nombre. |
| credits | integer | >= 0 | Créditos. |
| area | text | check | Matemática, programación, gestión, etc. |
| summary | text | nullable | Resumen corto. |
| skill_tags_json | jsonb | array | Habilidades asociadas. |

### career_courses
Relación carrera-curso-ciclo.

| Campo | Tipo | Reglas | Descripción |
|---|---:|---|---|
| id | uuid | PK | Instancia del curso en una carrera. |
| career_id | uuid | FK careers | Carrera. |
| course_id | uuid | FK courses | Curso. |
| cycle_number | integer | 1..14 | Ciclo. |
| is_required | boolean | default true | Obligatorio/electivo. |
| sequence_order | integer | > 0 | Orden dentro del ciclo. |
| intensity_json | jsonb | object | Intensidad math/coding/management/etc. |

### syllabi
Versiones de sílabos por curso en carrera.

| Campo | Tipo | Reglas | Descripción |
|---|---:|---|---|
| id | uuid | PK | Sílabo. |
| career_course_id | uuid | FK | Curso en carrera. |
| version_label | text | unique por career_course | Versión académica. |
| pdf_url | text | nullable | URL del PDF. |
| pdf_hash | text | not null | Hash para cache/duplicados. |
| extracted_text | text | nullable | Texto extraído. |
| parsed_json | jsonb | object | Outcomes, temas, evaluación. |
| published_at | timestamptz | nullable | Fecha de publicación. |

### career_comparisons
Resultado guardado del duelo de carreras.

| Campo | Tipo | Reglas | Descripción |
|---|---:|---|---|
| id | uuid | PK | Comparación. |
| student_profile_id | uuid | FK | Estudiante. |
| left_career_id/right_career_id | uuid | FK careers | Carreras comparadas. |
| vocational_report_id | uuid | FK nullable | Reporte usado. |
| audience_mode | text | check | student/family/advisor. |
| explanation_style | text | check implícito backend | Tono de explicación. |
| comparison_json | jsonb | schema CareerComparisonResponse | Resultado AI + determinístico. |

### plans_of_action
Tareas accionables posteriores a la comparación.

| Campo | Tipo | Reglas | Descripción |
|---|---:|---|---|
| id | uuid | PK | Plan. |
| student_profile_id | uuid | FK | Estudiante. |
| target_career_id | uuid | FK careers | Carrera objetivo. |
| target_term | text | nullable | Periodo de postulación. |
| status | plan_status | draft/active/completed/archived | Estado. |
| tasks_json | jsonb | schema ActionPlan.tasks | Lista de tareas. |
| notes | text | nullable | Notas libres. |

### event_logs / audit_logs / ai_request_logs
Tablas operativas para analítica, seguridad y observabilidad. No deben contener secretos, tokens ni PII sensible sin anonimizar.
