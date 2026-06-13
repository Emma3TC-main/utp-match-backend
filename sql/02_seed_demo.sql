-- Seed demo para hackathon: dos carreras piloto y cursos de primer ciclo.

insert into careers (utp_code, name, faculty, study_mode, status, short_description, tags_json)
values
('SIST', 'Ingeniería de Sistemas e Informática', 'Ingeniería', 'presencial', 'active', 'Diseña y construye soluciones digitales, software, datos y automatización.', '["software","datos","logica","tecnologia"]'),
('IND', 'Ingeniería Industrial', 'Ingeniería', 'presencial', 'active', 'Optimiza procesos, operaciones, calidad y gestión de organizaciones.', '["procesos","gestion","operaciones","mejora continua"]')
on conflict (utp_code) do update set
  name = excluded.name,
  short_description = excluded.short_description,
  tags_json = excluded.tags_json;

insert into courses (utp_code, name, credits, area, summary, skill_tags_json)
values
('MAT001', 'Matemática para Ingeniería I', 4, 'matematica', 'Base de álgebra, funciones y razonamiento cuantitativo para cursos de ingeniería.', '["razonamiento cuantitativo","abstraccion","practica"]'),
('COM001', 'Comunicación Efectiva', 3, 'comunicacion', 'Desarrollo de lectura, argumentación y comunicación académica.', '["argumentacion","lectura","presentacion"]'),
('ALG001', 'Principios de Algoritmos', 4, 'programacion', 'Introducción a resolver problemas paso a paso y traducirlos a lógica computacional.', '["logica","programacion","persistencia"]'),
('PRO001', 'Introducción a Procesos', 3, 'gestion', 'Comprensión de procesos, operaciones y mejora continua en organizaciones.', '["procesos","gestion","analisis"]'),
('ING001', 'Introducción a la Ingeniería', 2, 'especialidad', 'Panorama de la profesión, retos reales y formas de pensar de un ingeniero.', '["orientacion","proyectos","etica"]')
on conflict (utp_code) do update set
  name = excluded.name,
  summary = excluded.summary,
  skill_tags_json = excluded.skill_tags_json;

with c as (select id, utp_code from careers), co as (select id, utp_code from courses)
insert into career_courses (career_id, course_id, cycle_number, is_required, sequence_order, intensity_json)
select c.id, co.id, x.cycle_number, true, x.sequence_order, x.intensity_json::jsonb
from (values
  ('SIST','MAT001',1,1,'{"math":8,"coding":1,"management":1,"communication":2,"practice":7}'),
  ('SIST','ALG001',1,2,'{"math":6,"coding":9,"management":1,"communication":2,"practice":9}'),
  ('SIST','COM001',1,3,'{"math":1,"coding":1,"management":2,"communication":8,"practice":5}'),
  ('SIST','ING001',1,4,'{"math":3,"coding":3,"management":3,"communication":5,"practice":4}'),
  ('IND','MAT001',1,1,'{"math":7,"coding":1,"management":2,"communication":2,"practice":7}'),
  ('IND','PRO001',1,2,'{"math":4,"coding":1,"management":8,"communication":5,"practice":6}'),
  ('IND','COM001',1,3,'{"math":1,"coding":1,"management":3,"communication":8,"practice":5}'),
  ('IND','ING001',1,4,'{"math":3,"coding":1,"management":5,"communication":5,"practice":4}')
) as x(career_code, course_code, cycle_number, sequence_order, intensity_json)
join c on c.utp_code = x.career_code
join co on co.utp_code = x.course_code
on conflict (career_id, course_id, cycle_number) do update set
  sequence_order = excluded.sequence_order,
  intensity_json = excluded.intensity_json;

insert into syllabi (career_course_id, version_label, pdf_url, pdf_hash, extracted_text, parsed_json, published_at)
select cc.id, 'demo-2026', 'gs://utp-match-demo/syllabi/' || co.utp_code || '.pdf', md5(co.utp_code || '-demo-2026'),
       co.summary,
       jsonb_build_object(
         'learning_outcomes', jsonb_build_array('Comprender fundamentos', 'Aplicar conceptos en ejercicios', 'Relacionar el curso con la carrera'),
         'weekly_topics', jsonb_build_array('Introducción', 'Fundamentos', 'Aplicación guiada', 'Proyecto corto'),
         'assessment', jsonb_build_array('Prácticas', 'Trabajo aplicado', 'Examen')
       ),
       now()
from career_courses cc
join courses co on co.id = cc.course_id
on conflict (career_course_id, version_label) do update set
  parsed_json = excluded.parsed_json,
  extracted_text = excluded.extracted_text;
