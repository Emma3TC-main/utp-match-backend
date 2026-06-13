# 🗺️ Bitácora de Arquitectura y Diseño - UTP Match (MVP)

¡Bienvenidos al centro de control del proyecto! Este directorio contiene toda la documentación visual (diagramas PlantUML) que define cómo funciona **UTP Match**. 

El objetivo de estos documentos es mantener a todo el equipo alineado, evitar la sobreingeniería y tener claro el contrato entre el frontend, el backend y los servicios de IA. Si tienes dudas sobre cómo se conecta algo o qué hace un módulo, busca el diagrama correspondiente aquí abajo.

---

## 🏗️ 1. Arquitectura y Visión Global
*Si necesitas entender cómo se estructuran las piezas del proyecto a nivel macro o dónde se alojan.*

* **[`01_arquitectura_logica.puml`](./01_arquitectura_logica.puml)**
    * **¿Qué encontrarás?** El mapa de alto nivel de nuestros módulos (Capa de experiencia, Seguridad, Backend monolítico y Datos).
    * **¿Qué resuelve?** Ayuda a entender rápidamente quién hace qué y cómo se orquesta la comunicación principal sin entrar en detalles de código.
* **[`02_arquitectura_fisica.puml`](./02_arquitectura_fisica.puml)**
    * **¿Qué encontrarás?** Nuestro mapa de infraestructura (Vercel, Railway/Cloud Run, Supabase, APIs externas).
    * **¿Qué resuelve?** Define dónde está desplegada cada pieza en la nube. Útil para configuración de entornos y despliegues (DevOps).
* **[`03_arquitectura_detallada_componentes.puml`](./03_arquitectura_detallada_componentes.puml)**
    * **¿Qué encontrarás?** El desglose interno de la app (módulos de Next.js, controladores de Node.js, validadores de Zod y el orquestador de IA).
    * **¿Qué resuelve?** Es el mapa de batalla para los desarrolladores. Sirve para saber exactamente qué componente debe llamar a qué módulo interno.
* **[`13_despliegue_gcp.puml`](./13_despliegue_gcp.puml)**
    * **¿Qué encontrarás?** La topología de red y servicios para escalar el producto post-hackaton usando Google Cloud Platform.
    * **¿Qué resuelve?** Demuestra visión a largo plazo para los jurados (listos para producción y alta demanda).

---

## 🗄️ 2. Modelado de Datos y Endpoints
*Si estás trabajando en la base de datos o conectando el frontend con el backend.*

* **[`04_flujo_datos.puml`](./04_flujo_datos.puml)**
    * **¿Qué encontrarás?** El Diagrama de Flujo de Datos (DFD). Muestra cómo viaja la información desde que el alumno ingresa hasta que la IA genera una respuesta.
    * **¿Qué resuelve?** Evita cuellos de botella y clarifica qué tablas o *storages* son afectados en cada proceso clave.
* **[`05_der_logico.puml`](./05_der_logico.puml) y [`06_der_fisico.puml`](./06_der_fisico.puml)**
    * **¿Qué encontrarás?** Los Diagramas de Entidad-Relación (DER). El lógico muestra conceptos, el físico muestra tablas, claves primarias/foráneas y tipos de datos (JSONB).
    * **¿Qué resuelve?** La guía definitiva para armar las migraciones en la base de datos.
* **[`14_mapa_endpoints_api.puml`](./14_mapa_endpoints_api.puml)**
    * **¿Qué encontrarás?** El contrato REST API `/v1` completo con rutas y métodos.
    * **¿Qué resuelve?** Es el "diccionario" de comunicación. El frontend consulta aquí a qué URL apuntar sus peticiones *fetch*.

---

## 🧑‍💻 3. Comportamiento y Flujos Críticos
*Si necesitas entender la experiencia del usuario o cómo se maneja la Inteligencia Artificial paso a paso.*

* **[`07_casos_uso.puml`](./07_casos_uso.puml)**
    * **¿Qué encontrarás?** Las interacciones permitidas para cada actor (Estudiante, Familia, Administrador, IA).
    * **¿Qué resuelve?** Define el alcance del MVP. Si no está en este diagrama, no se programa este fin de semana.
* **[`10_secuencia_comparacion_carreras.puml`](./10_secuencia_comparacion_carreras.puml)**
    * **¿Qué encontrarás?** El "Duelo de Carreras". El viaje del dato desde el click del usuario hasta el *fallback* de seguridad si la IA falla.
    * **¿Qué resuelve?** Coordina el momento más complejo de la app, asegurando que los fallos de la IA no rompan la experiencia.
* **[`11_secuencia_explicacion_silabo.puml`](./11_secuencia_explicacion_silabo.puml)**
    * **¿Qué encontrarás?** Cómo particionamos la malla curricular y consultamos la caché antes de llamar a la IA para traducir un sílabo.
    * **¿Qué resuelve?** Estrategia para ahorrar tokens de API y hacer que la interfaz responda más rápido.
* **[`12_storyboard_journey.puml`](./12_storyboard_journey.puml)**
    * **¿Qué encontrarás?** El flujo visual de pantallas (UX).
    * **¿Qué resuelve?** Guía a los diseñadores de interfaz y desarrolladores frontend sobre el orden de navegación.

---

## 🧩 4. Estructura de Código
*Exclusivo para el equipo de desarrollo.*

* **[`08_clases_backend.puml`](./08_clases_backend.puml) y [`09_clases_frontend.puml`](./09_clases_frontend.puml)**
    * **¿Qué encontrarás?** Diagramas de clases con atributos y métodos clave para Node y React respectivamente.
    * **¿Qué resuelve?** Estructura el tipado (Interfaces TypeScript) y el manejo de estados antes de escribir la primera línea de código.

---
*Documentación generada para la Hackathon UTP+.*