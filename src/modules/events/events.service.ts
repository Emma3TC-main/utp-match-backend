import { randomUUID } from "crypto";
import {
  EventLogCreateDto,
  EventLogQueryDto,
  EventLogRecordDto
} from "./dto/event.dto";

const eventStore = new Map<string, EventLogRecordDto>();

export class EventsService {
  public async createEvent(input: EventLogCreateDto): Promise<EventLogRecordDto> {
    const now = new Date().toISOString();

    const event: EventLogRecordDto = {
      id: randomUUID(),
      eventName: input.eventName,
      studentProfileId: input.studentProfileId,
      sessionId: input.sessionId,
      anonymousId: input.anonymousId,
      source: input.source,
      occurredAt: input.occurredAt || now,
      receivedAt: now,
      eventProps: input.eventProps,
      requestId: input.requestId
    };

    eventStore.set(event.id, event);

    return event;
  }

  public async listEvents(query: EventLogQueryDto): Promise<EventLogRecordDto[]> {
    return [...eventStore.values()]
      .filter((event) => {
        if (query.studentProfileId && event.studentProfileId !== query.studentProfileId) {
          return false;
        }

        if (query.sessionId && event.sessionId !== query.sessionId) {
          return false;
        }

        if (query.eventName && event.eventName !== query.eventName) {
          return false;
        }

        if (query.source && event.source !== query.source) {
          return false;
        }

        return true;
      })
      .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))
      .slice(0, query.limit);
  }

  public async getEventById(eventId: string): Promise<EventLogRecordDto | null> {
    return eventStore.get(eventId) || null;
  }
}
