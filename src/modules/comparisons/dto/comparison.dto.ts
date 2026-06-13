import { z } from "zod";
import {
  audienceModeSchema,
  explanationStyleSchema,
  modelMetadataSchema,
  nonEmptyStringSchema,
  score0To100Schema
} from "../../../shared/schemas/common.schema";

export const comparisonIdParamsSchema = z.object({
  comparisonId: nonEmptyStringSchema
});

export const careerComparisonRequestSchema = z.object({
  studentProfileId: nonEmptyStringSchema.optional(),
  leftCareerId: nonEmptyStringSchema,
  rightCareerId: nonEmptyStringSchema,
  vocationalReportId: nonEmptyStringSchema.nullable().optional(),
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
  careerId: nonEmptyStringSchema,
  title: nonEmptyStringSchema,
  body: nonEmptyStringSchema
});

export const careerComparisonResponseSchema = z.object({
  comparisonId: nonEmptyStringSchema,
  summary: nonEmptyStringSchema,
  dimensions: z.object({
    left: dimensionScoresSchema,
    right: dimensionScoresSchema
  }),
  careerHighlights: z.array(careerHighlightSchema).default([]),
  fitNarrative: nonEmptyStringSchema,
  risksOrWarnings: z.array(z.string()).default([]),
  recommendedQuestions: z.array(z.string()).default([]),
  nextBestActions: z.array(z.string()).default([]),
  modelMetadata: modelMetadataSchema.optional(),
  createdAt: nonEmptyStringSchema
});

export type CareerComparisonRequestDto = z.infer<typeof careerComparisonRequestSchema>;
export type DimensionScoresDto = z.infer<typeof dimensionScoresSchema>;
export type CareerComparisonResponseDto = z.infer<typeof careerComparisonResponseSchema>;
