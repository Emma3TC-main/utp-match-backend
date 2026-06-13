import { Router } from "express";
import { ok } from "../../shared/responses/api-response";

export const eventsRoutes = Router();

eventsRoutes.post("/", (_req, res) => {
  return ok(res, {
    module: "events",
    status: "received",
    mode: "stub"
  });
});
