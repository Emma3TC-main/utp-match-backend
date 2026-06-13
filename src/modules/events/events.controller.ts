import { Request, Response } from "express";
import { ok, fail } from "../../shared/responses/api-response";
import {
  EventLogCreateDto,
  EventLogQueryDto
} from "./dto/event.dto";
import { EventsService } from "./events.service";

function getParamAsString(value: string | string[] | undefined): string | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value;
}

export class EventsController {
  constructor(private readonly eventsService = new EventsService()) {}

  public createEvent = async (req: Request, res: Response) => {
    const input = req.body as EventLogCreateDto;
    const event = await this.eventsService.createEvent(input);

    return ok(res, {
      event
    });
  };

  public listEvents = async (req: Request, res: Response) => {
    const query = req.query as unknown as EventLogQueryDto;
    const items = await this.eventsService.listEvents(query);

    return ok(res, {
      items,
      total: items.length
    });
  };

  public getEventById = async (req: Request, res: Response) => {
    const eventId = getParamAsString(req.params.eventId);

    if (!eventId) {
      return fail(
        res,
        400,
        "EVENT_ID_REQUIRED",
        "El id del evento es obligatorio."
      );
    }

    const event = await this.eventsService.getEventById(eventId);

    if (!event) {
      return fail(
        res,
        404,
        "EVENT_NOT_FOUND",
        "No se encontró el evento solicitado.",
        [{ eventId }]
      );
    }

    return ok(res, {
      event
    });
  };
}
