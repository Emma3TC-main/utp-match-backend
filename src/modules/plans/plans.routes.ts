import { Router } from "express";
import { ok } from "../../shared/responses/api-response";

export const plansRoutes = Router();

plansRoutes.get("/", (_req, res) => {
  return ok(res, {
    module: "plans",
    status: "ready",
    mode: "stub",
    items: []
  });
});
