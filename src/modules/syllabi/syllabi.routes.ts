import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateRequest } from "../../shared/validation/validate-request";
import { SyllabiController } from "./syllabi.controller";
import {
  syllabusExplanationRequestSchema,
  syllabusIdParamsSchema,
  syllabusQuerySchema
} from "./dto/syllabus.dto";

export const syllabiRoutes = Router();
const controller = new SyllabiController();

syllabiRoutes.get(
  "/",
  validateRequest({
    query: syllabusQuerySchema
  }),
  asyncHandler(controller.listSyllabi)
);

syllabiRoutes.post(
  "/:syllabusId/explanations",
  validateRequest({
    params: syllabusIdParamsSchema,
    body: syllabusExplanationRequestSchema
  }),
  asyncHandler(controller.createExplanation)
);

syllabiRoutes.get(
  "/:syllabusId",
  validateRequest({
    params: syllabusIdParamsSchema
  }),
  asyncHandler(controller.getSyllabusById)
);

export default syllabiRoutes;
