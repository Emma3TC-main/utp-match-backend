# Thunder Client - Guia MVP Local

Base URL:

http://localhost:3000/v1

## 1. Health

GET http://localhost:3000/v1/health
GET http://localhost:3000/v1/health/db
GET http://localhost:3000/v1/health/ai

## 2. Auth guest session

POST http://localhost:3000/v1/auth/guest-session

Body JSON:

{
  "displayName": "Sebas Demo",
  "source": "thunder-client",
  "metadata": {
    "flow": "local-test",
    "screen": "onboarding"
  }
}

Copiar:

data.session.accessToken

Probar sesion:

GET http://localhost:3000/v1/auth/me

Header:

Authorization: Bearer PEGAR_ACCESS_TOKEN

Logout:

POST http://localhost:3000/v1/auth/logout

Header:

Authorization: Bearer PEGAR_ACCESS_TOKEN

Body JSON:

{}

## 3. Profiles

Ver perfil demo:

GET http://localhost:3000/v1/profiles/me

Crear perfil:

POST http://localhost:3000/v1/profiles

Body JSON:

{
  "userId": "user-local-001",
  "firstName": "Sebas Demo",
  "schoolYear": "5_secundaria",
  "campusInterest": "Lima Centro",
  "ageBand": "16_17",
  "preferredLanguage": "es-PE",
  "familyShareEnabled": true,
  "interests": [
    "tecnologia",
    "datos",
    "crear aplicaciones"
  ],
  "strengths": [
    "pensamiento logico",
    "curiosidad",
    "persistencia"
  ],
  "concerns": [
    "matematica",
    "no conocer la malla real"
  ],
  "source": "thunder-client",
  "metadata": {
    "flow": "local-test",
    "screen": "profile-onboarding"
  }
}

## 4. Consents

GET http://localhost:3000/v1/consents/requirements

POST http://localhost:3000/v1/consents

Body JSON:

{
  "studentProfileId": "profile-demo-001",
  "consentType": "ai_processing",
  "version": "2026-06-v1",
  "granted": true,
  "source": "comparison_flow",
  "metadata": {
    "screen": "career-comparison",
    "flow": "local-test"
  }
}

## 5. Careers

GET http://localhost:3000/v1/careers
GET http://localhost:3000/v1/careers/software-engineering
GET http://localhost:3000/v1/careers/software-engineering/curriculum

## 6. Vocational Reports

POST http://localhost:3000/v1/vocational-reports

Body JSON:

{
  "studentProfileId": "profile-demo-001",
  "sourceType": "mock_demo",
  "reportDate": "2026-06-13",
  "topCareers": [
    {
      "careerId": "software-engineering",
      "name": "Ingenieria de Software",
      "score": 92,
      "confidence": 88,
      "reason": "Alta afinidad con tecnologia, logica, creacion digital y resolucion de problemas.",
      "tags": ["tecnologia", "programacion", "proyectos"]
    },
    {
      "careerId": "data-science",
      "name": "Ciencia de Datos",
      "score": 84,
      "confidence": 80,
      "reason": "Interes en datos, patrones, IA y analisis.",
      "tags": ["datos", "ia", "analitica"]
    },
    {
      "careerId": "industrial-engineering",
      "name": "Ingenieria Industrial",
      "score": 76,
      "confidence": 72,
      "reason": "Afinidad media con procesos, organizacion y mejora continua.",
      "tags": ["procesos", "gestion"]
    }
  ],
  "scores": {
    "technology": 92,
    "logic": 90,
    "communication": 68,
    "management": 74,
    "creativity": 80
  },
  "interests": [
    "crear aplicaciones",
    "inteligencia artificial",
    "resolver problemas"
  ],
  "strengths": [
    "pensamiento logico",
    "curiosidad tecnologica",
    "aprendizaje autonomo"
  ],
  "concerns": [
    "miedo a la matematica",
    "no conocer como seran los primeros ciclos"
  ],
  "context": {
    "source": "thunder-client-local-test"
  }
}

Copiar:

data.report.id

Recomendaciones:

GET http://localhost:3000/v1/vocational-reports/PEGAR_REPORT_ID/recommendations

## 7. Comparisons

POST http://localhost:3000/v1/comparisons

Body JSON:

{
  "studentProfileId": "profile-demo-001",
  "leftCareerId": "software-engineering",
  "rightCareerId": "industrial-engineering",
  "vocationalReportId": null,
  "audienceMode": "student",
  "explanationStyle": "clear_youthful",
  "includeSyllabusSignals": true,
  "context": {
    "source": "thunder-client-local-test"
  }
}

Copiar:

data.comparison.comparisonId

Luego:

GET http://localhost:3000/v1/comparisons/PEGAR_COMPARISON_ID

## 8. Syllabi

GET http://localhost:3000/v1/syllabi
GET http://localhost:3000/v1/syllabi/syl-soft-prog-1

Explicacion:

POST http://localhost:3000/v1/syllabi/syl-soft-prog-1/explanations

Body JSON:

{
  "studentProfileId": "profile-demo-001",
  "targetAudience": "student",
  "tone": "clear_youthful",
  "outputFormat": "structured_json",
  "includeDifficultySignals": true,
  "context": {
    "source": "thunder-client-local-test",
    "careerId": "software-engineering"
  }
}

## 9. Plans

POST http://localhost:3000/v1/plans

Body JSON:

{
  "studentProfileId": "profile-demo-001",
  "targetCareerId": "software-engineering",
  "comparisonId": "comparison-demo-001",
  "targetTerm": "2026-2",
  "tasks": [
    {
      "title": "Revisar Fundamentos de Programacion",
      "description": "Leer la explicacion del silabo y marcar dudas.",
      "type": "review_syllabus",
      "relatedSyllabusId": "syl-soft-prog-1"
    },
    {
      "title": "Hablar con mi familia",
      "description": "Compartir por que esta carrera encaja conmigo.",
      "type": "talk_family"
    }
  ],
  "notes": "Plan de prueba local desde Thunder Client.",
  "context": {
    "source": "thunder-client-local-test"
  }
}

Copiar:

data.plan.id
data.plan.tasks[0].id

Actualizar tarea:

PATCH http://localhost:3000/v1/plans/PEGAR_PLAN_ID/tasks/PEGAR_TASK_ID/status

Body JSON:

{
  "status": "done"
}

## 10. Shares

POST http://localhost:3000/v1/shares

Body JSON:

{
  "ownerProfileId": "profile-demo-001",
  "comparisonId": "comparison-demo-001",
  "planId": "plan-demo-001",
  "audience": "family",
  "title": "Resumen vocacional para mi familia",
  "summary": "Este resumen explica por que estoy comparando Ingenieria de Software e Ingenieria Industrial y que pasos seguire para decidir mejor.",
  "expiresAt": null,
  "metadata": {
    "source": "thunder-client-local-test",
    "screen": "family-share"
  }
}

Copiar:

data.share.token
data.share.shareUrl

Abrir resumen:

GET http://localhost:3000/v1/shares/PEGAR_TOKEN

Revocar:

PATCH http://localhost:3000/v1/shares/PEGAR_TOKEN/revoke

Body JSON:

{
  "reason": "El estudiante decidio dejar de compartir este resumen."
}

## 11. Events

POST http://localhost:3000/v1/events

Body JSON:

{
  "eventName": "comparison_created",
  "studentProfileId": "profile-demo-001",
  "sessionId": "session-local-001",
  "source": "thunder-client",
  "eventProps": {
    "comparisonId": "comparison-demo-001",
    "leftCareerId": "software-engineering",
    "rightCareerId": "industrial-engineering",
    "screen": "career-comparison"
  },
  "requestId": "req-local-001"
}

Copiar:

data.event.id

Luego:

GET http://localhost:3000/v1/events/PEGAR_EVENT_ID

## 12. Admin

GET http://localhost:3000/v1/admin/status
GET http://localhost:3000/v1/admin/catalog/overview

Crear carrera admin:

POST http://localhost:3000/v1/admin/catalog/careers

Body JSON:

{
  "id": "cybersecurity",
  "utpCode": "UTP-CYBER",
  "name": "Ingenieria de Ciberseguridad",
  "faculty": "Ingenieria",
  "studyMode": "Presencial / Semipresencial",
  "shortDescription": "Carrera orientada a proteger sistemas, redes, datos y servicios digitales.",
  "valueProposition": "Ideal para estudiantes interesados en seguridad digital, investigacion, redes y proteccion de informacion.",
  "tags": ["tecnologia", "seguridad", "redes", "datos"],
  "status": "draft"
}

Auditoria:

GET http://localhost:3000/v1/admin/audit-summary

## 13. AI

Prueba Gemini:

POST http://localhost:3000/v1/ai/test

Body JSON:

{
  "prompt": "Responde solo con OK si Gemini esta funcionando."
}

Pregunta con contexto:

POST http://localhost:3000/v1/ai/ask

Body JSON:

{
  "question": "Estoy entre Ingenieria de Software e Ingenieria Industrial. Me gusta la tecnologia, pero tambien organizar procesos. Que deberia explorar primero?",
  "careerIds": [
    "software-engineering",
    "industrial-engineering"
  ],
  "studentProfileId": "profile-demo-001",
  "maxContextItems": 8
}

Pregunta fuera de contexto:

{
  "question": "Cual es la mensualidad exacta de Ingenieria de Software este ano?",
  "careerIds": [
    "software-engineering"
  ],
  "maxContextItems": 6
}

La respuesta esperada debe decir que no hay informacion suficiente sobre mensualidades exactas.

## Validacion esperada

Cuando el body no cumple el DTO:

{
  "success": false,
  "error": {
    "code": "BODY_VALIDATION_ERROR"
  }
}

## Nota importante

Los IDs creados en runtime solo existen mientras npm run dev siga ejecutandose. Si se reinicia el backend, crear nuevamente los registros.