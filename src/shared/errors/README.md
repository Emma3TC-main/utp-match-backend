# Documentación de carpeta

## Estado actual

Esta carpeta forma parte del backend local de UTP Match.

El backend ya puede ejecutarse localmente con:

npm run dev

Base local:

http://localhost:3000/v1

## Configuración local actual

El backend quedó actualizado con:

- Supabase/PostgreSQL conectado.
- Gemini configurado como proveedor IA principal.
- Fallback mock preparado para demo.
- Healthchecks funcionando.
- Endpoint de prueba real contra Gemini funcionando.
- Variables sensibles fuera de Git.

## Variables principales

DATABASE_ENABLED=true
AI_ENABLED=true
AI_PROVIDER=gemini
AI_MODEL=gemini-3.1-flash-lite
AI_FALLBACK_PROVIDER=mock
GEMINI_TIMEOUT_MS=20000

## Rutas principales

GET http://localhost:3000/v1/health
GET http://localhost:3000/v1/health/db
GET http://localhost:3000/v1/health/ai
GET http://localhost:3000/v1/ai/status
POST http://localhost:3000/v1/ai/test

## Prueba real de Gemini

Endpoint:

POST http://localhost:3000/v1/ai/test

Body JSON:

{
  "prompt": "Responde solo con OK si Gemini está funcionando."
}

Respuesta esperada:

{
  "success": true,
  "data": {
    "provider": "gemini",
    "model": "gemini-3.1-flash-lite",
    "generatedText": "OK"
  },
  "meta": {}
}

## Seguridad

No colocar valores reales de .env, DATABASE_URL, JWT_SECRET, GEMINI_API_KEY ni contraseñas dentro de archivos .md.

El archivo .env no debe subirse al repositorio.

El archivo .env.example solo debe contener placeholders.
