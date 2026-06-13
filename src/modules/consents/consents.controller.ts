import { Request, Response } from "express";
import { ok, fail } from "../../shared/responses/api-response";
import {
  ConsentCreateDto,
  ConsentQueryDto,
  RevokeConsentDto
} from "./dto/consent.dto";
import { ConsentsService } from "./consents.service";

function getParamAsString(value: string | string[] | undefined): string | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value;
}

export class ConsentsController {
  constructor(private readonly consentsService = new ConsentsService()) {}

  public listRequiredConsents = async (_req: Request, res: Response) => {
    const items = await this.consentsService.listRequiredConsents();

    return ok(res, {
      items,
      total: items.length
    });
  };

  public createConsent = async (req: Request, res: Response) => {
    const input = req.body as ConsentCreateDto;
    const consent = await this.consentsService.createConsent(input);

    return ok(res, {
      consent
    });
  };

  public listConsents = async (req: Request, res: Response) => {
    const query = req.query as unknown as ConsentQueryDto;
    const items = await this.consentsService.listConsents(query);

    return ok(res, {
      items,
      total: items.length
    });
  };

  public getConsentById = async (req: Request, res: Response) => {
    const consentId = getParamAsString(req.params.consentId);

    if (!consentId) {
      return fail(
        res,
        400,
        "CONSENT_ID_REQUIRED",
        "El id de consentimiento es obligatorio."
      );
    }

    const consent = await this.consentsService.getConsentById(consentId);

    if (!consent) {
      return fail(
        res,
        404,
        "CONSENT_NOT_FOUND",
        "No se encontró el consentimiento solicitado.",
        [{ consentId }]
      );
    }

    return ok(res, {
      consent
    });
  };

  public revokeConsent = async (req: Request, res: Response) => {
    const consentId = getParamAsString(req.params.consentId);

    if (!consentId) {
      return fail(
        res,
        400,
        "CONSENT_ID_REQUIRED",
        "El id de consentimiento es obligatorio."
      );
    }

    const input = req.body as RevokeConsentDto;
    const consent = await this.consentsService.revokeConsent(consentId, input);

    if (!consent) {
      return fail(
        res,
        404,
        "CONSENT_NOT_FOUND",
        "No se encontró el consentimiento solicitado.",
        [{ consentId }]
      );
    }

    return ok(res, {
      consent
    });
  };
}
