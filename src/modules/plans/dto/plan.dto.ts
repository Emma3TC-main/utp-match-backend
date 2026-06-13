import { z } from "zod";
import { nonEmptyStringSchema } from "../../../shared/schemas/common.schema";

export const planIdParamsSchema = z.object({
  planId: nonEmptyStringSchema
});

export const planTaskIdParamsSchema = z.object({
  planId: nonEmptyStringSchema,
  taskId: nonEmptyStringSchema
});

export const planTaskTypeSchema = z.enum([
  "review_syllabus",
  "talk_family",
  "attend_event",
  "ask_advisor",
  "compare_again",
  "prepare_skill"
]);

export const planTaskStatusSchema = z.enum(["pending", "done", "skipped"]);

export const planStatusSchema = z.enum([
  "draft",
  "active",
  "completed",
  "archived"
]);

export const planTaskSchema = z.object({
  id: z.string().optional(),
  title: nonEmptyStringSchema,
  description: z.string().optional(),
  type: planTaskTypeSchema,
  dueDate: z.string().nullable().optional(),
  status: planTaskStatusSchema.default("pending"),
  relatedCareerId: z.string().optional(),
  relatedSyllabusId: z.string().optional()
});

export const actionPlanCreateSchema = z.object({
  studentProfileId: nonEmptyStringSchema,
  targetCareerId: nonEmptyStringSchema,
  comparisonId: z.string().nullable().optional(),
  targetTerm: z.string().optional(),
  tasks: z.array(planTaskSchema).min(1),
  notes: z.string().optional(),
  context: z.record(z.string(), z.unknown()).default({})
});

export const actionPlanPatchSchema = z.object({
  status: planStatusSchema.optional(),
  tasks: z.array(planTaskSchema).optional(),
  notes: z.string().optional(),
  targetTerm: z.string().optional()
});

export const actionPlanQuerySchema = z.object({
  studentProfileId: z.string().trim().optional(),
  targetCareerId: z.string().trim().optional(),
  status: planStatusSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50)
});

export const updatePlanTaskStatusSchema = z.object({
  status: planTaskStatusSchema
});

export const actionPlanSchema = actionPlanCreateSchema.extend({
  id: nonEmptyStringSchema,
  status: planStatusSchema,
  progressPercent: z.number().int().min(0).max(100),
  createdAt: nonEmptyStringSchema,
  updatedAt: nonEmptyStringSchema
});

export type PlanTaskTypeDto = z.infer<typeof planTaskTypeSchema>;
export type PlanTaskStatusDto = z.infer<typeof planTaskStatusSchema>;
export type PlanStatusDto = z.infer<typeof planStatusSchema>;
export type PlanTaskDto = z.infer<typeof planTaskSchema>;
export type ActionPlanCreateDto = z.infer<typeof actionPlanCreateSchema>;
export type ActionPlanPatchDto = z.infer<typeof actionPlanPatchSchema>;
export type ActionPlanQueryDto = z.infer<typeof actionPlanQuerySchema>;
export type UpdatePlanTaskStatusDto = z.infer<typeof updatePlanTaskStatusSchema>;
export type ActionPlanDto = z.infer<typeof actionPlanSchema>;
