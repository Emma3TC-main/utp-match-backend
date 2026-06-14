import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateRequest } from "../../shared/validation/validate-request";
import { AdminController } from "./admin.controller";
import {
  adminAuditQuerySchema,
  adminCareerCreateSchema,
  adminSyllabusCreateSchema
} from "./dto/admin.dto";

export const adminRoutes = Router();
const controller = new AdminController();

adminRoutes.get(
  "/status",
  asyncHandler(controller.status)
);

adminRoutes.get(
  "/catalog/overview",
  asyncHandler(controller.catalogOverview)
);

adminRoutes.post(
  "/catalog/careers",
  validateRequest({
    body: adminCareerCreateSchema
  }),
  asyncHandler(controller.createCareer)
);

adminRoutes.post(
  "/catalog/syllabi",
  validateRequest({
    body: adminSyllabusCreateSchema
  }),
  asyncHandler(controller.createSyllabus)
);

adminRoutes.get(
  "/audit-summary",
  validateRequest({
    query: adminAuditQuerySchema
  }),
  asyncHandler(controller.auditSummary)
);

export default adminRoutes;
