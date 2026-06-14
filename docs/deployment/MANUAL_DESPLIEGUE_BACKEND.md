# Manual general de despliegue del backend - UTP Match / SyllabusX

## 1. Objetivo

Este documento describe los pasos generales para desplegar el backend de UTP Match / SyllabusX en un entorno remoto, dejando configurados los servicios principales del MVP:

- API REST Node.js + TypeScript.
- Supabase/PostgreSQL.
- Gemini como proveedor IA.
- Validación con Zod.
- Endpoints por módulos.
- IA con contexto desde JSON estático.
- Pruebas de salud y verificación post-despliegue.

Base local de desarrollo:

http://localhost:3000/v1

## 2. Requisitos previos

Antes del despliegue, se debe contar con:

- Repositorio actualizado en GitHub.
- Rama estable del backend.
- Node.js instalado en el entorno de despliegue.
- Variables de entorno configuradas.
- Proyecto Supabase activo.
- Base PostgreSQL accesible desde internet.
- API Key de Gemini activa.
- Frontend configurado para consumir la URL pública del backend.

## 3. Validación antes de desplegar

npm install
npm run build
git status --short

No debe aparecer .env.

## 4. Variables de entorno requeridas

PORT=3000
NODE_ENV=production
API_PREFIX=/v1

SUPABASE_URL=https://mbjkfxrtheuoixzxwity.supabase.co
SUPABASE_ANON_KEY=PEGAR_SUPABASE_PUBLISHABLE_KEY

DATABASE_ENABLED=true
DATABASE_URL=postgresql://USUARIO:CONTRASENA@HOST:PUERTO/postgres

JWT_SECRET=GENERAR_UN_STRING_LARGO_SEGURO

AI_ENABLED=true
AI_PROVIDER=gemini
AI_MODEL=gemini-3.1-flash-lite
AI_FALLBACK_PROVIDER=mock

GEMINI_API_KEY=PEGAR_GEMINI_API_KEY
GEMINI_TIMEOUT_MS=20000

FRONTEND_URL=https://URL_DEL_FRONTEND
MOBILE_URL=http://localhost:8081
CORS_ORIGIN=https://URL_DEL_FRONTEND,http://localhost:5173

No subir secretos al repositorio.

## 5. Supabase

Proyecto Supabase usado:

https://mbjkfxrtheuoixzxwity.supabase.co

Host PostgreSQL directo detectado:

db.mbjkfxrtheuoixzxwity.supabase.co

La variable crítica es DATABASE_URL.

## 6. Gemini

Proveedor IA usado:

AI_PROVIDER=gemini
AI_MODEL=gemini-3.1-flash-lite

Endpoints:

GET /v1/ai/status
POST /v1/ai/test
POST /v1/ai/ask

## 7. Comandos de despliegue

Install command:

npm install

Build command:

npm run build

Start command:

npm start

Si no existe npm start, agregar en package.json según la salida del build.

Ejemplo:

"start": "node dist/server.js"

No usar npm run dev en producción.

## 8. Orden general de despliegue

1. Subir cambios al repositorio.
2. Crear servicio backend en el proveedor elegido.
3. Conectar GitHub.
4. Seleccionar rama estable.
5. Configurar install/build/start.
6. Agregar variables de entorno.
7. Desplegar.
8. Revisar logs.
9. Probar endpoints de salud.

## 9. Verificación post-despliegue

GET https://URL_BACKEND/v1/health
GET https://URL_BACKEND/v1/health/db
GET https://URL_BACKEND/v1/health/ai

POST https://URL_BACKEND/v1/ai/test

Body:

{
  "prompt": "Responde solo con OK si Gemini está funcionando."
}

POST https://URL_BACKEND/v1/ai/ask

Body:

{
  "question": "Estoy entre Ingeniería de Software e Ingeniería Industrial. Me gusta la tecnología, pero también organizar procesos. ¿Qué debería explorar primero?",
  "careerIds": ["software-engineering", "industrial-engineering"],
  "studentProfileId": "profile-demo-001",
  "maxContextItems": 8
}

## 10. Endpoints principales

GET /v1/health
GET /v1/health/db
GET /v1/health/ai

GET /v1/auth/status
POST /v1/auth/guest-session
GET /v1/auth/me
POST /v1/auth/logout

POST /v1/profiles
GET /v1/profiles
GET /v1/profiles/me
PATCH /v1/profiles/me
GET /v1/profiles/:profileId
PATCH /v1/profiles/:profileId

GET /v1/consents/requirements
POST /v1/consents
GET /v1/consents
GET /v1/consents/:consentId
PATCH /v1/consents/:consentId/revoke

GET /v1/careers
GET /v1/careers/:careerId
GET /v1/careers/:careerId/curriculum

POST /v1/vocational-reports
GET /v1/vocational-reports
GET /v1/vocational-reports/:reportId
GET /v1/vocational-reports/:reportId/recommendations

POST /v1/comparisons
GET /v1/comparisons/:comparisonId

GET /v1/syllabi
GET /v1/syllabi/:syllabusId
POST /v1/syllabi/:syllabusId/explanations

POST /v1/plans
GET /v1/plans
GET /v1/plans/:planId
PATCH /v1/plans/:planId
PATCH /v1/plans/:planId/tasks/:taskId/status

POST /v1/shares
GET /v1/shares
GET /v1/shares/:token
PATCH /v1/shares/:token/revoke

POST /v1/events
GET /v1/events
GET /v1/events/:eventId

GET /v1/admin/status
GET /v1/admin/catalog/overview
POST /v1/admin/catalog/careers
POST /v1/admin/catalog/syllabi
GET /v1/admin/audit-summary

GET /v1/ai/status
POST /v1/ai/test
POST /v1/ai/ask

## 11. Configuración del frontend

Ejemplo:

VITE_API_BASE_URL=https://URL_BACKEND/v1

En backend actualizar:

FRONTEND_URL=https://URL_FRONTEND
CORS_ORIGIN=https://URL_FRONTEND,http://localhost:5173

## 12. Pruebas mínimas para aceptar despliegue

GET /v1/health
GET /v1/health/db
GET /v1/health/ai
POST /v1/ai/test
POST /v1/ai/ask
GET /v1/careers
POST /v1/comparisons
POST /v1/plans
POST /v1/shares

## 13. Errores comunes

DATABASE_CONNECTION_ERROR:
Revisar DATABASE_URL, host Supabase, password, puerto, red y DNS.

GEMINI_API_KEY_NOT_CONFIGURED:
Configurar GEMINI_API_KEY y reiniciar despliegue.

NOT_FOUND:
Revisar método HTTP, URL y prefijo /v1.

BODY_VALIDATION_ERROR:
Revisar DTO, campos obligatorios, enums y JSON válido.

## 14. Seguridad

- No subir .env.
- No registrar secretos en logs.
- Rotar claves expuestas.
- Usar HTTPS.
- Restringir CORS.
- Usar JWT_SECRET largo.
- Separar variables de desarrollo y producción.

## 15. Nota sobre datos mock

El MVP usa memoria local para varios módulos. Si se reinicia el backend, se pierden los registros creados en runtime.

La persistencia real debe conectarse luego con Supabase/PostgreSQL mediante repositorios.

## 16. Cierre

El backend queda listo para demo si compila, levanta, conecta con Supabase, conecta con Gemini, responde endpoints REST principales y el frontend puede consumir la URL pública.