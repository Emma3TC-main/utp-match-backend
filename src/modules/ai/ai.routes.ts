import { Router } from "express";
import { env } from "../../config/env";
import { ok } from "../../shared/responses/api-response";

export const aiRoutes = Router();

aiRoutes.get("/status", (_req, res) => {
  return ok(res, {
    provider: "Chatly AI / DeepSeek",
    model: env.chatlyModel,
    enabled: env.chatlyEnabled,
    message: env.chatlyEnabled
      ? "IA habilitada"
      : "IA desactivada hasta configurar CHATLY_API_KEY"
  });
});
