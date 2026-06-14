# UTP Match Backend - Endpoints MVP Local

Base URL local:

http://localhost:3000/v1

## Módulos cubiertos

- Health
- Auth
- Profiles
- Consents
- Careers
- Vocational Reports
- Comparisons
- Syllabi
- Plans
- Shares
- Events
- Admin
- AI

## Health

GET /health
GET /health/db
GET /health/ai

## Auth

GET /auth/status
POST /auth/guest-session
GET /auth/me
POST /auth/logout

Auth actual es mock local. La sesión invitada devuelve accessToken tipo guest_...

Para /auth/me usar header:

Authorization: Bearer PEGAR_ACCESS_TOKEN

## Profiles

POST /profiles
GET /profiles
GET /profiles/me
PATCH /profiles/me
GET /profiles/:profileId
PATCH /profiles/:profileId

Perfil demo:

profile-demo-001

## Consents

GET /consents/requirements
POST /consents
GET /consents
GET /consents/:consentId
PATCH /consents/:consentId/revoke

Tipos de consentimiento:

terms
privacy
vocational_report_processing
ai_processing
family_share

## Careers

GET /careers
GET /careers?q=software
GET /careers?tag=ia
GET /careers/:careerId
GET /careers/:careerId/curriculum

Carreras mock disponibles:

software-engineering
industrial-engineering
data-science

## Vocational Reports

POST /vocational-reports
GET /vocational-reports
GET /vocational-reports/:reportId
GET /vocational-reports/:reportId/recommendations

Este módulo registra señales vocacionales, puntajes, intereses, fortalezas y preocupaciones.

## Comparisons

POST /comparisons
GET /comparisons/:comparisonId

Este módulo genera comparación mock validada entre dos carreras.

## Syllabi

GET /syllabi
GET /syllabi?careerId=software-engineering
GET /syllabi/:syllabusId
POST /syllabi/:syllabusId/explanations

Sílabos mock principales:

syl-soft-prog-1
syl-soft-math-1
syl-ind-intro
syl-data-stats-1

## Plans

POST /plans
GET /plans
GET /plans/:planId
PATCH /plans/:planId
PATCH /plans/:planId/tasks/:taskId/status

Soporta:

- Crear plan de acción.
- Listar planes.
- Actualizar notas o estado.
- Marcar tareas como pending, done o skipped.

## Shares

POST /shares
GET /shares
GET /shares/:token
PATCH /shares/:token/revoke

Sirve para compartir resumen con familia/tutor.

El POST /shares devuelve:

data.share.token
data.share.shareUrl

## Events

POST /events
GET /events
GET /events/:eventId

Sirve para registrar analítica del journey.

Ejemplos de eventos:

comparison_created
syllabus_explanation_created
plan_created
share_created
consent_granted

## Admin

GET /admin/status
GET /admin/catalog/overview
POST /admin/catalog/careers
POST /admin/catalog/syllabi
GET /admin/audit-summary

Sirve como base mock para mantenimiento de catálogo y sílabos.

## AI

GET /ai/status
POST /ai/test
POST /ai/ask

POST /ai/test prueba Gemini.

POST /ai/ask usa Gemini con contexto desde JSON estático:

src/modules/ai/knowledge/utp-match.knowledge.json

## Botones del frontend cubiertos

Guardar plan:

POST /plans

Compartir resumen:

POST /shares

Home:

GET /profiles/me
GET /careers

Compare:

POST /comparisons
GET /comparisons/:comparisonId

Match:

POST /ai/ask
POST /vocational-reports
GET /vocational-reports/:reportId/recommendations

Plan:

GET /plans?studentProfileId=profile-demo-001
PATCH /plans/:planId/tasks/:taskId/status

Preguntar por becas/modalidad:

POST /ai/ask

Nota: Para becas/modalidades todavía no existe módulo específico. Por ahora se usa IA con JSON estático y la respuesta debe evitar inventar datos exactos.

## Validación

Cuando un body no cumple los DTOs, el backend devuelve:

{
  "success": false,
  "error": {
    "code": "BODY_VALIDATION_ERROR",
    "message": "El body enviado no es válido."
  }
}

## Datos en memoria

Los módulos mock usan memoria local. Si se reinicia el backend, se pierden los registros creados durante la ejecución.