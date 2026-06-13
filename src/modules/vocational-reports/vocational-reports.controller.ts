import { Request, Response } from "express";
import { ok, fail } from "../../shared/responses/api-response";
import {
  VocationalReportCreateDto,
  VocationalReportQueryDto
} from "./dto/vocational-report.dto";
import { VocationalReportsService } from "./vocational-reports.service";

function getParamAsString(value: string | string[] | undefined): string | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value;
}

export class VocationalReportsController {
  constructor(
    private readonly vocationalReportsService = new VocationalReportsService()
  ) {}

  public createReport = async (req: Request, res: Response) => {
    const input = req.body as VocationalReportCreateDto;
    const report = await this.vocationalReportsService.createReport(input);

    return ok(res, {
      report
    });
  };

  public listReports = async (req: Request, res: Response) => {
    const query = req.query as unknown as VocationalReportQueryDto;
    const items = await this.vocationalReportsService.listReports(query);

    return ok(res, {
      items,
      total: items.length
    });
  };

  public getReportById = async (req: Request, res: Response) => {
    const reportId = getParamAsString(req.params.reportId);

    if (!reportId) {
      return fail(
        res,
        400,
        "VOCATIONAL_REPORT_ID_REQUIRED",
        "El id del reporte vocacional es obligatorio."
      );
    }

    const report = await this.vocationalReportsService.getReportById(reportId);

    if (!report) {
      return fail(
        res,
        404,
        "VOCATIONAL_REPORT_NOT_FOUND",
        "No se encontró el reporte vocacional solicitado.",
        [{ reportId }]
      );
    }

    return ok(res, {
      report
    });
  };

  public getRecommendations = async (req: Request, res: Response) => {
    const reportId = getParamAsString(req.params.reportId);

    if (!reportId) {
      return fail(
        res,
        400,
        "VOCATIONAL_REPORT_ID_REQUIRED",
        "El id del reporte vocacional es obligatorio."
      );
    }

    const recommendations =
      await this.vocationalReportsService.getRecommendations(reportId);

    if (!recommendations) {
      return fail(
        res,
        404,
        "VOCATIONAL_REPORT_NOT_FOUND",
        "No se encontró el reporte vocacional solicitado.",
        [{ reportId }]
      );
    }

    return ok(res, {
      recommendations
    });
  };
}
