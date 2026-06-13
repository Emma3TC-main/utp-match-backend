import { Router } from "express";
import { ok } from "../../shared/responses/api-response";

export const eventsRoutes = Router();

eventsRoutes.post("/", (req, res) => {
  return ok(res, {
    message: "Evento analítico recibido en modo mock",
    received: req.body
  });
});
