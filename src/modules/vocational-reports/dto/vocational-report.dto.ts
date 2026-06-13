import { z } from "zod";
import {
  nonEmptyStringSchema,
  score0To100Schema
} from "../../../shared/schemas/common.schema";

export const reportIdParamsSchema = z.object({
  reportId: nonEmptyStringSchema
});

export const vocationalReportSourceTypeSchema = z.enum([
  "manual",
  "utp_json",
  "advisor_entry",
  "mock_demo"
]);

export const careerSignalSchema = z.object({
  careerId: z.string().nullable().optional(),
  name: nonEmptyStringSchema,
  score: score0To100Schema,
  reason: z.string().optional(),
  confidence: score0To100Schema.optional(),
  tags: z.array(z.string()).default([])
});

export const vocationalReportCreateSchema = z.object({
  studentProfileId: nonEmptyStringSchema,
  sourceType: vocationalReportSourceTypeSchema,
  reportDate: z.string().optional(),
  topCareers: z.array(careerSignalSchema).default([]),
  scores: z.record(z.string(), score0To100Schema),
  interests: z.array(z.string()).default([]),
  strengths: z.array(z.string()).default([]),
  concerns: z.array(z.string()).default([]),
  context: z.record(z.string(), z.unknown()).default({})
});

export const vocationalReportQuerySchema = z.object({
  studentProfileId: z.string().trim().optional(),
  sourceType: vocationalReportSourceTypeSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50)
});

export const careerRecommendationSchema = z.object({
  careerId: z.string().nullable(),
  name: nonEmptyStringSchema,
  score: score0To100Schema,
  reason: nonEmptyStringSchema,
  priority: z.number().int().min(1),
  nextAction: nonEmptyStringSchema
});

export const vocationalReportSchema = vocationalReportCreateSchema.extend({
  id: nonEmptyStringSchema,
  rawFileUrl: z.string().nullable().optional(),
  createdAt: nonEmptyStringSchema,
  updatedAt: nonEmptyStringSchema
});

export const vocationalReportRecommendationsSchema = z.object({
  reportId: nonEmptyStringSchema,
  studentProfileId: nonEmptyStringSchema,
  recommendations: z.array(careerRecommendationSchema),
  summary: nonEmptyStringSchema,
  generatedAt: nonEmptyStringSchema
});

export type VocationalReportSourceTypeDto = z.infer<typeof vocationalReportSourceTypeSchema>;
export type CareerSignalDto = z.infer<typeof careerSignalSchema>;
export type VocationalReportCreateDto = z.infer<typeof vocationalReportCreateSchema>;
export type VocationalReportQueryDto = z.infer<typeof vocationalReportQuerySchema>;
export type CareerRecommendationDto = z.infer<typeof careerRecommendationSchema>;
export type VocationalReportDto = z.infer<typeof vocationalReportSchema>;
export type VocationalReportRecommendationsDto = z.infer<typeof vocationalReportRecommendationsSchema>;
