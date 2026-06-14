import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler";
import { validateRequest } from "../../shared/validation/validate-request";
import { ProfilesController } from "./profiles.controller";
import {
  profileIdParamsSchema,
  studentProfileCreateSchema,
  studentProfilePatchSchema,
  studentProfileQuerySchema
} from "./dto/profile.dto";

export const profilesRoutes = Router();
const controller = new ProfilesController();

profilesRoutes.post(
  "/",
  validateRequest({
    body: studentProfileCreateSchema
  }),
  asyncHandler(controller.createProfile)
);

profilesRoutes.get(
  "/",
  validateRequest({
    query: studentProfileQuerySchema
  }),
  asyncHandler(controller.listProfiles)
);

profilesRoutes.get(
  "/me",
  asyncHandler(controller.getCurrentProfile)
);

profilesRoutes.patch(
  "/me",
  validateRequest({
    body: studentProfilePatchSchema
  }),
  asyncHandler(controller.updateCurrentProfile)
);

profilesRoutes.get(
  "/:profileId",
  validateRequest({
    params: profileIdParamsSchema
  }),
  asyncHandler(controller.getProfileById)
);

profilesRoutes.patch(
  "/:profileId",
  validateRequest({
    params: profileIdParamsSchema,
    body: studentProfilePatchSchema
  }),
  asyncHandler(controller.updateProfile)
);

export default profilesRoutes;
