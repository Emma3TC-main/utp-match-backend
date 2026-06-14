# Setup local - UTP Match Backend

Backend local para UTP Match / SyllabusX.

Base local:

http://localhost:3000/v1

## Estado actual del backend

El backend ya cuenta con:

- Express + TypeScript.
- Validación con Zod.
- Supabase/PostgreSQL conectado.
- Gemini conectado como proveedor IA.
- Endpoints REST por módulos.
- IA con conocimiento estático desde JSON.
- Thunder Client probado para endpoints principales.

## Variables de entorno

Crear archivo .env desde .env.example:

Copy-Item ".env.example" ".env"
notepad .env

Configuración recomendada para desarrollo local:

PORT=3000
NODE_ENV=development
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

FRONTEND_URL=http://localhost:5173
MOBILE_URL=http://localhost:8081
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://localhost:8081

## Supabase

Proyecto Supabase usado en local:

https://mbjkfxrtheuoixzxwity.supabase.co

Host PostgreSQL directo detectado:

db.mbjkfxrtheuoixzxwity.supabase.co

Si /health/db falla con error DNS, revisar:

- Conectividad a internet.
- DNS local.
- VPN.
- Red IPv4/IPv6.
- Que DATABASE_URL tenga el host y password correctos.
- Que DATABASE_ENABLED=true.

## Gemini

Proveedor IA usado:

AI_PROVIDER=gemini
AI_MODEL=gemini-3.1-flash-lite

La API key real se configura en:

GEMINI_API_KEY=PEGAR_GEMINI_API_KEY

No subir la API key al repositorio.

## Instalar dependencias

npm install

## Compilar

npm run build

## Ejecutar en desarrollo

npm run dev

Salida esperada:

UTP Match Backend running on http://localhost:3000/v1

## Probar salud del backend

En CMD:

curl.exe http://localhost:3000/v1/health
curl.exe http://localhost:3000/v1/health/db
curl.exe http://localhost:3000/v1/health/ai

En PowerShell:

Invoke-RestMethod http://localhost:3000/v1/health
Invoke-RestMethod http://localhost:3000/v1/health/db
Invoke-RestMethod http://localhost:3000/v1/health/ai

## Probar Gemini

Invoke-RestMethod `
  -Method POST `
  -Uri "http://localhost:3000/v1/ai/test" `
  -ContentType "application/json" `
  -Body '{"prompt":"Responde solo con OK si Gemini está funcionando."}'

Respuesta esperada:

success true
provider gemini
generatedText OK

## Probar IA con contexto

Invoke-RestMethod `
  -Method POST `
  -Uri "http://localhost:3000/v1/ai/ask" `
  -ContentType "application/json" `
  -Body '{
    "question": "Estoy entre Ingeniería de Software e Ingeniería Industrial. Me gusta la tecnología, pero también organizar procesos. ¿Qué debería explorar primero?",
    "careerIds": ["software-engineering", "industrial-engineering"],
    "studentProfileId": "profile-demo-001",
    "maxContextItems": 8
  }'

El endpoint usa:

src/modules/ai/knowledge/utp-match.knowledge.json

## Nota sobre datos mock

Varios módulos usan almacenamiento en memoria con Map.

Si se reinicia npm run dev, se pierden los registros creados en runtime:

- auth sessions
- profiles creados en runtime
- consents
- vocational-reports
- comparisons
- syllabi explanations
- plans
- shares
- events
- admin catalog records

Para probar de nuevo, crear registros nuevos desde Thunder Client.