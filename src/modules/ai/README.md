# Módulo AI

## Responsabilidad

Este módulo centraliza la configuración y prueba del proveedor IA del backend.

Proveedor actual: Gemini

Modelo actual para MVP: gemini-3.1-flash-lite

## Variables relacionadas

AI_ENABLED=true
AI_PROVIDER=gemini
AI_MODEL=gemini-3.1-flash-lite
AI_FALLBACK_PROVIDER=mock
GEMINI_API_KEY=valor_local_no_versionado
GEMINI_TIMEOUT_MS=20000

## Endpoints actuales

GET /v1/ai/status
POST /v1/ai/test

## Test real Gemini

POST http://localhost:3000/v1/ai/test

Body JSON:

{
  "prompt": "Responde solo con OK si Gemini está funcionando."
}

## Siguiente evolución

Separar la lógica en:

src/modules/ai/gemini.provider.ts
src/modules/ai/mock.provider.ts
src/modules/ai/ai.service.ts
src/modules/ai/schemas

Luego conectar Gemini a:

POST /v1/syllabi/{syllabusId}/explanations
POST /v1/comparisons
POST /v1/plans

## Seguridad

La API Key de Gemini solo vive en .env.

Nunca debe enviarse al frontend ni subirse al repositorio.
