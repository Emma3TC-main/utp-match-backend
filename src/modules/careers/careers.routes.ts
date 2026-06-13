import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateRequest } from "../../shared/validation/validate-request";
import { CareersController } from "./careers.controller";
import {
  careerIdParamsSchema,
  careerQuerySchema
} from "./dto/career.dto";

export const careersRoutes = Router();
const controller = new CareersController();

careersRoutes.get(
  "/",
  validateRequest({
    query: careerQuerySchema
  }),
  asyncHandler(controller.listCareers)
);

careersRoutes.get(
  "/:careerId",
  validateRequest({
    params: careerIdParamsSchema
  }),
  asyncHandler(controller.getCareerById)
);

careersRoutes.get(
  "/:careerId/curriculum",
  validateRequest({
    params: careerIdParamsSchema
  }),
  asyncHandler(controller.getCareerCurriculum)
);

export default careersRoutes;
