import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateRequest } from "../../shared/validation/validate-request";
import { ComparisonsController } from "./comparisons.controller";
import {
  careerComparisonRequestSchema,
  comparisonIdParamsSchema
} from "./dto/comparison.dto";

const router = Router();
const controller = new ComparisonsController();

router.post(
  "/",
  validateRequest({
    body: careerComparisonRequestSchema
  }),
  asyncHandler(controller.createComparison)
);

router.get(
  "/:comparisonId",
  validateRequest({
    params: comparisonIdParamsSchema
  }),
  asyncHandler(controller.getComparison)
);

export const comparisonsRoutes = router;
export default router;
