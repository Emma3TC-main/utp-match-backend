import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateRequest } from "../../shared/validation/validate-request";
import { EventsController } from "./events.controller";
import {
  eventIdParamsSchema,
  eventLogCreateSchema,
  eventLogQuerySchema
} from "./dto/event.dto";

export const eventsRoutes = Router();
const controller = new EventsController();

eventsRoutes.post(
  "/",
  validateRequest({
    body: eventLogCreateSchema
  }),
  asyncHandler(controller.createEvent)
);

eventsRoutes.get(
  "/",
  validateRequest({
    query: eventLogQuerySchema
  }),
  asyncHandler(controller.listEvents)
);

eventsRoutes.get(
  "/:eventId",
  validateRequest({
    params: eventIdParamsSchema
  }),
  asyncHandler(controller.getEventById)
);

export default eventsRoutes;
