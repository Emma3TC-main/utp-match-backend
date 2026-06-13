import { z } from "zod";
import { score0To100Schema } from "../../../shared/schemas/common.schema";

export const careerSignalSchema = z.object({
  careerId: z.string().nullable().optional(),
  name: z.string(),
  score: score0To100Schema,
  reason: z.string().optional()
});

export const vocationalReportCreateSchema = z.object({
  studentProfileId: z.string(),
  sourceType: z.enum(["manual", "utp_json", "advisor_entry", "mock_demo"]),
  reportDate: z.string().optional(),
  topCareers: z.array(careerSignalSchema).default([]),
  scores: z.record(z.string(), score0To100Schema)
});

export const vocationalReportSchema = vocationalReportCreateSchema.extend({
  id: z.string(),
  rawFileUrl: z.string().nullable().optional(),
  createdAt: z.string()
});

export type CareerSignalDto = z.infer<typeof careerSignalSchema>;
export type VocationalReportCreateDto = z.infer<typeof vocationalReportCreateSchema>;
export type VocationalReportDto = z.infer<typeof vocationalReportSchema>;
