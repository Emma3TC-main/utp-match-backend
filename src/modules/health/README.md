# Módulo Health

## Responsabilidad

Este módulo expone endpoints de diagnóstico para validar el estado del backend local.

## Endpoints

GET /v1/health
GET /v1/health/db
GET /v1/health/ai

## Health general

GET http://localhost:3000/v1/health

Valida servicio activo, entorno, base de datos y proveedor IA.

## Health DB

GET http://localhost:3000/v1/health/db

Valida la conexión real con Supabase/PostgreSQL.

## Health IA

GET http://localhost:3000/v1/health/ai

Valida la configuración de Gemini.

## Seguridad

Los healthchecks pueden indicar si una key está configurada, pero nunca deben devolver su valor.
