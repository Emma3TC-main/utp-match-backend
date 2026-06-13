# Cambios pendientes cuando tengamos Supabase y Chatly

## Supabase

Actualmente:

DATABASE_ENABLED=false

Cuando el dueño del Supabase comparta la URI correcta:

DATABASE_ENABLED=true
DATABASE_URL=URI_OFICIAL_DE_SUPABASE

Archivos relacionados:

src/config/env.ts
src/db/pool.ts
.env

Probar:

GET http://localhost:3000/v1/health/db

## Chatly AI

Actualmente:

CHATLY_ENABLED=false
CHATLY_API_KEY=PENDIENTE_CONFIGURAR

Cuando tengamos la API Key:

CHATLY_ENABLED=true
CHATLY_API_KEY=KEY_REAL

Archivos relacionados:

src/config/env.ts
src/modules/ai
.env

Probar:

GET http://localhost:3000/v1/health/ai

## Importante

No compartir públicamente DATABASE_URL, JWT_SECRET, CHATLY_API_KEY ni password de Supabase.
