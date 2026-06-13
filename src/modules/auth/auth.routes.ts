import { Router } from "express";
import { ok } from "../../shared/responses/api-response";

export const authRoutes = Router();

authRoutes.get("/status", (_req, res) => {
  return ok(res, {
    module: "auth",
    status: "ready",
    mode: "stub"
  });
});
