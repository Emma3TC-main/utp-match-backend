import { Router } from "express";
import { ok } from "../../shared/responses/api-response";
import { requireAuth, AuthenticatedRequest } from "../../middlewares/auth.middleware";

export const profilesRoutes = Router();

profilesRoutes.get("/me", requireAuth, (req: AuthenticatedRequest, res) => {
  return ok(res, {
    id: "mock-profile-id",
    userId: req.user?.sub,
    grade: "5to secundaria",
    interests: ["tecnología", "negocios", "resolver problemas"],
    status: "mock"
  });
});

profilesRoutes.patch("/me", requireAuth, (req: AuthenticatedRequest, res) => {
  return ok(res, {
    message: "Perfil actualizado en modo mock",
    userId: req.user?.sub,
    received: req.body
  });
});
