import { z } from "zod";
import { nonEmptyStringSchema } from "../../../shared/schemas/common.schema";

export const adminCatalogStatusSchema = z.enum([
  "draft",
  "published",
  "archived"
]);

export const adminCareerCreateSchema = z.object({
  id: z.string().trim().optional(),
  utpCode: z.string().trim().optional(),
  name: nonEmptyStringSchema,
  faculty: nonEmptyStringSchema,
  studyMode: z.string().trim().optional(),
  shortDescription: z.string().trim().optional(),
  valueProposition: z.string().trim().optional(),
  tags: z.array(z.string()).default([]),
  status: adminCatalogStatusSchema.default("draft")
});

export const adminSyllabusCreateSchema = z.object({
  syllabusId: z.string().trim().optional(),
  careerId: nonEmptyStringSchema,
  courseId: nonEmptyStringSchema,
  courseName: nonEmptyStringSchema,
  cycleNumber: z.number().int().min(1).max(12),
  area: nonEmptyStringSchema,
  credits: z.number().int().min(0),
  versionLabel: nonEmptyStringSchema,
  pdfUrl: z.string().nullable().optional(),
  parsed: z.record(z.string(), z.unknown()).default({}),
  status: adminCatalogStatusSchema.default("draft")
});

export const adminAuditQuerySchema = z.object({
  entityType: z.enum(["career", "syllabus", "course", "all"]).default("all"),
  limit: z.coerce.number().int().min(1).max(100).default(50)
});

export const adminCatalogRecordSchema = z.object({
  id: nonEmptyStringSchema,
  entityType: z.enum(["career", "syllabus"]),
  status: adminCatalogStatusSchema,
  payload: z.record(z.string(), z.unknown()),
  createdAt: nonEmptyStringSchema,
  updatedAt: nonEmptyStringSchema
});

export const adminAuditRecordSchema = z.object({
  id: nonEmptyStringSchema,
  action: nonEmptyStringSchema,
  entityType: nonEmptyStringSchema,
  entityId: nonEmptyStringSchema,
  actor: nonEmptyStringSchema,
  metadata: z.record(z.string(), z.unknown()).default({}),
  createdAt: nonEmptyStringSchema
});

export type AdminCatalogStatusDto = z.infer<typeof adminCatalogStatusSchema>;
export type AdminCareerCreateDto = z.infer<typeof adminCareerCreateSchema>;
export type AdminSyllabusCreateDto = z.infer<typeof adminSyllabusCreateSchema>;
export type AdminAuditQueryDto = z.infer<typeof adminAuditQuerySchema>;
export type AdminCatalogRecordDto = z.infer<typeof adminCatalogRecordSchema>;
export type AdminAuditRecordDto = z.infer<typeof adminAuditRecordSchema>;
