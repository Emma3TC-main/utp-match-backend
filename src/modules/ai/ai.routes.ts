import { Router } from "express";
import { env } from "../../config/env";
import { ok, fail } from "../../shared/responses/api-response";

export const aiRoutes = Router();

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  usageMetadata?: unknown;
  modelVersion?: string;
};

function getGeminiGenerateUrl(): string {
  return `https://generativelanguage.googleapis.com/v1beta/models/${env.aiModel}:generateContent`;
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

aiRoutes.post("/test", async (req, res) => {
  if (!env.aiEnabled) {
    return fail(
      res,
      503,
      "AI_DISABLED",
      "El proveedor IA está desactivado. Revisar AI_ENABLED=true en .env."
    );
  }

  if (env.aiProvider !== "gemini") {
    return fail(
      res,
      400,
      "AI_PROVIDER_NOT_SUPPORTED",
      "Esta prueba solo está configurada para Gemini.",
      [{ provider: env.aiProvider }]
    );
  }

  if (!env.geminiApiKeyConfigured) {
    return fail(
      res,
      503,
      "GEMINI_API_KEY_NOT_CONFIGURED",
      "La API Key de Gemini no está configurada o es temporal."
    );
  }

  const prompt =
    typeof req.body?.prompt === "string" && req.body.prompt.trim().length > 0
      ? req.body.prompt.trim()
      : "Responde solo con OK si Gemini está funcionando.";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.geminiTimeoutMs);

  const startedAt = Date.now();

  try {
    const response = await fetch(getGeminiGenerateUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": env.geminiApiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0,
          maxOutputTokens: 80
        }
      }),
      signal: controller.signal
    });

    const rawText = await response.text();

    if (!response.ok) {
      return fail(
        res,
        response.status,
        "GEMINI_API_ERROR",
        "Gemini respondió con error.",
        [
          {
            status: response.status,
            body: rawText.slice(0, 2000)
          }
        ]
      );
    }

    const data = JSON.parse(rawText) as GeminiGenerateContentResponse;
    const generatedText =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim() || "";

    if (!generatedText) {
      return fail(
        res,
        502,
        "GEMINI_EMPTY_RESPONSE",
        "Gemini respondió, pero no devolvió texto usable.",
        [data]
      );
    }

    return ok(res, {
      provider: env.aiProvider,
      model: env.aiModel,
      modelVersion: data.modelVersion || null,
      generatedText,
      latencyMs: Date.now() - startedAt,
      usageMetadata: data.usageMetadata || null
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return fail(
        res,
        504,
        "GEMINI_TIMEOUT",
        `Gemini no respondió dentro de ${env.geminiTimeoutMs}ms.`
      );
    }

    return fail(
      res,
      500,
      "GEMINI_TEST_ERROR",
      "No se pudo probar Gemini.",
      [error instanceof Error ? error.message : "Error desconocido"]
    );
  } finally {
    clearTimeout(timeout);
  }
});
