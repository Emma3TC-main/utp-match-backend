# IA con conocimiento estatico - UTP Match / SyllabusX

El endpoint:

POST /v1/ai/ask

usa Gemini con contexto inyectado desde:

src/modules/ai/knowledge/utp-match.knowledge.json

## Estado actual

La API de Gemini ya esta conectada y probada desde:

POST /v1/ai/test

Respuesta esperada:

success true
provider gemini
model gemini-3.1-flash-lite
generatedText OK

## Por que usamos JSON estatico

Para el MVP de hackathon y por limites de uso del modelo gratuito, el backend no conecta todavia Gemini directamente con todos los modulos ni con la base de datos.

En esta etapa, el JSON funciona como base de conocimiento controlada.

## Flujo actual

Frontend / Thunder Client
-> POST /v1/ai/ask
-> Backend lee utp-match.knowledge.json
-> Backend selecciona contexto relevante
-> Backend arma prompt
-> Gemini genera respuesta
-> Backend devuelve answer + usedContext

## Que contiene el JSON

- Proposito del producto.
- Reglas de respuesta.
- Carreras disponibles.
- Silabos disponibles.
- Senales de dificultad.
- Recomendaciones de preparacion.
- Retos o advertencias por carrera.

## Que no hace

Gemini no se entrena permanentemente con estos datos.

Cada request manda el contexto necesario en el prompt. Si el contexto no contiene una respuesta, la IA debe indicar que no tiene informacion suficiente.

## Pruebas realizadas

### Comparacion de carreras

{
  "question": "Estoy entre Ingenieria de Software e Ingenieria Industrial. Me gusta la tecnologia, pero tambien organizar procesos. Que deberia explorar primero?",
  "careerIds": [
    "software-engineering",
    "industrial-engineering"
  ],
  "studentProfileId": "profile-demo-001",
  "maxContextItems": 8
}

Resultado esperado:

- Debe comparar ambas carreras.
- Debe mencionar tecnologia, creacion, procesos y organizacion.
- Debe cerrar con un siguiente paso practico.

### Pregunta fuera de contexto

{
  "question": "Cual es la mensualidad exacta de Ingenieria de Software este ano?",
  "careerIds": [
    "software-engineering"
  ],
  "maxContextItems": 6
}

Resultado esperado:

- Debe indicar que no tiene informacion suficiente sobre mensualidades exactas.
- Debe sugerir revisar canales oficiales o hablar con un asesor.
- No debe inventar costos.

## Informacion que puede crecer en el JSON

- Mas carreras UTP.
- Mas silabos y cursos por ciclo.
- Modalidades generales.
- Becas como mensaje controlado.
- Reglas para familia/tutor.
- Preguntas frecuentes.
- Glosario de terminos.
- Mensajes de seguridad para evitar inventar informacion sensible.

## Evolucion posterior

Cuando el MVP crezca, el contexto puede venir de:

- CareersService.
- SyllabiService.
- ProfilesService.
- VocationalReportsService.
- Supabase/PostgreSQL.
- Vector search o embeddings.

Para el MVP actual, el JSON estatico es suficiente y mas controlable.