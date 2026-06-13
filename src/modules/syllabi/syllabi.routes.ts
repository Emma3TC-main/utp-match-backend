import { Router } from "express";
import { ok } from "../../shared/responses/api-response";

export const syllabiRoutes = Router();

syllabiRoutes.get("/", (_req, res) => {
  return ok(res, {
    module: "syllabi",
    status: "ready",
    mode: "stub",
    items: []
  });
});
