import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateRequest } from "../../shared/validation/validate-request";
import { ConsentsController } from "./consents.controller";
import {
  consentCreateSchema,
  consentIdParamsSchema,
  consentQuerySchema,
  revokeConsentSchema
} from "./dto/consent.dto";

export const consentsRoutes = Router();
const controller = new ConsentsController();

consentsRoutes.get(
  "/requirements",
  asyncHandler(controller.listRequiredConsents)
);

consentsRoutes.post(
  "/",
  validateRequest({
    body: consentCreateSchema
  }),
  asyncHandler(controller.createConsent)
);

consentsRoutes.get(
  "/",
  validateRequest({
    query: consentQuerySchema
  }),
  asyncHandler(controller.listConsents)
);

consentsRoutes.get(
  "/:consentId",
  validateRequest({
    params: consentIdParamsSchema
  }),
  asyncHandler(controller.getConsentById)
);

consentsRoutes.patch(
  "/:consentId/revoke",
  validateRequest({
    params: consentIdParamsSchema,
    body: revokeConsentSchema
  }),
  asyncHandler(controller.revokeConsent)
);

export default consentsRoutes;
