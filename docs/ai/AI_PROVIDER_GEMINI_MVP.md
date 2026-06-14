# Proveedor IA - Gemini MVP

El backend usa Gemini como proveedor IA principal.

## Variables requeridas

AI_ENABLED=true
AI_PROVIDER=gemini
AI_MODEL=gemini-3.1-flash-lite
AI_FALLBACK_PROVIDER=mock
GEMINI_API_KEY=PEGAR_GEMINI_API_KEY
GEMINI_TIMEOUT_MS=20000

## Endpoints IA

GET /v1/ai/status
POST /v1/ai/test
POST /v1/ai/ask

## Probar estado

GET http://localhost:3000/v1/ai/status

Debe devolver:

success true
enabled true
provider gemini
model gemini-3.1-flash-lite
geminiApiKeyConfigured true

## Probar Gemini

POST http://localhost:3000/v1/ai/test

Body JSON:

{
  "prompt": "Responde solo con OK si Gemini esta funcionando."
}

Respuesta esperada:

success true
provider gemini
generatedText OK

## Preguntar con contexto

POST http://localhost:3000/v1/ai/ask

Body JSON:

{
  "question": "Que diferencia hay entre Ingenieria de Software e Ingenieria Industrial?",
  "careerIds": [
    "software-engineering",
    "industrial-engineering"
  ],
  "studentProfileId": "profile-demo-001",
  "maxContextItems": 8
}

El backend:

1. Lee el JSON estatico de conocimiento.
2. Selecciona contexto relevante.
3. Construye un prompt.
4. Llama a Gemini.
5. Devuelve answer y usedContext.

## Limitaciones actuales

- No se conecta todavia con modulos reales.
- No consulta Supabase para conocimiento dinamico.
- No usa embeddings.
- No guarda memoria entre preguntas.
- El contexto se envia en cada request.

## Motivo

Para el MVP y por limites del modelo gratuito, se usa JSON estatico controlado.