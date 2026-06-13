import { z } from "zod";

export const SyllabusExplanationSchema = z.object({
  syllabusId: z.string().uuid(),
  courseName: z.string(),
  plainExplanation: z.string(),
  whyItMatters: z.string(),
  difficultySignals: z.object({
    practiceIntensity: z.number().min(1).max(10),
    readingIntensity: z.number().min(1).max(10),
    abstractReasoning: z.number().min(1).max(10),
    frustrationTolerance: z.number().min(1).max(10),
  }),
  skillsYouBuild: z.array(z.string()),
  fitComment: z.string(),
});
