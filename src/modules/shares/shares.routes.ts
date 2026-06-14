import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateRequest } from "../../shared/validation/validate-request";
import { SharesController } from "./shares.controller";
import {
  shareCreateSchema,
  shareQuerySchema,
  shareRevokeSchema,
  shareTokenParamsSchema
} from "./dto/share.dto";

export const sharesRoutes = Router();
const controller = new SharesController();

sharesRoutes.post(
  "/",
  validateRequest({
    body: shareCreateSchema
  }),
  asyncHandler(controller.createShare)
);

sharesRoutes.get(
  "/",
  validateRequest({
    query: shareQuerySchema
  }),
  asyncHandler(controller.listShares)
);

sharesRoutes.patch(
  "/:token/revoke",
  validateRequest({
    params: shareTokenParamsSchema,
    body: shareRevokeSchema
  }),
  asyncHandler(controller.revokeShare)
);

sharesRoutes.get(
  "/:token",
  validateRequest({
    params: shareTokenParamsSchema
  }),
  asyncHandler(controller.getSharedSummaryByToken)
);

export default sharesRoutes;
