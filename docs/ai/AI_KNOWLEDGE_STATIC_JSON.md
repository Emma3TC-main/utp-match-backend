# IA con conocimiento estático - UTP Match / SyllabusX

El endpoint:

POST /v1/ai/ask

usa Gemini con contexto inyectado desde:

src/modules/ai/knowledge/utp-match.knowledge.json

## Por qué usamos JSON estático

Para el MVP de hackathon y por límites de uso del modelo gratuito, el backend no conecta todavía Gemini directamente con todos los módulos ni con la base de datos.

En esta etapa, el JSON funciona como base de conocimiento controlada.

## Flujo actual

Frontend / Thunder Client
-> POST /v1/ai/ask
-> Backend lee utp-match.knowledge.json
-> Backend selecciona contexto relevante
-> Backend arma prompt
-> Gemini genera respuesta
-> Backend devuelve answer + usedContext

## Qué contiene el JSON

- Propósito del producto.
- Reglas de respuesta.
- Carreras disponibles.
- Sílabos disponibles.
- Señales de dificultad.
- Recomendaciones de preparación.
- Retos o advertencias por carrera.

## Qué no hace

Gemini no se entrena permanentemente con estos datos.

Cada request manda el contexto necesario en el prompt. Si el contexto no contiene una respuesta, la IA debe indicar que no tiene información suficiente.

## Prueba recomendada

POST /v1/ai/ask

Body JSON:

{
  "question": "¿Cuál es la mensualidad exacta de Ingeniería de Software este año?",
  "careerIds": [
    "software-engineering"
  ],
  "maxContextItems": 6
}

La respuesta esperada debe indicar que no hay información suficiente sobre mensualidades exactas y sugerir revisar canales oficiales o hablar con un asesor.

## Evolución posterior

Cuando el MVP crezca, el contexto puede venir de:

- CareersService
- SyllabiService
- ProfilesService
- VocationalReportsService
- Supabase/PostgreSQL
- Vector search o embeddings

Para el MVP actual, el JSON estático es suficiente y más controlable.
