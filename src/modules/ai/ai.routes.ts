import { Router } from "express";
import { env } from "../../config/env";
import { ok, fail } from "../../shared/responses/api-response";
import { validateRequest } from "../../shared/validation/validate-request";
import { aiAskRequestSchema, aiTestRequestSchema } from "./dto/ai.dto";
import { AiService } from "./ai.service";

export const aiRoutes = Router();
const aiService = new AiService();

function handleAiError(res: Parameters<typeof fail>[0], error: unknown) {
  const message = error instanceof Error ? error.message : "Error desconocido";

  if (message === "AI_DISABLED") {
    return fail(
      res,
      503,
      "AI_DISABLED",
      "El proveedor IA está desactivado. Revisar AI_ENABLED=true en .env."
    );
  }

  if (message === "AI_PROVIDER_NOT_SUPPORTED") {
    return fail(
      res,
      400,
      "AI_PROVIDER_NOT_SUPPORTED",
      "Este endpoint está configurado para usar Gemini.",
      [{ provider: env.aiProvider }]
    );
  }

  if (message === "GEMINI_API_KEY_NOT_CONFIGURED") {
    return fail(
      res,
      503,
      "GEMINI_API_KEY_NOT_CONFIGURED",
      "La API Key de Gemini no está configurada o es temporal."
    );
  }

  return fail(
    res,
    500,
    "AI_PROVIDER_ERROR",
    "No se pudo generar una respuesta con IA.",
    [message]
  );
}

aiRoutes.get("/status", (_req, res) => {
  return ok(res, {
    enabled: env.aiEnabled,
    provider: env.aiProvider,
    model: env.aiModel,
    fallbackProvider: env.aiFallbackProvider,
    geminiApiKeyConfigured: env.geminiApiKeyConfigured,
    message: env.aiEnabled
      ? "AI Provider habilitado."
      : "AI Provider desactivado. El MVP puede usar fallback mock."
  });
});

aiRoutes.post(
  "/test",
  validateRequest({ body: aiTestRequestSchema }),
  async (req, res) => {
    const prompt =
      typeof req.body?.prompt === "string" && req.body.prompt.trim().length > 0
        ? req.body.prompt.trim()
        : "Responde solo con OK si Gemini está funcionando.";

    try {
      const result = await aiService.generateText(prompt, 80);

      return ok(res, {
        provider: env.aiProvider,
        model: env.aiModel,
        modelVersion: result.modelVersion,
        generatedText: result.generatedText,
        latencyMs: result.latencyMs,
        usageMetadata: result.usageMetadata
      });
    } catch (error) {
      return handleAiError(res, error);
    }
  }
);

aiRoutes.post(
  "/ask",
  validateRequest({ body: aiAskRequestSchema }),
  async (req, res) => {
    try {
      const result = await aiService.askWithKnowledge(req.body);

      return ok(res, result);
    } catch (error) {
      return handleAiError(res, error);
    }
  }
);
