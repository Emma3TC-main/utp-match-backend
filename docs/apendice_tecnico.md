# Apéndice técnico corregido y ampliado

## 1. Alcance técnico respetado

El alcance técnico se mantiene en un MVP realista para hackathon y preparado para evolución:

- Frontend: React / Tailwind, responsive y PWA simple.
- Backend MVP: Node.js + TypeScript como modular monolith REST-first.
- Persistencia: PostgreSQL/Supabase con núcleo relacional y `jsonb` para bordes semiestructurados.
- IA: Gemini AI como proveedor de recomendación, comparación y explicación de sílabos.
- Storage: object storage para PDFs de sílabos y reportes vocacionales.
- Auth: Supabase Auth o GCP IAM/JWT según implementación elegida.
- Deploy MVP: Vercel frontend + Railway backend, con ruta de madurez hacia GCP Cloud Run + Cloud SQL + Cloud Storage.

## 2. Decisiones de arquitectura

### REST-first

Se prioriza REST porque el MVP necesita contratos simples, testeables con Postman/cURL y fáciles de documentar con OpenAPI. GraphQL queda fuera del MVP porque incrementa complejidad operativa sin aportar valor directo a la demo.

### Modular monolith

El backend no se separa en microservicios para la hackathon. En su lugar se organiza por módulos:

- profile
- catalog
- vocational-report
- comparison
- syllabus
- plan
- sharing
- events
- admin
- ai-orchestration

Esta estructura permite evolucionar luego a servicios independientes si el volumen, los equipos o las integraciones lo justifican.

### Relacional + JSONB

El modelo usa tablas relacionales para entidades estables: usuarios, carreras, cursos, sílabos, comparaciones y planes. Usa `jsonb` para estructuras cambiantes:

- `scores_json`
- `top_careers_json`
- `parsed_json`
- `comparison_json`
- `explanation_json`
- `tasks_json`
- `event_props_json`

El backend debe validar esos JSON contra los schemas incluidos en `/json_schemas` antes de persistir.

## 3. Manejo de IA

### Principios

- No enviar más datos personales de los necesarios.
- Versionar prompts con `prompt_version`.
- Validar salida estructurada antes de guardar.
- Registrar latencia, proveedor, modelo, costo aproximado y fallback, pero no guardar prompts con PII sensible.
- Usar fallback determinístico si la IA falla.

### Casos de uso IA

| Caso | Entrada | Salida | Tabla destino |
|---|---|---|---|
| Comparación de carreras | Perfil, scores, malla, intensidades | `comparison_json` | `career_comparisons` |
| Explicación de sílabo | Curso, parsed_json, audiencia | `explanation_json` | `syllabus_explanations` |
| Plan sugerido | Carrera objetivo, dudas, comparación | `tasks_json` | `plans_of_action` |

## 4. Eventos analíticos sugeridos

| Evento | Propiedades mínimas | Uso |
|---|---|---|
| `profile_created` | source, is_guest | Activación |
| `vocational_report_created` | source_type, import_status | Uso del test/reporte |
| `career_selected` | career_id, position | Interés de carrera |
| `comparison_created` | left_career_id, right_career_id, ai_fallback | Valor principal |
| `syllabus_opened` | syllabus_id, course_id | Interés de curso |
| `syllabus_explained` | syllabus_id, cache_hit, provider | Uso IA |
| `plan_created` | target_career_id, task_count | Conversión a acción |
| `share_created` | audience, has_plan, has_comparison | Conversación familiar |

## 5. Seguridad y privacidad

### Roles

- `guest`: compara con límites, sin persistencia sensible.
- `student`: crea perfil, reporte, comparaciones y plan.
- `guardian`: accede a resúmenes compartidos.
- `advisor`: acompaña con lectura autorizada.
- `admin`: gestiona catálogo y sílabos.
- `system`: jobs e integraciones.

### Controles mínimos

- JWT obligatorio para endpoints privados.
- Rate limiting en endpoints IA.
- Validación estricta de request body.
- Sanitización de textos cargados desde PDF.
- Hash de tokens de enlaces compartidos; nunca guardar token plano.
- Enlace compartido con expiración y revocación.
- Logs sin passwords, tokens, secretos ni documentos completos.

## 6. Estructura recomendada del repositorio

```text
utp-match/
  apps/
    web/
      app/
      components/
      lib/api-client.ts
      lib/schema-guards.ts
    api/
      src/
        modules/
          auth/
          profiles/
          careers/
          vocational-reports/
          comparisons/
          syllabi/
          plans/
          shares/
          events/
          admin/
          ai/
        db/
        middlewares/
        schemas/
  infra/
    docker-compose.yml
    cloud-run/
  docs/
  plantuml/
  sql/
  json_schemas/
  openapi/
```

## 7. Orden de implementación sugerido

1. Crear schema PostgreSQL y seed de dos carreras piloto.
2. Implementar endpoints públicos `GET /careers` y `GET /careers/{id}/curriculum`.
3. Implementar sesión guest y perfil mínimo.
4. Implementar registro manual de reporte vocacional.
5. Implementar `POST /comparisons` con motor determinístico primero.
6. Integrar Chatly AI y validación JSON Schema.
7. Implementar explicación de sílabos.
8. Implementar plan de acción y resumen compartido.
9. Instrumentar eventos clave.
10. Preparar demo con storyboard y datos semilla.

## 8. Checklist para demo de hackathon

- Dos carreras piloto cargadas.
- Primer ciclo con cursos visibles.
- Comparación visual entre carreras.
- Explicación AI de al menos 6 cursos.
- Match narrativo usando reporte vocacional manual.
- Plan de acción guardable.
- Resumen compartible para familia.
- Métricas demo: comparación completada, sílabo explicado, plan creado.

## 9. Archivos incluidos en este paquete

- `/plantuml`: diagramas listos para renderizar.
- `/sql`: DDL físico y seed demo.
- `/json_schemas`: contratos JSON validables por backend.
- `/openapi`: especificación REST OpenAPI 3.1.
- `/scripts`: renderizado PlantUML y validación de schemas.
- `/docs`: diccionario de datos, contratos y apéndice técnico.
