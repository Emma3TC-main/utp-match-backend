import { z } from "zod";
import { nonEmptyStringSchema } from "../../../shared/schemas/common.schema";

export const consentTypeSchema = z.enum([
  "terms",
  "privacy",
  "vocational_report_processing",
  "ai_processing",
  "family_share"
]);

export const consentSourceSchema = z.enum([
  "onboarding",
  "profile",
  "vocational_report_flow",
  "comparison_flow",
  "syllabus_flow",
  "share_flow",
  "admin"
]);

export const consentIdParamsSchema = z.object({
  consentId: nonEmptyStringSchema
});

export const consentCreateSchema = z.object({
  studentProfileId: nonEmptyStringSchema,
  consentType: consentTypeSchema,
  version: nonEmptyStringSchema,
  granted: z.boolean().default(true),
  source: consentSourceSchema.default("onboarding"),
  metadata: z.record(z.string(), z.unknown()).default({})
});

export const consentQuerySchema = z.object({
  studentProfileId: z.string().trim().optional(),
  consentType: consentTypeSchema.optional(),
  granted: z.coerce.boolean().optional()
});

export const revokeConsentSchema = z.object({
  reason: z.string().trim().optional()
});

export const consentRecordSchema = consentCreateSchema.extend({
  id: nonEmptyStringSchema,
  grantedAt: z.string().nullable(),
  revokedAt: z.string().nullable(),
  createdAt: nonEmptyStringSchema,
  updatedAt: nonEmptyStringSchema
});

export const requiredConsentSchema = z.object({
  consentType: consentTypeSchema,
  version: nonEmptyStringSchema,
  title: nonEmptyStringSchema,
  description: nonEmptyStringSchema,
  required: z.boolean(),
  blocking: z.boolean(),
  recommendedFor: z.array(z.string()).default([])
});

export type ConsentTypeDto = z.infer<typeof consentTypeSchema>;
export type ConsentCreateDto = z.infer<typeof consentCreateSchema>;
export type ConsentQueryDto = z.infer<typeof consentQuerySchema>;
export type RevokeConsentDto = z.infer<typeof revokeConsentSchema>;
export type ConsentRecordDto = z.infer<typeof consentRecordSchema>;
export type RequiredConsentDto = z.infer<typeof requiredConsentSchema>;
