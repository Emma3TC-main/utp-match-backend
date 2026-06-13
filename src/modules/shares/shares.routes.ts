import { Router } from "express";
import { ok } from "../../shared/responses/api-response";

export const sharesRoutes = Router();

sharesRoutes.get("/", (_req, res) => {
  return ok(res, {
    module: "shares",
    status: "ready",
    mode: "stub"
  });
});
