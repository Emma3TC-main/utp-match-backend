import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateRequest } from "../../shared/validation/validate-request";
import { AuthController } from "./auth.controller";
import {
  guestSessionCreateSchema,
  logoutRequestSchema
} from "./dto/auth.dto";

export const authRoutes = Router();
const controller = new AuthController();

authRoutes.get(
  "/status",
  asyncHandler(controller.status)
);

authRoutes.post(
  "/guest-session",
  validateRequest({
    body: guestSessionCreateSchema
  }),
  asyncHandler(controller.createGuestSession)
);

authRoutes.get(
  "/me",
  asyncHandler(controller.me)
);

authRoutes.post(
  "/logout",
  validateRequest({
    body: logoutRequestSchema
  }),
  asyncHandler(controller.logout)
);

export default authRoutes;
