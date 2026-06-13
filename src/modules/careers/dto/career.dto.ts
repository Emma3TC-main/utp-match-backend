import { z } from "zod";
import {
  idSchema,
  intensity0To10Schema,
  nonEmptyStringSchema
} from "../../../shared/schemas/common.schema";

export const careerIdParamsSchema = z.object({
  careerId: idSchema
});

export const careerQuerySchema = z.object({
  q: z.string().trim().optional(),
  faculty: z.string().trim().optional(),
  studyMode: z.string().trim().optional(),
  tag: z.string().trim().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20)
});

export const careerSchema = z.object({
  id: nonEmptyStringSchema,
  utpCode: z.string().optional(),
  name: nonEmptyStringSchema,
  faculty: z.string().optional(),
  studyMode: z.string().optional(),
  shortDescription: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "archived"]).default("published")
});

export const careerDetailSchema = careerSchema.extend({
  valueProposition: z.string().optional(),
  firstCycleSummary: z.string().optional(),
  dominantSkills: z.array(z.string()).default([]),
  possibleRoles: z.array(z.string()).default([]),
  studentFitSignals: z.array(z.string()).default([])
});

export const curriculumCourseSchema = z.object({
  courseId: nonEmptyStringSchema,
  syllabusId: z.string().nullable().optional(),
  name: nonEmptyStringSchema,
  credits: z.number().int().min(0),
  area: nonEmptyStringSchema,
  cycleNumber: z.number().int().min(1),
  summary: z.string().optional(),
  intensity: z.record(z.string(), intensity0To10Schema).optional()
});

export const careerCurriculumResponseSchema = z.object({
  careerId: nonEmptyStringSchema,
  careerName: nonEmptyStringSchema,
  faculty: z.string().optional(),
  studyMode: z.string().optional(),
  cycles: z.array(
    z.object({
      cycleNumber: z.number().int().min(1),
      courses: z.array(curriculumCourseSchema)
    })
  )
});

export type CareerQueryDto = z.infer<typeof careerQuerySchema>;
export type CareerDto = z.infer<typeof careerSchema>;
export type CareerDetailDto = z.infer<typeof careerDetailSchema>;
export type CurriculumCourseDto = z.infer<typeof curriculumCourseSchema>;
export type CareerCurriculumResponseDto = z.infer<typeof careerCurriculumResponseSchema>;
