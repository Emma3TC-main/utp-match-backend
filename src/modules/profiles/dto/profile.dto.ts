import { z } from "zod";
import { nonEmptyStringSchema } from "../../../shared/schemas/common.schema";

export const profileIdParamsSchema = z.object({
  profileId: nonEmptyStringSchema
});

export const schoolYearSchema = z.enum([
  "4_secundaria",
  "5_secundaria",
  "egresado",
  "otro"
]);

export const ageBandSchema = z.enum([
  "under_16",
  "16_17",
  "18_plus",
  "unknown"
]);

export const profileSourceSchema = z.enum([
  "onboarding",
  "manual",
  "auth_guest",
  "advisor_entry",
  "mock_demo",
  "local-test",
  "thunder-client"
]);

export const studentProfileCreateSchema = z.object({
  userId: z.string().trim().optional(),
  firstName: z.string().trim().min(1).max(80).optional(),
  schoolYear: schoolYearSchema,
  campusInterest: z.string().trim().optional(),
  ageBand: ageBandSchema.default("unknown"),
  preferredLanguage: z.string().trim().min(2).default("es-PE"),
  familyShareEnabled: z.boolean().default(false),
  interests: z.array(z.string()).default([]),
  strengths: z.array(z.string()).default([]),
  concerns: z.array(z.string()).default([]),
  source: profileSourceSchema.default("onboarding"),
  metadata: z.record(z.string(), z.unknown()).default({})
});

export const studentProfilePatchSchema = z.object({
  firstName: z.string().trim().min(1).max(80).optional(),
  schoolYear: schoolYearSchema.optional(),
  campusInterest: z.string().trim().optional(),
  ageBand: ageBandSchema.optional(),
  preferredLanguage: z.string().trim().min(2).optional(),
  familyShareEnabled: z.boolean().optional(),
  interests: z.array(z.string()).optional(),
  strengths: z.array(z.string()).optional(),
  concerns: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional()
});

export const studentProfileQuerySchema = z.object({
  userId: z.string().trim().optional(),
  schoolYear: schoolYearSchema.optional(),
  ageBand: ageBandSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50)
});

export const studentProfileSchema = studentProfileCreateSchema.extend({
  id: nonEmptyStringSchema,
  userId: nonEmptyStringSchema,
  createdAt: nonEmptyStringSchema,
  updatedAt: nonEmptyStringSchema
});

export type SchoolYearDto = z.infer<typeof schoolYearSchema>;
export type AgeBandDto = z.infer<typeof ageBandSchema>;
export type ProfileSourceDto = z.infer<typeof profileSourceSchema>;
export type StudentProfileCreateDto = z.infer<typeof studentProfileCreateSchema>;
export type StudentProfilePatchDto = z.infer<typeof studentProfilePatchSchema>;
export type StudentProfileQueryDto = z.infer<typeof studentProfileQuerySchema>;
export type StudentProfileDto = z.infer<typeof studentProfileSchema>;
