import { Router } from "express";
import { ok } from "../../shared/responses/api-response";

export const vocationalReportsRoutes = Router();

vocationalReportsRoutes.get("/", (_req, res) => {
  return ok(res, {
    module: "vocational-reports",
    status: "ready",
    mode: "stub",
    items: []
  });
});
