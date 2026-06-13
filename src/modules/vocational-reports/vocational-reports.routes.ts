import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateRequest } from "../../shared/validation/validate-request";
import { VocationalReportsController } from "./vocational-reports.controller";
import {
  reportIdParamsSchema,
  vocationalReportCreateSchema,
  vocationalReportQuerySchema
} from "./dto/vocational-report.dto";

export const vocationalReportsRoutes = Router();
const controller = new VocationalReportsController();

vocationalReportsRoutes.post(
  "/",
  validateRequest({
    body: vocationalReportCreateSchema
  }),
  asyncHandler(controller.createReport)
);

vocationalReportsRoutes.get(
  "/",
  validateRequest({
    query: vocationalReportQuerySchema
  }),
  asyncHandler(controller.listReports)
);

vocationalReportsRoutes.get(
  "/:reportId/recommendations",
  validateRequest({
    params: reportIdParamsSchema
  }),
  asyncHandler(controller.getRecommendations)
);

vocationalReportsRoutes.get(
  "/:reportId",
  validateRequest({
    params: reportIdParamsSchema
  }),
  asyncHandler(controller.getReportById)
);

export default vocationalReportsRoutes;
