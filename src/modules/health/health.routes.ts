import { Router } from "express";
import { env } from "../../config/env";
import { checkDatabaseConnection } from "../../db/pool";
import { ok, fail } from "../../shared/responses/api-response";

export const healthRoutes = Router();

healthRoutes.get("/", (_req, res) => {
  return ok(res, {
    status: "ok",
    service: "utp-match-backend",
    environment: env.nodeEnv,
    databaseEnabled: env.databaseEnabled,
    chatlyEnabled: env.chatlyEnabled
  });
});

healthRoutes.get("/db", async (_req, res) => {
  try {
    const dbStatus = await checkDatabaseConnection();

    return ok(res, {
      databaseEnabled: dbStatus.enabled,
      database: dbStatus.connected ? "connected" : "not_connected",
      message: dbStatus.message
    });
  } catch (error) {
    return fail(
      res,
      500,
      "DATABASE_CONNECTION_ERROR",
      "No se pudo conectar a la base de datos",
      [error instanceof Error ? error.message : "Error desconocido"]
    );
  }
});

healthRoutes.get("/ai", (_req, res) => {
  return ok(res, {
    chatlyEnabled: env.chatlyEnabled,
    provider: "Chatly AI / DeepSeek",
    model: env.chatlyModel,
    message: env.chatlyEnabled
      ? "Chatly está habilitado."
      : "Chatly está desactivado temporalmente hasta configurar CHATLY_API_KEY."
  });
});
