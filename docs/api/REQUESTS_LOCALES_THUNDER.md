# Requests locales para Thunder Client

## Base URL

http://localhost:3000/v1

## Health general

GET http://localhost:3000/v1/health

## Health de base de datos

GET http://localhost:3000/v1/health/db

## Health IA

GET http://localhost:3000/v1/health/ai

## Status IA

GET http://localhost:3000/v1/ai/status

## Test real Gemini

POST http://localhost:3000/v1/ai/test

Header:

Content-Type: application/json

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

## Nota

Este endpoint prueba una llamada real desde el backend hacia Gemini.

No se debe exponer GEMINI_API_KEY al frontend.
