import { randomBytes, randomUUID } from "crypto";
import { env } from "../../config/env";
import {
  ShareCreateDto,
  ShareQueryDto,
  ShareRecordDto,
  ShareRevokeDto,
  SharedSummaryDto
} from "./dto/share.dto";

const shareStore = new Map<string, ShareRecordDto>();

function nowIso(): string {
  return new Date().toISOString();
}

function createShareToken(): string {
  return randomBytes(16).toString("hex");
}

function buildShareUrl(token: string): string {
  const baseUrl = env.frontendUrl || "http://localhost:5173";
  return `${baseUrl.replace(/\/$/, "")}/shared/${token}`;
}

function isExpired(share: ShareRecordDto): boolean {
  if (!share.expiresAt) {
    return false;
  }

  return new Date(share.expiresAt).getTime() < Date.now();
}

function getShareStatus(share: ShareRecordDto): "active" | "revoked" | "expired" {
  if (share.revokedAt) {
    return "revoked";
  }

  if (isExpired(share)) {
    return "expired";
  }

  return "active";
}

function buildDefaultTitle(input: ShareCreateDto): string {
  if (input.title) {
    return input.title;
  }

  if (input.comparisonId) {
    return "Resumen de comparación de carreras";
  }

  if (input.planId) {
    return "Plan de acción vocacional";
  }

  if (input.vocationalReportId) {
    return "Resumen de reporte vocacional";
  }

  return "Resumen vocacional compartido";
}

function buildDefaultSummary(input: ShareCreateDto): string {
  if (input.summary) {
    return input.summary;
  }

  const parts: string[] = [
    "Este enlace comparte un resumen vocacional generado en UTP Match / SyllabusX."
  ];

  if (input.comparisonId) {
    parts.push("Incluye una comparación de carreras para ayudar a entender diferencias y próximos pasos.");
  }

  if (input.planId) {
    parts.push("Incluye un plan de acción para avanzar con tareas concretas.");
  }

  if (input.vocationalReportId) {
    parts.push("Incluye señales de un reporte vocacional usado como referencia.");
  }

  parts.push("La información es exploratoria y debe complementarse con orientación de un asesor.");

  return parts.join(" ");
}

function toSharedSummary(share: ShareRecordDto): SharedSummaryDto {
  return {
    token: share.token,
    audience: share.audience,
    ownerProfileId: share.ownerProfileId,
    comparisonId: share.comparisonId,
    planId: share.planId,
    vocationalReportId: share.vocationalReportId,
    title: buildDefaultTitle(share),
    summary: buildDefaultSummary(share),
    status: getShareStatus(share),
    expiresAt: share.expiresAt,
    createdAt: share.createdAt
  };
}

export class SharesService {
  public async createShare(input: ShareCreateDto): Promise<ShareRecordDto> {
    const timestamp = nowIso();
    const token = createShareToken();

    const share: ShareRecordDto = {
      id: randomUUID(),
      token,
      shareUrl: buildShareUrl(token),
      ownerProfileId: input.ownerProfileId,
      comparisonId: input.comparisonId,
      planId: input.planId,
      vocationalReportId: input.vocationalReportId,
      audience: input.audience,
      title: input.title,
      summary: input.summary,
      expiresAt: input.expiresAt || null,
      metadata: input.metadata,
      revokedAt: null,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    shareStore.set(share.token, share);

    return share;
  }

  public async listShares(query: ShareQueryDto): Promise<ShareRecordDto[]> {
    return [...shareStore.values()]
      .filter((share) => {
        if (query.ownerProfileId && share.ownerProfileId !== query.ownerProfileId) {
          return false;
        }

        if (query.audience && share.audience !== query.audience) {
          return false;
        }

        if (typeof query.revoked === "boolean") {
          const revoked = Boolean(share.revokedAt);

          if (revoked !== query.revoked) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, query.limit);
  }

  public async getShareByToken(token: string): Promise<ShareRecordDto | null> {
    return shareStore.get(token) || null;
  }

  public async getSharedSummaryByToken(
    token: string
  ): Promise<SharedSummaryDto | null> {
    const share = await this.getShareByToken(token);

    if (!share) {
      return null;
    }

    return toSharedSummary(share);
  }

  public async revokeShare(
    token: string,
    input: ShareRevokeDto
  ): Promise<ShareRecordDto | null> {
    const share = await this.getShareByToken(token);

    if (!share) {
      return null;
    }

    const timestamp = nowIso();

    const updated: ShareRecordDto = {
      ...share,
      revokedAt: timestamp,
      updatedAt: timestamp,
      metadata: {
        ...share.metadata,
        revokeReason: input.reason || null
      }
    };

    shareStore.set(token, updated);

    return updated;
  }
}
