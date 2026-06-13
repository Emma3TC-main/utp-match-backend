# Documento reemplazado

Este documento quedó reemplazado por la configuración actual de Supabase y Gemini.

## Estado actualizado

- Supabase/PostgreSQL ya está conectado.
- Gemini quedó como proveedor IA principal.
- El fallback mock queda disponible para demo.
- La prueba real contra Gemini ya fue validada mediante POST /v1/ai/test.

## Documentos actuales

docs/setup/00_ESTADO_ACTUAL_LOCAL.md
docs/ai/AI_PROVIDER_GEMINI_MVP.md
docs/api/REQUESTS_LOCALES_THUNDER.md
src/modules/ai/README.md
src/modules/health/README.md
src/db/README.md

## Seguridad

No colocar claves reales en documentación.

No versionar .env.

Variables sensibles:

- DATABASE_URL
- JWT_SECRET
- GEMINI_API_KEY
- Contraseñas de Supabase
- Tokens
