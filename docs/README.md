# UTP Match Backend - Documentacion

Documentacion local del backend MVP.

## Guias principales

- docs/setup/README.md: configuracion local, Supabase, Gemini y comandos base.
- docs/api/ENDPOINTS_MVP_LOCAL.md: resumen de endpoints MVP.
- docs/api/THUNDER_CLIENT_MVP.md: guia de pruebas en Thunder Client.
- docs/ai/AI_PROVIDER_GEMINI_MVP.md: configuracion de proveedor Gemini.
- docs/ai/AI_KNOWLEDGE_STATIC_JSON.md: funcionamiento de IA con JSON estatico.

## Base local

http://localhost:3000/v1

## Estado MVP

El backend tiene implementados los modulos:

- Health.
- Auth.
- Profiles.
- Consents.
- Careers.
- Vocational Reports.
- Comparisons.
- Syllabi.
- Plans.
- Shares.
- Events.
- Admin.
- AI con Gemini + JSON estatico.

## Comandos principales

npm install
npm run build
npm run dev

## Validaciones rapidas

GET /v1/health
GET /v1/health/db
GET /v1/health/ai
POST /v1/ai/test
POST /v1/ai/ask

## Nota

No subir .env al repositorio. Usar .env.example como referencia y compartir secretos por canales seguros.