# AI Provider - Gemini para MVP

## Decisión técnica

Se reemplazó la configuración específica anterior por un adaptador genérico de IA.

Proveedor principal para el MVP:

AI_PROVIDER=gemini
AI_MODEL=gemini-3.1-flash-lite

Fallback para demo:

AI_FALLBACK_PROVIDER=mock

## Variables de entorno

AI_ENABLED=true
AI_PROVIDER=gemini
AI_MODEL=gemini-3.1-flash-lite
AI_FALLBACK_PROVIDER=mock
GEMINI_API_KEY=valor_local_no_versionado
GEMINI_TIMEOUT_MS=20000

## Endpoints relacionados

GET /v1/health/ai
GET /v1/ai/status
POST /v1/ai/test

## Uso en el MVP

Gemini se usará para:

- Explicación de sílabos.
- Comparación de carreras.
- Generación de recomendaciones vocacionales.
- Apoyo en planes de acción.

## Seguridad

Nunca escribir la API Key real en archivos .md, código fuente, commits, screenshots o mensajes públicos.
