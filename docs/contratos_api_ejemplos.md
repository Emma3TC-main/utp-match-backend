# Contratos API detallados - UTP Match

Base URL MVP: `https://api.utpmatch.local/v1`

Autenticación: `Authorization: Bearer <JWT>` excepto endpoints públicos marcados como guest/public.

## POST /v1/comparisons

Genera comparación entre dos carreras con contexto vocacional.

### Request

```http
POST /v1/comparisons
Authorization: Bearer <JWT>
Content-Type: application/json
```

```json
{
  "studentProfileId": "0d611730-cdbc-4ce5-b188-24dd3c7d6f1f",
  "leftCareerId": "34f6f3cf-3f27-4459-a413-65ecd21954e0",
  "rightCareerId": "44c35809-14a2-4daf-b63d-4a54d7288268",
  "vocationalReportId": "2fd00e80-b33b-4f14-94f7-3bd67a1bd199",
  "audienceMode": "student",
  "explanationStyle": "clear_youthful",
  "includeSyllabusSignals": true
}
```

### Response 201

```json
{
  "comparisonId": "0dd182c3-cd5c-4afe-bf50-f43f7f9ff7f8",
  "summary": "Ingeniería de Sistemas exige más lógica y código desde temprano; Ingeniería Industrial combina matemática con procesos y gestión.",
  "dimensions": {
    "left": { "math": 55, "coding": 70, "management": 15, "communication": 10, "practice": 80 },
    "right": { "math": 45, "coding": 10, "management": 40, "communication": 20, "practice": 70 }
  },
  "careerHighlights": [
    {
      "careerId": "34f6f3cf-3f27-4459-a413-65ecd21954e0",
      "title": "Más construcción digital",
      "body": "Tendrás más cursos donde resuelves problemas con lógica, algoritmos y software."
    }
  ],
  "fitNarrative": "Tu perfil muestra buena perseverancia y razonamiento abstracto, por lo que ambos caminos son viables; Industrial parece más alineada con procesos y Sistemas con prueba/error técnico.",
  "risksOrWarnings": [
    "No decidas solo por el nombre de la carrera; revisa cursos reales del primer ciclo."
  ],
  "recommendedQuestions": [
    "¿Disfrutas iterar hasta resolver errores técnicos?",
    "¿Te imaginas optimizando personas y procesos?",
    "¿Qué te interesa más: construir software o mejorar operaciones?"
  ],
  "nextBestActions": [
    "Abrir el sílabo de Principios de Algoritmos.",
    "Comparar el curso de Introducción a Procesos.",
    "Conversar el resumen con tu familia."
  ],
  "modelMetadata": {
    "provider": "chatly_ai",
    "model": "chatly-reasoner-mini",
    "promptVersion": "comparison-v1.0.0",
    "fallbackUsed": false
  },
  "createdAt": "2026-06-12T18:20:00Z"
}
```

## POST /v1/syllabi/{syllabusId}/explanations

Traduce un sílabo o curso a lenguaje claro y devuelve señales de dificultad.

### Request

```json
{
  "studentProfileId": "0d611730-cdbc-4ce5-b188-24dd3c7d6f1f",
  "targetAudience": "student",
  "tone": "clear_youthful",
  "outputFormat": "structured_json",
  "includeDifficultySignals": true,
  "includeFitComment": true
}
```

### Response 200

```json
{
  "syllabusId": "9f5f8b5f-1e1c-41bd-a4c8-0d057f5207f8",
  "courseName": "Principios de Algoritmos",
  "plainExplanation": "Aquí aprenderás a enseñarle a una computadora a resolver problemas paso a paso.",
  "whyItMatters": "Es la base para apps, automatización, análisis de datos y pensamiento lógico.",
  "difficultySignals": {
    "practiceIntensity": 8,
    "readingIntensity": 4,
    "abstractReasoning": 7,
    "frustrationTolerance": 8
  },
  "skillsYouBuild": [
    "pensamiento lógico",
    "descomposición de problemas",
    "persistencia ante errores"
  ],
  "exampleActivities": [
    "Resolver ejercicios paso a paso.",
    "Crear pequeños algoritmos para situaciones cotidianas."
  ],
  "fitComment": "Tu puntaje de perseverancia favorece este curso porque requiere ensayo y corrección.",
  "recommendedPreparation": [
    "Repasar lógica básica.",
    "Practicar ejercicios cortos de patrones."
  ],
  "modelMetadata": {
    "provider": "chatly_ai",
    "model": "chatly-reasoner-mini",
    "promptVersion": "syllabus-explainer-v1.0.0",
    "cacheHit": false
  }
}
```

## POST /v1/plans

Crea un plan accionable para convertir la comparación en próximos pasos.

```json
{
  "studentProfileId": "0d611730-cdbc-4ce5-b188-24dd3c7d6f1f",
  "targetCareerId": "34f6f3cf-3f27-4459-a413-65ecd21954e0",
  "targetTerm": "2026-2",
  "tasks": [
    {
      "title": "Revisar el sílabo de Principios de Algoritmos",
      "description": "Leer la explicación simple y anotar dudas.",
      "type": "review_syllabus",
      "status": "pending"
    },
    {
      "title": "Conversar la comparación con mi familia",
      "type": "talk_family",
      "status": "pending"
    }
  ],
  "notes": "Estoy entre Sistemas e Industrial."
}
```
