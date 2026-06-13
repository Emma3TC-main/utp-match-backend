# Base de datos

## Responsabilidad

Esta carpeta centraliza la conexión del backend con Supabase/PostgreSQL.

Archivo principal:

src/db/pool.ts

## Variables requeridas

DATABASE_ENABLED=true
DATABASE_URL=valor_local_no_versionado

## Healthcheck

GET http://localhost:3000/v1/health/db

Respuesta esperada:

{
  "success": true,
  "data": {
    "databaseEnabled": true,
    "database": "connected",
    "message": "Conexión a Supabase/PostgreSQL verificada."
  },
  "meta": {}
}

## Qué hace pool.ts

- Crea el pool de PostgreSQL.
- Lee DATABASE_URL desde src/config/env.ts.
- Usa SSL para Supabase.
- Ejecuta consultas mediante query().
- Valida conexión mediante checkDatabaseConnection().

## Qué NO debe hacer pool.ts

pool.ts no debe contener lógica de Gemini, IA, prompts, modelos ni API keys.

Gemini pertenece al módulo src/modules/ai.

## Seguridad

No colocar la URL real de Supabase en este README ni en ningún archivo versionado.
