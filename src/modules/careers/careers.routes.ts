import { Router } from "express";
import { ok } from "../../shared/responses/api-response";

export const careersRoutes = Router();

careersRoutes.get("/", (_req, res) => {
  return ok(res, {
    module: "careers",
    status: "ready",
    mode: "stub",
    items: []
  });
});
