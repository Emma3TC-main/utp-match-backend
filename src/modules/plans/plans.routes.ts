import { Router } from "express";
import { ok } from "../../shared/responses/api-response";
import { requireAuth, AuthenticatedRequest } from "../../middlewares/auth.middleware";

export const plansRoutes = Router();

plansRoutes.post("/", requireAuth, (req: AuthenticatedRequest, res) => {
  return ok(res, {
    message: "Plan de acción creado en modo mock",
    userId: req.user?.sub,
    plan: {
      tasks: [
        "Revisar malla curricular de la carrera elegida",
        "Comparar campo laboral",
        "Conversar con familia usando resumen vocacional"
      ]
    },
    received: req.body
  });
});

plansRoutes.get("/:planId", requireAuth, (req, res) => {
  return ok(res, {
    planId: req.params.planId,
    status: "mock",
    tasks: [
      { title: "Explorar carrera", done: false },
      { title: "Revisar sílabo", done: false }
    ]
  });
});
