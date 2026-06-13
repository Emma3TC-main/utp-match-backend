import { Request, Response } from "express";
import { ok, fail } from "../../shared/responses/api-response";
import {
  SyllabusExplanationRequestDto,
  SyllabusQueryDto
} from "./dto/syllabus.dto";
import { SyllabiService } from "./syllabi.service";

function getParamAsString(value: string | string[] | undefined): string | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value;
}

export class SyllabiController {
  constructor(private readonly syllabiService = new SyllabiService()) {}

  public listSyllabi = async (req: Request, res: Response) => {
    const query = req.query as unknown as SyllabusQueryDto;
    const items = await this.syllabiService.listSyllabi(query);

    return ok(res, {
      items,
      total: items.length
    });
  };

  public getSyllabusById = async (req: Request, res: Response) => {
    const syllabusId = getParamAsString(req.params.syllabusId);

    if (!syllabusId) {
      return fail(
        res,
        400,
        "SYLLABUS_ID_REQUIRED",
        "El id de sílabo es obligatorio."
      );
    }

    const syllabus = await this.syllabiService.getSyllabusById(syllabusId);

    if (!syllabus) {
      return fail(
        res,
        404,
        "SYLLABUS_NOT_FOUND",
        "No se encontró el sílabo solicitado.",
        [{ syllabusId }]
      );
    }

    return ok(res, {
      syllabus
    });
  };

  public createExplanation = async (req: Request, res: Response) => {
    const syllabusId = getParamAsString(req.params.syllabusId);

    if (!syllabusId) {
      return fail(
        res,
        400,
        "SYLLABUS_ID_REQUIRED",
        "El id de sílabo es obligatorio."
      );
    }

    const input = req.body as SyllabusExplanationRequestDto;
    const explanation = await this.syllabiService.createExplanation(
      syllabusId,
      input
    );

    if (!explanation) {
      return fail(
        res,
        404,
        "SYLLABUS_NOT_FOUND",
        "No se encontró el sílabo solicitado.",
        [{ syllabusId }]
      );
    }

    return ok(res, {
      explanation
    });
  };
}
