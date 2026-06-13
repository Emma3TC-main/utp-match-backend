import { Router } from "express";
import { ok } from "../../shared/responses/api-response";
import { requireAuth, AuthenticatedRequest } from "../../middlewares/auth.middleware";

export const vocationalReportsRoutes = Router();

vocationalReportsRoutes.post("/", requireAuth, (req: AuthenticatedRequest, res) => {
  return ok(res, {
    message: "Reporte vocacional registrado en modo mock",
    userId: req.user?.sub,
    received: req.body
  });
});

vocationalReportsRoutes.get("/latest", requireAuth, (req: AuthenticatedRequest, res) => {
  return ok(res, {
    userId: req.user?.sub,
    topCareers: [
      { careerId: "software-engineering", score: 92 },
      { careerId: "business-administration", score: 78 }
    ],
    status: "mock"
  });
});
