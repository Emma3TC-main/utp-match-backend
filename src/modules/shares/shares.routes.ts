import { Router } from "express";
import { ok } from "../../shared/responses/api-response";
import { requireAuth } from "../../middlewares/auth.middleware";

export const sharesRoutes = Router();

sharesRoutes.post("/", requireAuth, (_req, res) => {
  return ok(res, {
    message: "Link compartible creado en modo mock",
    shareUrl: "http://localhost:3000/v1/shares/mock-token",
    expiresIn: "7d"
  });
});

sharesRoutes.get("/:token", (req, res) => {
  return ok(res, {
    token: req.params.token,
    summary: "Resumen vocacional compartible en modo mock",
    visibleData: ["carrera recomendada", "motivos", "plan de acción"]
  });
});
