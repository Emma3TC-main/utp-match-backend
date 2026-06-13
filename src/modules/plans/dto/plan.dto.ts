import { z } from "zod";

export const planTaskSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  type: z.enum([
    "review_syllabus",
    "talk_family",
    "attend_event",
    "ask_advisor",
    "compare_again",
    "prepare_skill"
  ]),
  dueDate: z.string().nullable().optional(),
  status: z.enum(["pending", "done", "skipped"]).default("pending")
});

export const actionPlanCreateSchema = z.object({
  studentProfileId: z.string(),
  targetCareerId: z.string(),
  targetTerm: z.string().optional(),
  tasks: z.array(planTaskSchema).min(1),
  notes: z.string().optional()
});

export const actionPlanSchema = actionPlanCreateSchema.extend({
  id: z.string(),
  status: z.enum(["draft", "active", "completed", "archived"]),
  createdAt: z.string()
});

export const actionPlanPatchSchema = z.object({
  status: z.enum(["draft", "active", "completed", "archived"]).optional(),
  tasks: z.array(planTaskSchema).optional(),
  notes: z.string().optional()
});

export const planIdParamsSchema = z.object({
  planId: z.string()
});

export type PlanTaskDto = z.infer<typeof planTaskSchema>;
export type ActionPlanCreateDto = z.infer<typeof actionPlanCreateSchema>;
export type ActionPlanDto = z.infer<typeof actionPlanSchema>;
export type ActionPlanPatchDto = z.infer<typeof actionPlanPatchSchema>;
