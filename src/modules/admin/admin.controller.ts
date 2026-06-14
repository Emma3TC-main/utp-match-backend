import { Request, Response } from "express";
import { ok } from "../../shared/responses/api-response";
import {
  AdminAuditQueryDto,
  AdminCareerCreateDto,
  AdminSyllabusCreateDto
} from "./dto/admin.dto";
import { AdminService } from "./admin.service";

export class AdminController {
  constructor(private readonly adminService = new AdminService()) {}

  public status = async (_req: Request, res: Response) => {
    const status = await this.adminService.getStatus();

    return ok(res, status);
  };

  public catalogOverview = async (_req: Request, res: Response) => {
    const overview = await this.adminService.getCatalogOverview();

    return ok(res, {
      overview
    });
  };

  public createCareer = async (req: Request, res: Response) => {
    const input = req.body as AdminCareerCreateDto;
    const record = await this.adminService.createCareer(input);

    return ok(res, {
      record
    });
  };

  public createSyllabus = async (req: Request, res: Response) => {
    const input = req.body as AdminSyllabusCreateDto;
    const record = await this.adminService.createSyllabus(input);

    return ok(res, {
      record
    });
  };

  public auditSummary = async (req: Request, res: Response) => {
    const query = req.query as unknown as AdminAuditQueryDto;
    const audit = await this.adminService.getAuditSummary(query);

    return ok(res, audit);
  };
}
