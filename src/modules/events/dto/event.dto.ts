import { z } from "zod";

export const eventLogCreateSchema = z.object({
  eventName: z.string().trim().min(1),
  eventProps: z.record(z.string(), z.unknown()).default({}),
  requestId: z.string().optional()
});

export type EventLogCreateDto = z.infer<typeof eventLogCreateSchema>;
