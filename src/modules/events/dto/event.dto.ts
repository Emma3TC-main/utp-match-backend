import { z } from "zod";
import { nonEmptyStringSchema } from "../../../shared/schemas/common.schema";

export const eventIdParamsSchema = z.object({
  eventId: nonEmptyStringSchema
});

export const eventSourceSchema = z.enum([
  "web",
  "mobile",
  "backend",
  "thunder-client",
  "local-test",
  "system"
]);

export const eventLogCreateSchema = z.object({
  eventName: nonEmptyStringSchema,
  studentProfileId: z.string().trim().optional(),
  sessionId: z.string().trim().optional(),
  anonymousId: z.string().trim().optional(),
  source: eventSourceSchema.default("backend"),
  occurredAt: z.string().trim().optional(),
  eventProps: z.record(z.string(), z.unknown()).default({}),
  requestId: z.string().trim().optional()
});

export const eventLogQuerySchema = z.object({
  studentProfileId: z.string().trim().optional(),
  sessionId: z.string().trim().optional(),
  eventName: z.string().trim().optional(),
  source: eventSourceSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50)
});

export const eventLogRecordSchema = eventLogCreateSchema.extend({
  id: nonEmptyStringSchema,
  occurredAt: nonEmptyStringSchema,
  receivedAt: nonEmptyStringSchema
});

export type EventSourceDto = z.infer<typeof eventSourceSchema>;
export type EventLogCreateDto = z.infer<typeof eventLogCreateSchema>;
export type EventLogQueryDto = z.infer<typeof eventLogQuerySchema>;
export type EventLogRecordDto = z.infer<typeof eventLogRecordSchema>;
