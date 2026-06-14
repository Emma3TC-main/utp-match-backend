import { z } from "zod";
import { nonEmptyStringSchema } from "../../../shared/schemas/common.schema";

export const shareAudienceSchema = z.enum([
  "family",
  "advisor",
  "public_demo"
]);

export const shareTokenParamsSchema = z.object({
  token: nonEmptyStringSchema
});

export const shareCreateSchema = z.object({
  ownerProfileId: nonEmptyStringSchema,
  comparisonId: z.string().nullable().optional(),
  planId: z.string().nullable().optional(),
  vocationalReportId: z.string().nullable().optional(),
  audience: shareAudienceSchema,
  title: z.string().trim().optional(),
  summary: z.string().trim().optional(),
  expiresAt: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).default({})
}).refine(
  (data) => Boolean(data.comparisonId || data.planId || data.vocationalReportId),
  {
    message: "Debe enviarse al menos comparisonId, planId o vocationalReportId.",
    path: ["comparisonId"]
  }
);

export const shareQuerySchema = z.object({
  ownerProfileId: z.string().trim().optional(),
  audience: shareAudienceSchema.optional(),
  revoked: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50)
});

export const shareRevokeSchema = z.object({
  reason: z.string().trim().optional()
});

export const shareRecordSchema = shareCreateSchema.extend({
  id: nonEmptyStringSchema,
  token: nonEmptyStringSchema,
  shareUrl: nonEmptyStringSchema,
  revokedAt: z.string().nullable(),
  createdAt: nonEmptyStringSchema,
  updatedAt: nonEmptyStringSchema
});

export const sharedSummarySchema = z.object({
  token: nonEmptyStringSchema,
  audience: shareAudienceSchema,
  ownerProfileId: nonEmptyStringSchema,
  comparisonId: z.string().nullable().optional(),
  planId: z.string().nullable().optional(),
  vocationalReportId: z.string().nullable().optional(),
  title: nonEmptyStringSchema,
  summary: nonEmptyStringSchema,
  status: z.enum(["active", "revoked", "expired"]),
  expiresAt: z.string().nullable().optional(),
  createdAt: nonEmptyStringSchema
});

export type ShareAudienceDto = z.infer<typeof shareAudienceSchema>;
export type ShareCreateDto = z.infer<typeof shareCreateSchema>;
export type ShareQueryDto = z.infer<typeof shareQuerySchema>;
export type ShareRevokeDto = z.infer<typeof shareRevokeSchema>;
export type ShareRecordDto = z.infer<typeof shareRecordSchema>;
export type SharedSummaryDto = z.infer<typeof sharedSummarySchema>;
