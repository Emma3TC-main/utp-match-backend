import { z } from "zod";
import {
  audienceModeSchema,
  explanationStyleSchema,
  intensity0To10Schema,
  modelMetadataSchema
} from "../../../shared/schemas/common.schema";

export const syllabusIdParamsSchema = z.object({
  syllabusId: z.string()
});

export const syllabusDetailSchema = z.object({
  syllabusId: z.string(),
  courseId: z.string(),
  courseName: z.string().optional(),
  versionLabel: z.string(),
  pdfUrl: z.string().nullable().optional(),
  parsed: z.record(z.string(), z.unknown())
});

export const syllabusExplanationRequestSchema = z.object({
  studentProfileId: z.string(),
  targetAudience: audienceModeSchema,
  tone: explanationStyleSchema,
  outputFormat: z.enum(["structured_json"]),
  includeDifficultySignals: z.boolean()
});

export const difficultySignalsSchema = z.object({
  practiceIntensity: intensity0To10Schema,
  readingIntensity: intensity0To10Schema,
  abstractReasoning: intensity0To10Schema,
  frustrationTolerance: intensity0To10Schema
});

export const syllabusExplanationResponseSchema = z.object({
  syllabusId: z.string(),
  courseName: z.string(),
  plainExplanation: z.string(),
  whyItMatters: z.string(),
  difficultySignals: difficultySignalsSchema,
  skillsYouBuild: z.array(z.string()),
  exampleActivities: z.array(z.string()).default([]),
  fitComment: z.string().optional(),
  recommendedPreparation: z.array(z.string()).default([]),
  modelMetadata: modelMetadataSchema
});

export type SyllabusDetailDto = z.infer<typeof syllabusDetailSchema>;
export type SyllabusExplanationRequestDto = z.infer<typeof syllabusExplanationRequestSchema>;
export type SyllabusExplanationResponseDto = z.infer<typeof syllabusExplanationResponseSchema>;
