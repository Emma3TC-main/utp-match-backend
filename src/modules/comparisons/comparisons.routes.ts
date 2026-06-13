import { Router } from "express";
import { ok } from "../../shared/responses/api-response";
import { requireAuth, AuthenticatedRequest } from "../../middlewares/auth.middleware";

export const comparisonsRoutes = Router();

comparisonsRoutes.post("/", requireAuth, (req: AuthenticatedRequest, res) => {
  return ok(res, {
    message: "Comparación generada en modo mock",
    userId: req.user?.sub,
    input: req.body,
    comparison: {
      summary: "Ingeniería de Software se alinea mejor si el alumno disfruta crear soluciones tecnológicas.",
      criteria: [
        {
          name: "Afinidad vocacional",
          winner: "software-engineering",
          reason: "Mayor relación con tecnología, resolución de problemas y creación digital."
        },
        {
          name: "Empleabilidad",
          winner: "software-engineering",
          reason: "Alta demanda en desarrollo, cloud, datos e IA."
        }
      ]
    }
  });
});
