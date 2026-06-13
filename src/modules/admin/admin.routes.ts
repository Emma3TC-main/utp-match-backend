import { Router } from "express";
import { ok } from "../../shared/responses/api-response";

export const adminRoutes = Router();

adminRoutes.get("/status", (_req, res) => {
  return ok(res, {
    module: "admin",
    status: "ready",
    mode: "stub"
  });
});
