# Documentación de carpeta

## Estado actual

Esta carpeta forma parte del backend local de UTP Match.

El backend ya puede ejecutarse localmente con:

npm run dev

Base local:

http://localhost:3000/v1

## Configuración local actual

Por ahora el backend puede funcionar sin Supabase ni Chatly usando:

DATABASE_ENABLED=false
CHATLY_ENABLED=false

Esto permite avanzar endpoints, módulos, documentación y pruebas locales sin depender todavía de servicios externos.

## Qué cambiar cuando tengamos Supabase correcto

Editar el archivo .env en la raíz del backend:

DATABASE_ENABLED=true
DATABASE_URL=URI_OFICIAL_DE_SUPABASE

Luego reiniciar:

npm run dev

Y probar:

GET http://localhost:3000/v1/health/db

## Qué cambiar cuando tengamos Chatly API Key

Editar el archivo .env:

CHATLY_ENABLED=true
CHATLY_API_KEY=KEY_REAL_DE_CHATLY

Luego probar:

GET http://localhost:3000/v1/health/ai

## Regla de seguridad

No colocar valores reales de .env, DATABASE_URL, JWT_SECRET, CHATLY_API_KEY ni contraseñas dentro de archivos .md.
