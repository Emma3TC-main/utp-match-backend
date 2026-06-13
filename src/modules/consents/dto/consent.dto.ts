import { z } from "zod";

export const consentRequestSchema = z.object({
  studentProfileId: z.string(),
  consentType: z.enum([
    "terms",
    "privacy",
    "vocational_report_processing",
    "ai_processing",
    "family_share"
  ]),
  version: z.string(),
  granted: z.boolean().default(true)
});

export const consentRecordSchema = consentRequestSchema.extend({
  id: z.string(),
  grantedAt: z.string(),
  revokedAt: z.string().nullable().optional()
});

export type ConsentRequestDto = z.infer<typeof consentRequestSchema>;
export type ConsentRecordDto = z.infer<typeof consentRecordSchema>;
