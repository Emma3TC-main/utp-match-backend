import { z } from "zod";
import { idSchema, intensity0To10Schema } from "../../../shared/schemas/common.schema";

export const careerIdParamsSchema = z.object({
  careerId: idSchema
});

export const careerQuerySchema = z.object({
  q: z.string().trim().optional(),
  faculty: z.string().trim().optional()
});

export const careerSchema = z.object({
  id: z.string(),
  utpCode: z.string().optional(),
  name: z.string(),
  faculty: z.string().optional(),
  studyMode: z.string().optional(),
  shortDescription: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.string().default("published")
});

export const careerDetailSchema = careerSchema.extend({
  valueProposition: z.string().optional(),
  firstCycleSummary: z.string().optional(),
  dominantSkills: z.array(z.string()).default([])
});

export const curriculumCourseSchema = z.object({
  courseId: z.string(),
  syllabusId: z.string().nullable().optional(),
  name: z.string(),
  credits: z.number().int().min(0),
  area: z.string(),
  summary: z.string().optional(),
  intensity: z.record(z.string(), intensity0To10Schema).optional()
});

export const careerCurriculumResponseSchema = z.object({
  careerId: z.string(),
  careerName: z.string(),
  faculty: z.string().optional(),
  studyMode: z.string().optional(),
  cycles: z.array(
    z.object({
      cycleNumber: z.number().int().min(1),
      courses: z.array(curriculumCourseSchema)
    })
  )
});

export type CareerDto = z.infer<typeof careerSchema>;
export type CareerDetailDto = z.infer<typeof careerDetailSchema>;
export type CurriculumCourseDto = z.infer<typeof curriculumCourseSchema>;
export type CareerCurriculumResponseDto = z.infer<typeof careerCurriculumResponseSchema>;
