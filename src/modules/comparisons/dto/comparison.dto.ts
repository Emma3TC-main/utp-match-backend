import { z } from "zod";
import {
  audienceModeSchema,
  explanationStyleSchema,
  modelMetadataSchema,
  score0To100Schema
} from "../../../shared/schemas/common.schema";

export const comparisonIdParamsSchema = z.object({
  comparisonId: z.string()
});

export const careerComparisonRequestSchema = z.object({
  studentProfileId: z.string().optional(),
  leftCareerId: z.string(),
  rightCareerId: z.string(),
  vocationalReportId: z.string().nullable().optional(),
  audienceMode: audienceModeSchema.default("student"),
  explanationStyle: explanationStyleSchema.default("clear_youthful"),
  includeSyllabusSignals: z.boolean().default(true),
  context: z.record(z.string(), z.unknown()).optional()
});

export const dimensionScoresSchema = z.object({
  math: score0To100Schema,
  coding: score0To100Schema,
  management: score0To100Schema,
  communication: score0To100Schema,
  practice: score0To100Schema
});

export const careerHighlightSchema = z.object({
  careerId: z.string(),
  title: z.string(),
  body: z.string()
});

export const careerComparisonResponseSchema = z.object({
  comparisonId: z.string(),
  summary: z.string(),
  dimensions: z.object({
    left: dimensionScoresSchema,
    right: dimensionScoresSchema
  }),
  careerHighlights: z.array(careerHighlightSchema).default([]),
  fitNarrative: z.string(),
  risksOrWarnings: z.array(z.string()).default([]),
  recommendedQuestions: z.array(z.string()).default([]),
  nextBestActions: z.array(z.string()).default([]),
  modelMetadata: modelMetadataSchema.optional(),
  createdAt: z.string()
});

export type CareerComparisonRequestDto = z.infer<typeof careerComparisonRequestSchema>;
export type DimensionScoresDto = z.infer<typeof dimensionScoresSchema>;
export type CareerComparisonResponseDto = z.infer<typeof careerComparisonResponseSchema>;
