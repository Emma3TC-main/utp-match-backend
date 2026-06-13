import { Router } from "express";
import { ok } from "../../shared/responses/api-response";
import { requireAuth } from "../../middlewares/auth.middleware";

export const syllabiRoutes = Router();

syllabiRoutes.get("/:syllabusId", (req, res) => {
  return ok(res, {
    syllabusId: req.params.syllabusId,
    course: "Curso demo",
    competencies: ["Pensamiento crítico", "Aplicación práctica"],
    status: "mock"
  });
});

syllabiRoutes.post("/:syllabusId/explain", requireAuth, (req, res) => {
  return ok(res, {
    syllabusId: req.params.syllabusId,
    explanation: {
      simpleSummary: "Este curso te ayuda a entender conceptos base y aplicarlos en proyectos reales.",
      whyItMatters: "Sirve para conectar lo aprendido con situaciones laborales."
    },
    chatlyEnabled: false,
    status: "mock"
  });
});
