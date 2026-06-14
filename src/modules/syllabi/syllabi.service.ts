import { randomUUID } from "crypto";
import { env } from "../../config/env";
import { AiService } from "../ai/ai.service";
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

type AiSyllabusExplanationPayload = {
  plainExplanation?: unknown;
  whyItMatters?: unknown;
  difficultySignals?: {
    practiceIntensity?: unknown;
    readingIntensity?: unknown;
    abstractReasoning?: unknown;
    frustrationTolerance?: unknown;
  };
  skillsYouBuild?: unknown;
  exampleActivities?: unknown;
  fitComment?: unknown;
  recommendedPreparation?: unknown;
};

function toSummary(syllabus: SyllabusDetailDto): SyllabusSummaryDto {
  const { parsed, ...summary } = syllabus;
  return summary;
}

function asNonEmptyString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function asStringArray(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length > 0 ? items : fallback;
}

function clampIntensity(value: unknown, fallback: number): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.max(0, Math.min(10, Math.round(parsed)));
}

function extractJsonObject(text: string): AiSyllabusExplanationPayload {
  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fencedMatch?.[1] ?? text;
  const firstBrace = candidate.indexOf("{");
  const lastBrace = candidate.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("AI_JSON_NOT_FOUND");
  }

  return JSON.parse(candidate.slice(firstBrace, lastBrace + 1)) as AiSyllabusExplanationPayload;
}

function buildSyllabusPrompt(
  syllabus: SyllabusDetailDto,
  input: SyllabusExplanationRequestDto
): string {
  return [
    "Eres el asistente IA de UTP Match / SyllabusX.",
    "Explica un silabo universitario a un estudiante de secundaria de Peru.",
    "Responde SOLO con JSON valido, sin markdown, sin bloque de codigo.",
    "",
    "El JSON debe tener exactamente estas claves:",
    "{",
    '  "plainExplanation": "string",',
    '  "whyItMatters": "string",',
    '  "difficultySignals": {',
    '    "practiceIntensity": number,',
    '    "readingIntensity": number,',
    '    "abstractReasoning": number,',
    '    "frustrationTolerance": number',
    "  },",
    '  "skillsYouBuild": ["string"],',
    '  "exampleActivities": ["string"],',
    '  "fitComment": "string",',
    '  "recommendedPreparation": ["string"]',
    "}",
    "",
    "Reglas:",
    "- Usa español claro, directo y empatico.",
    "- No prometas empleabilidad ni resultados garantizados.",
    "- No digas que una carrera es la unica opcion correcta.",
    "- Los valores de difficultySignals deben ser enteros de 0 a 10.",
    "- No inventes datos que no esten en el silabo; si falta algo, explicalo como recomendacion general.",
    "",
    "Audiencia:",
    input.targetAudience,
    "",
    "Tono:",
    input.tone,
    "",
    "Silabo:",
    JSON.stringify(
      {
        syllabusId: syllabus.syllabusId,
        courseName: syllabus.courseName,
        careerId: syllabus.careerId,
        courseId: syllabus.courseId,
        cycleNumber: syllabus.cycleNumber,
        area: syllabus.area,
        credits: syllabus.credits,
        shortDescription: syllabus.shortDescription,
        purpose: syllabus.parsed.purpose,
        learningOutcomes: syllabus.parsed.learningOutcomes,
        units: syllabus.parsed.units,
        evaluation: syllabus.parsed.evaluation,
        recommendedBackground: syllabus.parsed.recommendedBackground,
        context: input.context || {}
      },
      null,
      2
    )
  ].join("\n");
}

function buildMockExplanation(
  syllabus: SyllabusDetailDto,
  input: SyllabusExplanationRequestDto,
  safetyNotes: string[] = [
    "Explicacion mock usada como fallback del flujo de explicacion de silabo."
  ]
): SyllabusExplanationResponseDto {
  return {
    explanationId: randomUUID(),
    syllabusId: syllabus.syllabusId,
    courseName: syllabus.courseName,
    targetAudience: input.targetAudience,
    plainExplanation:
      `Este curso, ${syllabus.courseName}, te ayuda a entender bases importantes de ${syllabus.area}. No esta pensado para que memorices todo, sino para que practiques, conectes ideas y entiendas como se usa en la carrera.`,
    whyItMatters:
      `Importa porque aparece temprano en la carrera y te prepara para cursos posteriores. Tambien te ayuda a confirmar si el tipo de retos de ${syllabus.area} se siente alineado contigo.`,
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
      "Explicar con tus palabras que aprendiste y para que sirve."
    ],
    fitComment:
      "Si te interesa esta carrera, este curso te dara una primera muestra realista de como se estudia y que tipo de esfuerzo exige.",
    recommendedPreparation: syllabus.parsed.recommendedBackground,
    modelMetadata: {
      provider: "mock",
      model: "mock-syllabus-explainer-v1",
      promptVersion: "syllabus.explanation.mock.v1",
      cacheHit: false,
      fallbackUsed: true,
      latencyMs: 0,
      safetyNotes
    },
    createdAt: new Date().toISOString()
  };
}

export class SyllabiService {
  constructor(private readonly aiService = new AiService()) {}

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

    let explanation: SyllabusExplanationResponseDto;

    try {
      const prompt = buildSyllabusPrompt(syllabus, input);
      const result = await this.aiService.generateText(prompt, 1200);
      const payload = extractJsonObject(result.generatedText);

      explanation = {
        explanationId: randomUUID(),
        syllabusId: syllabus.syllabusId,
        courseName: syllabus.courseName,
        targetAudience: input.targetAudience,
        plainExplanation: asNonEmptyString(
          payload.plainExplanation,
          `Este curso te ayuda a entender bases importantes de ${syllabus.area}.`
        ),
        whyItMatters: asNonEmptyString(
          payload.whyItMatters,
          `Importa porque aparece temprano en la carrera y conecta con retos de ${syllabus.area}.`
        ),
        difficultySignals: {
          practiceIntensity: clampIntensity(
            payload.difficultySignals?.practiceIntensity,
            7
          ),
          readingIntensity: clampIntensity(
            payload.difficultySignals?.readingIntensity,
            5
          ),
          abstractReasoning: clampIntensity(
            payload.difficultySignals?.abstractReasoning,
            6
          ),
          frustrationTolerance: clampIntensity(
            payload.difficultySignals?.frustrationTolerance,
            6
          )
        },
        skillsYouBuild: asStringArray(
          payload.skillsYouBuild,
          syllabus.parsed.learningOutcomes
        ),
        exampleActivities: asStringArray(payload.exampleActivities, [
          "Resolver ejercicios guiados.",
          "Trabajar un caso o proyecto corto.",
          "Explicar con tus palabras que aprendiste y para que sirve."
        ]),
        fitComment: asNonEmptyString(
          payload.fitComment,
          "Este curso te da una primera muestra realista de como se estudia esta carrera."
        ),
        recommendedPreparation: asStringArray(
          payload.recommendedPreparation,
          syllabus.parsed.recommendedBackground
        ),
        modelMetadata: {
          provider: env.aiProvider === "gemini" ? "gemini" : "mock",
          model: env.aiModel,
          promptVersion: "syllabus.explanation.gemini.v1",
          cacheHit: false,
          fallbackUsed: false,
          latencyMs: result.latencyMs,
          safetyNotes: [
            "Explicacion generada por IA y normalizada al contrato del backend."
          ]
        },
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI_UNKNOWN_ERROR";

      explanation = buildMockExplanation(syllabus, input, [
        "Fallback mock usado porque la IA no pudo generar una respuesta valida.",
        message.slice(0, 500)
      ]);
    }

    explanationStore.set(explanation.explanationId, explanation);

    return explanation;
  }
}
