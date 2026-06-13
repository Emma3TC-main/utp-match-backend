import { randomUUID } from "crypto";
import {
  CareerComparisonRequestDto,
  CareerComparisonResponseDto
} from "./dto/comparison.dto";

const mockComparisons = new Map<string, CareerComparisonResponseDto>();

export class ComparisonsService {
  public async createComparison(
    input: CareerComparisonRequestDto
  ): Promise<CareerComparisonResponseDto> {
    const comparison: CareerComparisonResponseDto = {
      comparisonId: randomUUID(),
      summary:
        "Comparación generada en modo mock. El resultado simula cómo el backend explicará diferencias entre carreras usando el perfil vocacional, intereses del estudiante y señales de sílabos.",
      dimensions: {
        left: {
          math: 78,
          coding: 86,
          management: 55,
          communication: 62,
          practice: 82
        },
        right: {
          math: 72,
          coding: 58,
          management: 84,
          communication: 80,
          practice: 76
        }
      },
      careerHighlights: [
        {
          careerId: input.leftCareerId,
          title: "Primera carrera comparada",
          body:
            "Tiene mayor afinidad con construcción de soluciones, lógica, tecnología y trabajo práctico por proyectos."
        },
        {
          careerId: input.rightCareerId,
          title: "Segunda carrera comparada",
          body:
            "Tiene mayor afinidad con gestión, comunicación, análisis de procesos y toma de decisiones."
        }
      ],
      fitNarrative:
        "Si el estudiante disfruta crear, probar y mejorar soluciones digitales, la primera carrera puede sentirse más natural. Si prefiere coordinar, analizar procesos y comunicar decisiones, la segunda opción puede tener mejor encaje.",
      risksOrWarnings: [
        "Este resultado es referencial y debe complementarse con orientación vocacional real.",
        "La comparación usa datos mock hasta conectar base de datos, sílabos e IA."
      ],
      recommendedQuestions: [
        "¿Qué cursos del primer ciclo me costarían más?",
        "¿Qué tipo de proyectos haría durante la carrera?",
        "¿Cómo se ve un día real estudiando esta carrera?"
      ],
      nextBestActions: [
        "Revisar los cursos del primer ciclo de ambas carreras.",
        "Generar explicación de sílabos para los cursos más difíciles.",
        "Compartir el resumen con la familia o un asesor."
      ],
      modelMetadata: {
        provider: "mock",
        model: "mock-comparison-v1",
        promptVersion: "comparison.mock.v1",
        cacheHit: false,
        fallbackUsed: true,
        latencyMs: 0,
        safetyNotes: [
          "Respuesta mock usada para validar contrato DTO, service, controller y flujo de comparación."
        ]
      },
      createdAt: new Date().toISOString()
    };

    mockComparisons.set(comparison.comparisonId, comparison);

    return comparison;
  }

  public async getComparison(
    comparisonId: string
  ): Promise<CareerComparisonResponseDto | null> {
    return mockComparisons.get(comparisonId) || null;
  }
}
