import { Request, Response } from "express";
import { ok, fail } from "../../shared/responses/api-response";
import { CareerComparisonRequestDto } from "./dto/comparison.dto";
import { ComparisonsService } from "./comparisons.service";

export class ComparisonsController {
  constructor(private readonly comparisonsService = new ComparisonsService()) {}

  public createComparison = async (req: Request, res: Response) => {
    const input = req.body as CareerComparisonRequestDto;
    const comparison = await this.comparisonsService.createComparison(input);

    return ok(res, {
      input,
      comparison
    });
  };

  public getComparison = async (req: Request, res: Response) => {
    const rawComparisonId = req.params.comparisonId;
    const comparisonId = Array.isArray(rawComparisonId)
      ? rawComparisonId[0]
      : rawComparisonId;

    if (!comparisonId) {
      return fail(
        res,
        400,
        "COMPARISON_ID_REQUIRED",
        "El id de comparación es obligatorio."
      );
    }

    const comparison = await this.comparisonsService.getComparison(comparisonId);

    if (!comparison) {
      return fail(
        res,
        404,
        "COMPARISON_NOT_FOUND",
        "No se encontró la comparación solicitada.",
        [{ comparisonId }]
      );
    }

    return ok(res, {
      comparison
    });
  };
}
