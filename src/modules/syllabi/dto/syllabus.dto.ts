import { z } from "zod";
import {
  audienceModeSchema,
  explanationStyleSchema,
  intensity0To10Schema,
  modelMetadataSchema,
  nonEmptyStringSchema
} from "../../../shared/schemas/common.schema";

export const syllabusIdParamsSchema = z.object({
  syllabusId: nonEmptyStringSchema
});

export const syllabusQuerySchema = z.object({
  careerId: z.string().trim().optional(),
  courseId: z.string().trim().optional(),
  q: z.string().trim().optional(),
  cycleNumber: z.coerce.number().int().min(1).max(12).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20)
});

export const syllabusSummarySchema = z.object({
  syllabusId: nonEmptyStringSchema,
  careerId: nonEmptyStringSchema,
  courseId: nonEmptyStringSchema,
  courseName: nonEmptyStringSchema,
  cycleNumber: z.number().int().min(1),
  area: nonEmptyStringSchema,
  credits: z.number().int().min(0),
  versionLabel: nonEmptyStringSchema,
  shortDescription: z.string().optional(),
  pdfUrl: z.string().nullable().optional()
});

export const syllabusDetailSchema = syllabusSummarySchema.extend({
  parsed: z.object({
    purpose: nonEmptyStringSchema,
    learningOutcomes: z.array(z.string()).default([]),
    units: z.array(
      z.object({
        unitNumber: z.number().int().min(1),
        title: nonEmptyStringSchema,
        topics: z.array(z.string()).default([])
      })
    ).default([]),
    evaluation: z.array(
      z.object({
        component: nonEmptyStringSchema,
        weight: z.number().int().min(0).max(100),
        description: z.string().optional()
      })
    ).default([]),
    recommendedBackground: z.array(z.string()).default([])
  })
});

export const syllabusExplanationRequestSchema = z.object({
  studentProfileId: nonEmptyStringSchema.optional(),
  targetAudience: audienceModeSchema.default("student"),
  tone: explanationStyleSchema.default("clear_youthful"),
  outputFormat: z.enum(["structured_json"]).default("structured_json"),
  includeDifficultySignals: z.boolean().default(true),
  context: z.record(z.string(), z.unknown()).optional()
});

export const difficultySignalsSchema = z.object({
  practiceIntensity: intensity0To10Schema,
  readingIntensity: intensity0To10Schema,
  abstractReasoning: intensity0To10Schema,
  frustrationTolerance: intensity0To10Schema
});

export const syllabusExplanationResponseSchema = z.object({
  explanationId: nonEmptyStringSchema,
  syllabusId: nonEmptyStringSchema,
  courseName: nonEmptyStringSchema,
  targetAudience: audienceModeSchema,
  plainExplanation: nonEmptyStringSchema,
  whyItMatters: nonEmptyStringSchema,
  difficultySignals: difficultySignalsSchema,
  skillsYouBuild: z.array(z.string()),
  exampleActivities: z.array(z.string()).default([]),
  fitComment: z.string().optional(),
  recommendedPreparation: z.array(z.string()).default([]),
  modelMetadata: modelMetadataSchema,
  createdAt: nonEmptyStringSchema
});

export type SyllabusQueryDto = z.infer<typeof syllabusQuerySchema>;
export type SyllabusSummaryDto = z.infer<typeof syllabusSummarySchema>;
export type SyllabusDetailDto = z.infer<typeof syllabusDetailSchema>;
export type SyllabusExplanationRequestDto = z.infer<typeof syllabusExplanationRequestSchema>;
export type SyllabusExplanationResponseDto = z.infer<typeof syllabusExplanationResponseSchema>;
