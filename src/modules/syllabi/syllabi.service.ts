import { randomUUID } from "crypto";
import {
  SyllabusDetailDto,
  SyllabusExplanationRequestDto,
  SyllabusExplanationResponseDto,
  SyllabusQueryDto,
  SyllabusSummaryDto
} from "./dto/syllabus.dto";

const syllabi: SyllabusDetailDto[] = [
  {
    syllabusId: "syl-soft-prog-1",
    careerId: "software-engineering",
    courseId: "soft-prog-1",
    courseName: "Fundamentos de Programación",
    cycleNumber: 1,
    area: "Programación",
    credits: 4,
    versionLabel: "2026-1",
    shortDescription:
      "Curso inicial para aprender lógica, algoritmos y construcción de programas simples.",
    pdfUrl: null,
    parsed: {
      purpose:
        "Introducir al estudiante en el pensamiento computacional y la resolución de problemas mediante programación.",
      learningOutcomes: [
        "Comprender conceptos básicos de algoritmos.",
        "Construir programas simples usando estructuras de control.",
        "Aplicar lógica para resolver problemas paso a paso."
      ],
      units: [
        {
          unitNumber: 1,
          title: "Lógica y algoritmos",
          topics: ["Variables", "Entrada y salida", "Pseudocódigo"]
        },
        {
          unitNumber: 2,
          title: "Estructuras de control",
          topics: ["Condicionales", "Bucles", "Funciones básicas"]
        }
      ],
      evaluation: [
        {
          component: "Prácticas calificadas",
          weight: 40,
          description: "Ejercicios de programación y lógica."
        },
        {
          component: "Proyecto final",
          weight: 35,
          description: "Construcción de una solución simple."
        },
        {
          component: "Evaluación conceptual",
          weight: 25,
          description: "Conceptos de algoritmos y programación."
        }
      ],
      recommendedBackground: [
        "Disposición para practicar.",
        "Paciencia para corregir errores.",
        "Razonamiento lógico básico."
      ]
    }
  },
  {
    syllabusId: "syl-soft-math-1",
    careerId: "software-engineering",
    courseId: "soft-math-1",
    courseName: "Matemática para Ingeniería I",
    cycleNumber: 1,
    area: "Matemática",
    credits: 4,
    versionLabel: "2026-1",
    shortDescription:
      "Curso base para fortalecer razonamiento matemático aplicado a ingeniería.",
    pdfUrl: null,
    parsed: {
      purpose:
        "Fortalecer habilidades matemáticas necesarias para resolver problemas de ingeniería.",
      learningOutcomes: [
        "Resolver problemas con funciones y ecuaciones.",
        "Interpretar resultados matemáticos.",
        "Aplicar razonamiento cuantitativo."
      ],
      units: [
        {
          unitNumber: 1,
          title: "Álgebra y funciones",
          topics: ["Ecuaciones", "Funciones", "Modelamiento básico"]
        },
        {
          unitNumber: 2,
          title: "Aplicaciones a ingeniería",
          topics: ["Problemas contextualizados", "Interpretación de gráficos"]
        }
      ],
      evaluation: [
        {
          component: "Prácticas",
          weight: 40,
          description: "Resolución de ejercicios."
        },
        {
          component: "Examen parcial",
          weight: 30,
          description: "Evaluación de fundamentos."
        },
        {
          component: "Examen final",
          weight: 30,
          description: "Evaluación integradora."
        }
      ],
      recommendedBackground: [
        "Repasar álgebra escolar.",
        "Practicar ejercicios cortos diariamente.",
        "Consultar dudas desde la primera semana."
      ]
    }
  },
  {
    syllabusId: "syl-ind-intro",
    careerId: "industrial-engineering",
    courseId: "ind-intro",
    courseName: "Introducción a la Ingeniería Industrial",
    cycleNumber: 1,
    area: "Gestión y procesos",
    credits: 3,
    versionLabel: "2026-1",
    shortDescription:
      "Curso que presenta el rol de la ingeniería industrial en empresas, procesos y operaciones.",
    pdfUrl: null,
    parsed: {
      purpose:
        "Ayudar al estudiante a entender el campo profesional de la ingeniería industrial y su impacto en organizaciones.",
      learningOutcomes: [
        "Identificar procesos dentro de una organización.",
        "Comprender el rol de la mejora continua.",
        "Relacionar operaciones, productividad y gestión."
      ],
      units: [
        {
          unitNumber: 1,
          title: "La ingeniería industrial",
          topics: ["Campo profesional", "Procesos", "Productividad"]
        },
        {
          unitNumber: 2,
          title: "Organizaciones y mejora",
          topics: ["Indicadores", "Mejora continua", "Casos empresariales"]
        }
      ],
      evaluation: [
        {
          component: "Casos prácticos",
          weight: 40,
          description: "Análisis de situaciones de empresa."
        },
        {
          component: "Trabajo grupal",
          weight: 35,
          description: "Propuesta de mejora básica."
        },
        {
          component: "Evaluación individual",
          weight: 25,
          description: "Conceptos y aplicación."
        }
      ],
      recommendedBackground: [
        "Interés por empresas y procesos.",
        "Capacidad de observación.",
        "Comunicación para trabajo en equipo."
      ]
    }
  },
  {
    syllabusId: "syl-data-stats-1",
    careerId: "data-science",
    courseId: "data-stats-1",
    courseName: "Fundamentos de Estadística",
    cycleNumber: 2,
    area: "Estadística",
    credits: 4,
    versionLabel: "2026-1",
    shortDescription:
      "Curso para interpretar datos, variabilidad, tendencias y patrones básicos.",
    pdfUrl: null,
    parsed: {
      purpose:
        "Desarrollar bases estadísticas para analizar información y tomar decisiones basadas en datos.",
      learningOutcomes: [
        "Interpretar medidas estadísticas básicas.",
        "Analizar distribuciones y variabilidad.",
        "Comunicar hallazgos con claridad."
      ],
      units: [
        {
          unitNumber: 1,
          title: "Estadística descriptiva",
          topics: ["Media", "Mediana", "Desviación estándar", "Gráficos"]
        },
        {
          unitNumber: 2,
          title: "Probabilidad básica",
          topics: ["Eventos", "Probabilidad", "Interpretación"]
        }
      ],
      evaluation: [
        {
          component: "Ejercicios aplicados",
          weight: 35,
          description: "Resolución de problemas con datos."
        },
        {
          component: "Proyecto de análisis",
          weight: 40,
          description: "Análisis simple de un conjunto de datos."
        },
        {
          component: "Evaluación conceptual",
          weight: 25,
          description: "Conceptos estadísticos."
        }
      ],
      recommendedBackground: [
        "Gusto por números y gráficos.",
        "Curiosidad por encontrar patrones.",
        "Práctica constante."
      ]
    }
  }
];

const explanationStore = new Map<string, SyllabusExplanationResponseDto>();

function toSummary(syllabus: SyllabusDetailDto): SyllabusSummaryDto {
  const { parsed, ...summary } = syllabus;
  return summary;
}

export class SyllabiService {
  public async listSyllabi(query: SyllabusQueryDto): Promise<SyllabusSummaryDto[]> {
    const normalizedQ = query.q?.toLowerCase();

    return syllabi
      .filter((syllabus) => {
        if (!query.careerId) return true;
        return syllabus.careerId === query.careerId;
      })
      .filter((syllabus) => {
        if (!query.courseId) return true;
        return syllabus.courseId === query.courseId;
      })
      .filter((syllabus) => {
        if (!query.cycleNumber) return true;
        return syllabus.cycleNumber === query.cycleNumber;
      })
      .filter((syllabus) => {
        if (!normalizedQ) return true;

        const searchableText = [
          syllabus.courseName,
          syllabus.area,
          syllabus.shortDescription,
          syllabus.parsed.purpose,
          ...syllabus.parsed.learningOutcomes
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQ);
      })
      .slice(0, query.limit)
      .map(toSummary);
  }

  public async getSyllabusById(
    syllabusId: string
  ): Promise<SyllabusDetailDto | null> {
    return syllabi.find((syllabus) => syllabus.syllabusId === syllabusId) || null;
  }

  public async createExplanation(
    syllabusId: string,
    input: SyllabusExplanationRequestDto
  ): Promise<SyllabusExplanationResponseDto | null> {
    const syllabus = await this.getSyllabusById(syllabusId);

    if (!syllabus) {
      return null;
    }

    const explanation: SyllabusExplanationResponseDto = {
      explanationId: randomUUID(),
      syllabusId: syllabus.syllabusId,
      courseName: syllabus.courseName,
      targetAudience: input.targetAudience,
      plainExplanation:
        `Este curso, ${syllabus.courseName}, te ayuda a entender bases importantes de ${syllabus.area}. No está pensado para que memorices todo, sino para que practiques, conectes ideas y entiendas cómo se usa en la carrera.`,
      whyItMatters:
        `Importa porque aparece temprano en la carrera y te prepara para cursos posteriores. También te ayuda a confirmar si el tipo de retos de ${syllabus.area} se siente alineado contigo.`,
      difficultySignals: {
        practiceIntensity: syllabus.area.toLowerCase().includes("programación") ? 9 : 7,
        readingIntensity: syllabus.area.toLowerCase().includes("gestión") ? 7 : 5,
        abstractReasoning: syllabus.area.toLowerCase().includes("matemática") ? 8 : 6,
        frustrationTolerance: syllabus.area.toLowerCase().includes("programación") ? 8 : 6
      },
      skillsYouBuild: syllabus.parsed.learningOutcomes,
      exampleActivities: [
        "Resolver ejercicios guiados.",
        "Trabajar un caso o proyecto corto.",
        "Explicar con tus palabras qué aprendiste y para qué sirve."
      ],
      fitComment:
        "Si te interesa esta carrera, este curso te dará una primera muestra realista de cómo se estudia y qué tipo de esfuerzo exige.",
      recommendedPreparation: syllabus.parsed.recommendedBackground,
      modelMetadata: {
        provider: "mock",
        model: "mock-syllabus-explainer-v1",
        promptVersion: "syllabus.explanation.mock.v1",
        cacheHit: false,
        fallbackUsed: true,
        latencyMs: 0,
        safetyNotes: [
          "Explicación mock usada para validar contrato DTO, controller y flujo de explicación de sílabo."
        ]
      },
      createdAt: new Date().toISOString()
    };

    explanationStore.set(explanation.explanationId, explanation);

    return explanation;
  }
}
