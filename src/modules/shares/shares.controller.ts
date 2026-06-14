import { Request, Response } from "express";
import { ok, fail } from "../../shared/responses/api-response";
import {
  ShareCreateDto,
  ShareQueryDto,
  ShareRevokeDto
} from "./dto/share.dto";
import { SharesService } from "./shares.service";

function getParamAsString(value: string | string[] | undefined): string | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value;
}

export class SharesController {
  constructor(private readonly sharesService = new SharesService()) {}

  public createShare = async (req: Request, res: Response) => {
    const input = req.body as ShareCreateDto;
    const share = await this.sharesService.createShare(input);

    return ok(res, {
      share
    });
  };

  public listShares = async (req: Request, res: Response) => {
    const query = req.query as unknown as ShareQueryDto;
    const items = await this.sharesService.listShares(query);

    return ok(res, {
      items,
      total: items.length
    });
  };

  public getSharedSummaryByToken = async (req: Request, res: Response) => {
    const token = getParamAsString(req.params.token);

    if (!token) {
      return fail(
        res,
        400,
        "SHARE_TOKEN_REQUIRED",
        "El token del enlace compartido es obligatorio."
      );
    }

    const summary = await this.sharesService.getSharedSummaryByToken(token);

    if (!summary) {
      return fail(
        res,
        404,
        "SHARE_NOT_FOUND",
        "No se encontró el enlace compartido solicitado.",
        [{ token }]
      );
    }

    if (summary.status === "revoked") {
      return fail(
        res,
        410,
        "SHARE_REVOKED",
        "El enlace compartido fue revocado.",
        [{ token }]
      );
    }

    if (summary.status === "expired") {
      return fail(
        res,
        410,
        "SHARE_EXPIRED",
        "El enlace compartido expiró.",
        [{ token }]
      );
    }

    return ok(res, {
      summary
    });
  };

  public revokeShare = async (req: Request, res: Response) => {
    const token = getParamAsString(req.params.token);

    if (!token) {
      return fail(
        res,
        400,
        "SHARE_TOKEN_REQUIRED",
        "El token del enlace compartido es obligatorio."
      );
    }

    const input = req.body as ShareRevokeDto;
    const share = await this.sharesService.revokeShare(token, input);

    if (!share) {
      return fail(
        res,
        404,
        "SHARE_NOT_FOUND",
        "No se encontró el enlace compartido solicitado.",
        [{ token }]
      );
    }

    return ok(res, {
      share
    });
  };
}
