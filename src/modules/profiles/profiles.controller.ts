import { Request, Response } from "express";
import { ok, fail } from "../../shared/responses/api-response";
import {
  StudentProfileCreateDto,
  StudentProfilePatchDto,
  StudentProfileQueryDto
} from "./dto/profile.dto";
import { ProfilesService } from "./profiles.service";

function getParamAsString(value: string | string[] | undefined): string | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value;
}

function getProfileIdFromHeader(req: Request): string | null {
  const value = req.headers["x-student-profile-id"];

  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value;
}

export class ProfilesController {
  constructor(private readonly profilesService = new ProfilesService()) {}

  public createProfile = async (req: Request, res: Response) => {
    const input = req.body as StudentProfileCreateDto;
    const profile = await this.profilesService.createProfile(input);

    return ok(res, {
      profile
    });
  };

  public listProfiles = async (req: Request, res: Response) => {
    const query = req.query as unknown as StudentProfileQueryDto;
    const items = await this.profilesService.listProfiles(query);

    return ok(res, {
      items,
      total: items.length
    });
  };

  public getCurrentProfile = async (req: Request, res: Response) => {
    const profileId = getProfileIdFromHeader(req);
    const profile = await this.profilesService.getCurrentProfile(profileId);

    return ok(res, {
      profile
    });
  };

  public updateCurrentProfile = async (req: Request, res: Response) => {
    const profileId = getProfileIdFromHeader(req) || "profile-demo-001";
    const input = req.body as StudentProfilePatchDto;
    const profile = await this.profilesService.updateProfile(profileId, input);

    if (!profile) {
      return fail(
        res,
        404,
        "PROFILE_NOT_FOUND",
        "No se encontró el perfil solicitado.",
        [{ profileId }]
      );
    }

    return ok(res, {
      profile
    });
  };

  public getProfileById = async (req: Request, res: Response) => {
    const profileId = getParamAsString(req.params.profileId);

    if (!profileId) {
      return fail(
        res,
        400,
        "PROFILE_ID_REQUIRED",
        "El id del perfil es obligatorio."
      );
    }

    const profile = await this.profilesService.getProfileById(profileId);

    if (!profile) {
      return fail(
        res,
        404,
        "PROFILE_NOT_FOUND",
        "No se encontró el perfil solicitado.",
        [{ profileId }]
      );
    }

    return ok(res, {
      profile
    });
  };

  public updateProfile = async (req: Request, res: Response) => {
    const profileId = getParamAsString(req.params.profileId);

    if (!profileId) {
      return fail(
        res,
        400,
        "PROFILE_ID_REQUIRED",
        "El id del perfil es obligatorio."
      );
    }

    const input = req.body as StudentProfilePatchDto;
    const profile = await this.profilesService.updateProfile(profileId, input);

    if (!profile) {
      return fail(
        res,
        404,
        "PROFILE_NOT_FOUND",
        "No se encontró el perfil solicitado.",
        [{ profileId }]
      );
    }

    return ok(res, {
      profile
    });
  };
}
