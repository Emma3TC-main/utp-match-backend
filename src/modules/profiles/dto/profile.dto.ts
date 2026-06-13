import { z } from "zod";

export const studentProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  firstName: z.string().nullable().optional(),
  schoolYear: z.enum(["4_secundaria", "5_secundaria", "egresado", "otro"]),
  campusInterest: z.string().nullable().optional(),
  ageBand: z.enum(["under_16", "16_17", "18_plus", "unknown"]).nullable().optional(),
  preferredLanguage: z.string().default("es-PE"),
  familyShareEnabled: z.boolean().default(false)
});

export const studentProfilePatchSchema = z.object({
  firstName: z.string().trim().min(1).optional(),
  schoolYear: z.enum(["4_secundaria", "5_secundaria", "egresado", "otro"]).optional(),
  campusInterest: z.string().trim().min(1).optional(),
  ageBand: z.enum(["under_16", "16_17", "18_plus", "unknown"]).optional(),
  preferredLanguage: z.string().trim().min(2).optional(),
  familyShareEnabled: z.boolean().optional()
});

export type StudentProfileDto = z.infer<typeof studentProfileSchema>;
export type StudentProfilePatchDto = z.infer<typeof studentProfilePatchSchema>;
