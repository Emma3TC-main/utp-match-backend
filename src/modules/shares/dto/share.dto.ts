import { z } from "zod";

export const shareCreateSchema = z.object({
  ownerProfileId: z.string(),
  comparisonId: z.string().nullable().optional(),
  planId: z.string().nullable().optional(),
  audience: z.enum(["family", "advisor", "public_demo"]),
  expiresAt: z.string().nullable().optional()
});

export const shareResponseSchema = z.object({
  shareUrl: z.string(),
  expiresAt: z.string().nullable().optional()
});

export const shareTokenParamsSchema = z.object({
  token: z.string().min(1)
});

export const sharedSummarySchema = z.object({
  comparison: z.unknown().optional(),
  plan: z.unknown().optional()
});

export type ShareCreateDto = z.infer<typeof shareCreateSchema>;
export type ShareResponseDto = z.infer<typeof shareResponseSchema>;
export type SharedSummaryDto = z.infer<typeof sharedSummarySchema>;
