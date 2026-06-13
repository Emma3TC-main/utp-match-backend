import { Router } from "express";
import { ok } from "../../shared/responses/api-response";

export const profilesRoutes = Router();

profilesRoutes.get("/me", (_req, res) => {
  return ok(res, {
    module: "profiles",
    status: "ready",
    mode: "stub"
  });
});
