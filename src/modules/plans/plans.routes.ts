import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateRequest } from "../../shared/validation/validate-request";
import { PlansController } from "./plans.controller";
import {
  actionPlanCreateSchema,
  actionPlanPatchSchema,
  actionPlanQuerySchema,
  planIdParamsSchema,
  planTaskIdParamsSchema,
  updatePlanTaskStatusSchema
} from "./dto/plan.dto";

export const plansRoutes = Router();
const controller = new PlansController();

plansRoutes.post(
  "/",
  validateRequest({
    body: actionPlanCreateSchema
  }),
  asyncHandler(controller.createPlan)
);

plansRoutes.get(
  "/",
  validateRequest({
    query: actionPlanQuerySchema
  }),
  asyncHandler(controller.listPlans)
);

plansRoutes.patch(
  "/:planId/tasks/:taskId/status",
  validateRequest({
    params: planTaskIdParamsSchema,
    body: updatePlanTaskStatusSchema
  }),
  asyncHandler(controller.updateTaskStatus)
);

plansRoutes.get(
  "/:planId",
  validateRequest({
    params: planIdParamsSchema
  }),
  asyncHandler(controller.getPlanById)
);

plansRoutes.patch(
  "/:planId",
  validateRequest({
    params: planIdParamsSchema,
    body: actionPlanPatchSchema
  }),
  asyncHandler(controller.updatePlan)
);

export default plansRoutes;
