# Thunder Client - Pruebas MVP Local

Base URL:

http://localhost:3000/v1

## 1. Health

GET http://localhost:3000/v1/health
GET http://localhost:3000/v1/health/db
GET http://localhost:3000/v1/health/ai

## 2. AI Test

POST http://localhost:3000/v1/ai/test

Body JSON:

{
  "prompt": "Responde solo con OK si Gemini está funcionando."
}

Respuesta esperada:

success true y generatedText OK.

## 3. AI Ask con contexto

POST http://localhost:3000/v1/ai/ask

Body JSON:

{
  "question": "Estoy entre Ingeniería de Software e Ingeniería Industrial. Me gusta la tecnología, pero también organizar procesos. ¿Qué debería explorar primero?",
  "careerIds": [
    "software-engineering",
    "industrial-engineering"
  ],
  "studentProfileId": "profile-demo-001",
  "maxContextItems": 8
}

Debe responder usando información de:

src/modules/ai/knowledge/utp-match.knowledge.json

## 4. AI Ask fuera de contexto

POST http://localhost:3000/v1/ai/ask

Body JSON:

{
  "question": "¿Cuál es la mensualidad exacta de Ingeniería de Software este año?",
  "careerIds": [
    "software-engineering"
  ],
  "maxContextItems": 6
}

Resultado esperado:

La IA debe indicar que no tiene información suficiente sobre mensualidades exactas y recomendar revisar canales oficiales o hablar con un asesor.

## 5. Careers

GET http://localhost:3000/v1/careers
GET http://localhost:3000/v1/careers/software-engineering
GET http://localhost:3000/v1/careers/software-engineering/curriculum

## 6. Comparisons

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

Luego copiar:

data.comparison.comparisonId

Y probar:

GET http://localhost:3000/v1/comparisons/PEGAR_COMPARISON_ID

## 7. Syllabi

GET http://localhost:3000/v1/syllabi
GET http://localhost:3000/v1/syllabi/syl-soft-prog-1

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

## 8. Plans

POST http://localhost:3000/v1/plans

Body JSON:

{
  "studentProfileId": "profile-demo-001",
  "targetCareerId": "software-engineering",
  "comparisonId": "comparison-demo-001",
  "targetTerm": "2026-2",
  "tasks": [
    {
      "title": "Revisar Fundamentos de Programación",
      "description": "Leer la explicación del sílabo y marcar dudas.",
      "type": "review_syllabus",
      "relatedSyllabusId": "syl-soft-prog-1"
    },
    {
      "title": "Hablar con mi familia",
      "description": "Compartir por qué esta carrera encaja conmigo.",
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

## 9. Shares

POST http://localhost:3000/v1/shares

Body JSON:

{
  "ownerProfileId": "profile-demo-001",
  "comparisonId": "comparison-demo-001",
  "planId": "plan-demo-001",
  "audience": "family",
  "title": "Resumen vocacional para mi familia",
  "summary": "Este resumen explica por qué estoy comparando Ingeniería de Software e Ingeniería Industrial y qué pasos seguiré para decidir mejor.",
  "expiresAt": null,
  "metadata": {
    "source": "thunder-client-local-test",
    "screen": "family-share"
  }
}

Copiar:

data.share.token

Abrir resumen:

GET http://localhost:3000/v1/shares/PEGAR_TOKEN

Revocar:

PATCH http://localhost:3000/v1/shares/PEGAR_TOKEN/revoke

Body JSON:

{
  "reason": "El estudiante decidió dejar de compartir este resumen."
}

## 10. Validación esperada

Cuando un body no cumple el DTO, el backend devuelve:

{
  "success": false,
  "error": {
    "code": "BODY_VALIDATION_ERROR"
  }
}
