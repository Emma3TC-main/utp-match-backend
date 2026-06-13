# Requests locales para probar backend

Base URL:

http://localhost:3000

## Sin token

GET http://localhost:3000/v1
GET http://localhost:3000/v1/modules
GET http://localhost:3000/v1/health
GET http://localhost:3000/v1/health/db
GET http://localhost:3000/v1/health/ai
GET http://localhost:3000/v1/careers
GET http://localhost:3000/v1/careers/software-engineering
GET http://localhost:3000/v1/careers/software-engineering/curriculum
GET http://localhost:3000/v1/syllabi/demo-syllabus-1
GET http://localhost:3000/v1/admin/status
GET http://localhost:3000/v1/ai/status

## Crear invitado

POST http://localhost:3000/v1/auth/guest

Body:

{
  "displayName": "Sebas"
}

## Con token

Header:

Authorization: Bearer TU_ACCESS_TOKEN
Content-Type: application/json

GET http://localhost:3000/v1/auth/me
GET http://localhost:3000/v1/profiles/me
PATCH http://localhost:3000/v1/profiles/me
POST http://localhost:3000/v1/vocational-reports
GET http://localhost:3000/v1/vocational-reports/latest
POST http://localhost:3000/v1/comparisons
POST http://localhost:3000/v1/syllabi/demo-syllabus-1/explain
POST http://localhost:3000/v1/plans
GET http://localhost:3000/v1/plans/mock-plan-1
POST http://localhost:3000/v1/shares
