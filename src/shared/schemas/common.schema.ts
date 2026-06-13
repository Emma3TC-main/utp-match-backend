import { z } from "zod";

export const idSchema = z.string().trim().min(1);
export const uuidSchema = z.string().uuid();
export const nonEmptyStringSchema = z.string().trim().min(1);
export const optionalStringSchema = z.string().trim().optional();

export const score0To100Schema = z.number().int().min(0).max(100);
export const intensity0To10Schema = z.number().int().min(0).max(10);

export const audienceModeSchema = z.enum(["student", "family", "advisor"]);
export const explanationStyleSchema = z.enum([
  "clear_youthful",
  "family_friendly",
  "technical_light"
]);

export const modelMetadataSchema = z.object({
  provider: z.enum(["gemini", "mock"]).default("gemini"),
  model: z.string().default("gemini-3.1-flash-lite"),
  promptVersion: z.string().optional(),
  cacheHit: z.boolean().default(false),
  fallbackUsed: z.boolean().default(false),
  latencyMs: z.number().int().nonnegative().optional(),
  safetyNotes: z.array(z.string()).optional()
});

export type ModelMetadataDto = z.infer<typeof modelMetadataSchema>;
