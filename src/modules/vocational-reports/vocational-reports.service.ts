import { randomUUID } from "crypto";
import {
  CareerRecommendationDto,
  VocationalReportCreateDto,
  VocationalReportDto,
  VocationalReportQueryDto,
  VocationalReportRecommendationsDto
} from "./dto/vocational-report.dto";

const reportStore = new Map<string, VocationalReportDto>();

function buildRecommendation(
  reportId: string,
  signal: VocationalReportDto["topCareers"][number],
  priority: number
): CareerRecommendationDto {
  return {
    careerId: signal.careerId || null,
    name: signal.name,
    score: signal.score,
    reason:
      signal.reason ||
      `La carrera ${signal.name} aparece como opción relevante según las señales vocacionales registradas.`,
    priority,
    nextAction:
      priority === 1
        ? "Comparar esta carrera con una segunda opción para entender diferencias reales."
        : "Revisar cursos del primer ciclo para validar si la carrera se siente alineada."
  };
}

export class VocationalReportsService {
  public async createReport(
    input: VocationalReportCreateDto
  ): Promise<VocationalReportDto> {
    const now = new Date().toISOString();

    const report: VocationalReportDto = {
      id: randomUUID(),
      studentProfileId: input.studentProfileId,
      sourceType: input.sourceType,
      reportDate: input.reportDate || now,
      topCareers: input.topCareers,
      scores: input.scores,
      interests: input.interests,
      strengths: input.strengths,
      concerns: input.concerns,
      context: input.context,
      rawFileUrl: null,
      createdAt: now,
      updatedAt: now
    };

    reportStore.set(report.id, report);

    return report;
  }

  public async listReports(
    query: VocationalReportQueryDto
  ): Promise<VocationalReportDto[]> {
    return [...reportStore.values()]
      .filter((report) => {
        if (query.studentProfileId && report.studentProfileId !== query.studentProfileId) {
          return false;
        }

        if (query.sourceType && report.sourceType !== query.sourceType) {
          return false;
        }

        return true;
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, query.limit);
  }

  public async getReportById(reportId: string): Promise<VocationalReportDto | null> {
    return reportStore.get(reportId) || null;
  }

  public async getRecommendations(
    reportId: string
  ): Promise<VocationalReportRecommendationsDto | null> {
    const report = await this.getReportById(reportId);

    if (!report) {
      return null;
    }

    const recommendations = [...report.topCareers]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((signal, index) => buildRecommendation(reportId, signal, index + 1));

    return {
      reportId: report.id,
      studentProfileId: report.studentProfileId,
      recommendations,
      summary:
        recommendations.length > 0
          ? "Se generaron recomendaciones vocacionales a partir de las carreras con mayor puntaje del reporte."
          : "El reporte no contiene carreras sugeridas. Se recomienda completar intereses, fortalezas y resultados vocacionales.",
      generatedAt: new Date().toISOString()
    };
  }
}
