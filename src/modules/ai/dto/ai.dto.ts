import { z } from "zod";
import { nonEmptyStringSchema } from "../../../shared/schemas/common.schema";

export const aiStatusSchema = z.object({
  enabled: z.boolean(),
  provider: z.string(),
  model: z.string(),
  fallbackProvider: z.string(),
  geminiApiKeyConfigured: z.boolean(),
  message: z.string()
});

export const aiTestRequestSchema = z.object({
  prompt: z.string().trim().min(1).optional()
});

export const aiTestResponseSchema = z.object({
  provider: z.string(),
  model: z.string(),
  modelVersion: z.string().nullable().optional(),
  generatedText: z.string(),
  latencyMs: z.number().int().nonnegative(),
  usageMetadata: z.unknown().nullable().optional()
});

export const aiAskRequestSchema = z.object({
  question: nonEmptyStringSchema,
  studentProfileId: z.string().trim().optional(),
  careerIds: z.array(z.string()).default([]),
  syllabusIds: z.array(z.string()).default([]),
  maxContextItems: z.coerce.number().int().min(1).max(12).default(8)
});

export type AiStatusDto = z.infer<typeof aiStatusSchema>;
export type AiTestRequestDto = z.infer<typeof aiTestRequestSchema>;
export type AiTestResponseDto = z.infer<typeof aiTestResponseSchema>;
export type AiAskRequestDto = z.infer<typeof aiAskRequestSchema>;
