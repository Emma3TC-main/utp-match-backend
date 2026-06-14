# UTP Match Backend - Endpoints MVP Local

Base URL local:

http://localhost:3000/v1

## Health

GET /health
GET /health/db
GET /health/ai

## Auth

GET /auth/status
POST /auth/guest-session
GET /auth/me
POST /auth/logout

## Profiles

POST /profiles
GET /profiles
GET /profiles/me
PATCH /profiles/me
GET /profiles/:profileId
PATCH /profiles/:profileId

## Consents

GET /consents/requirements
POST /consents
GET /consents
GET /consents/:consentId
PATCH /consents/:consentId/revoke

## Careers

GET /careers
GET /careers?q=software
GET /careers?tag=ia
GET /careers/:careerId
GET /careers/:careerId/curriculum

## Vocational Reports

POST /vocational-reports
GET /vocational-reports
GET /vocational-reports/:reportId
GET /vocational-reports/:reportId/recommendations

## Comparisons

POST /comparisons
GET /comparisons/:comparisonId

## Syllabi

GET /syllabi
GET /syllabi?careerId=software-engineering
GET /syllabi/:syllabusId
POST /syllabi/:syllabusId/explanations

## Plans

POST /plans
GET /plans
GET /plans/:planId
PATCH /plans/:planId
PATCH /plans/:planId/tasks/:taskId/status

## Shares

POST /shares
GET /shares
GET /shares/:token
PATCH /shares/:token/revoke

## Events

POST /events
GET /events
GET /events/:eventId

## Admin

GET /admin/status
GET /admin/catalog/overview
POST /admin/catalog/careers
POST /admin/catalog/syllabi
GET /admin/audit-summary

## AI

GET /ai/status
POST /ai/test
POST /ai/ask

## Nota

Los módulos usan almacenamiento en memoria para el MVP local. Si se reinicia npm run dev, se pierden los registros creados durante la ejecución.
