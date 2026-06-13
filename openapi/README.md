# OpenAPI

## Archivo principal

openapi/utp_match_openapi.yaml

## Estado

El contrato OpenAPI fue actualizado para reflejar el entorno actual del backend:

- Supabase/PostgreSQL.
- AI Provider Adapter.
- Gemini como proveedor principal para el MVP.
- Fallback mock.
- Healthchecks de base de datos e IA.

## Endpoints relevantes

GET /health
GET /health/db
GET /health/ai
GET /ai/status
POST /ai/test

## Modelo IA documentado

gemini-3.1-flash-lite

## Regla

El OpenAPI documenta el contrato REST del backend.

No debe incluir claves reales, tokens ni URLs privadas con credenciales.
