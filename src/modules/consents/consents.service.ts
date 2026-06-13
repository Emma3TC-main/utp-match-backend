import { randomUUID } from "crypto";
import {
  ConsentCreateDto,
  ConsentQueryDto,
  ConsentRecordDto,
  RequiredConsentDto,
  RevokeConsentDto
} from "./dto/consent.dto";

const consentStore = new Map<string, ConsentRecordDto>();

const requiredConsents: RequiredConsentDto[] = [
  {
    consentType: "terms",
    version: "2026-06-v1",
    title: "Términos y condiciones",
    description:
      "Aceptación de las condiciones generales para usar UTP Match / SyllabusX.",
    required: true,
    blocking: true,
    recommendedFor: ["onboarding", "all_users"]
  },
  {
    consentType: "privacy",
    version: "2026-06-v1",
    title: "Política de privacidad",
    description:
      "Autorización para tratar datos personales básicos necesarios para la experiencia vocacional.",
    required: true,
    blocking: true,
    recommendedFor: ["onboarding", "all_users"]
  },
  {
    consentType: "vocational_report_processing",
    version: "2026-06-v1",
    title: "Procesamiento de reporte vocacional",
    description:
      "Permite usar resultados o intereses vocacionales para personalizar recomendaciones y comparaciones.",
    required: true,
    blocking: true,
    recommendedFor: ["vocational_report_flow", "comparison_flow"]
  },
  {
    consentType: "ai_processing",
    version: "2026-06-v1",
    title: "Uso de IA para explicaciones personalizadas",
    description:
      "Permite procesar información del perfil y carreras para generar explicaciones asistidas por IA.",
    required: true,
    blocking: false,
    recommendedFor: ["comparison_flow", "syllabus_flow"]
  },
  {
    consentType: "family_share",
    version: "2026-06-v1",
    title: "Compartir resumen con familia o asesor",
    description:
      "Permite generar enlaces compartibles para explicar una comparación o plan de acción.",
    required: false,
    blocking: false,
    recommendedFor: ["share_flow"]
  }
];

export class ConsentsService {
  public async listRequiredConsents(): Promise<RequiredConsentDto[]> {
    return requiredConsents;
  }

  public async createConsent(input: ConsentCreateDto): Promise<ConsentRecordDto> {
    const now = new Date().toISOString();

    const record: ConsentRecordDto = {
      id: randomUUID(),
      studentProfileId: input.studentProfileId,
      consentType: input.consentType,
      version: input.version,
      granted: input.granted,
      source: input.source,
      metadata: input.metadata,
      grantedAt: input.granted ? now : null,
      revokedAt: null,
      createdAt: now,
      updatedAt: now
    };

    consentStore.set(record.id, record);

    return record;
  }

  public async listConsents(query: ConsentQueryDto): Promise<ConsentRecordDto[]> {
    return [...consentStore.values()].filter((consent) => {
      if (query.studentProfileId && consent.studentProfileId !== query.studentProfileId) {
        return false;
      }

      if (query.consentType && consent.consentType !== query.consentType) {
        return false;
      }

      if (typeof query.granted === "boolean" && consent.granted !== query.granted) {
        return false;
      }

      return true;
    });
  }

  public async getConsentById(
    consentId: string
  ): Promise<ConsentRecordDto | null> {
    return consentStore.get(consentId) || null;
  }

  public async revokeConsent(
    consentId: string,
    input: RevokeConsentDto
  ): Promise<ConsentRecordDto | null> {
    const existing = consentStore.get(consentId);

    if (!existing) {
      return null;
    }

    const now = new Date().toISOString();

    const updated: ConsentRecordDto = {
      ...existing,
      granted: false,
      revokedAt: now,
      updatedAt: now,
      metadata: {
        ...existing.metadata,
        revokeReason: input.reason || null
      }
    };

    consentStore.set(consentId, updated);

    return updated;
  }
}
