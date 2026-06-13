import { Request, Response } from "express";
import { ok, fail } from "../../shared/responses/api-response";
import { CareerQueryDto } from "./dto/career.dto";
import { CareersService } from "./careers.service";

function getParamAsString(value: string | string[] | undefined): string | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value;
}

export class CareersController {
  constructor(private readonly careersService = new CareersService()) {}

  public listCareers = async (req: Request, res: Response) => {
    const query = req.query as unknown as CareerQueryDto;
    const careers = await this.careersService.listCareers(query);

    return ok(res, {
      items: careers,
      total: careers.length
    });
  };

  public getCareerById = async (req: Request, res: Response) => {
    const careerId = getParamAsString(req.params.careerId);

    if (!careerId) {
      return fail(
        res,
        400,
        "CAREER_ID_REQUIRED",
        "El id de carrera es obligatorio."
      );
    }

    const career = await this.careersService.getCareerById(careerId);

    if (!career) {
      return fail(
        res,
        404,
        "CAREER_NOT_FOUND",
        "No se encontró la carrera solicitada.",
        [{ careerId }]
      );
    }

    return ok(res, {
      career
    });
  };

  public getCareerCurriculum = async (req: Request, res: Response) => {
    const careerId = getParamAsString(req.params.careerId);

    if (!careerId) {
      return fail(
        res,
        400,
        "CAREER_ID_REQUIRED",
        "El id de carrera es obligatorio."
      );
    }

    const curriculum = await this.careersService.getCareerCurriculum(careerId);

    if (!curriculum) {
      return fail(
        res,
        404,
        "CAREER_NOT_FOUND",
        "No se encontró la carrera solicitada.",
        [{ careerId }]
      );
    }

    return ok(res, {
      curriculum
    });
  };
}
