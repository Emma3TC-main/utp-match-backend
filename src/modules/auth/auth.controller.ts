import { Request, Response } from "express";
import { ok, fail } from "../../shared/responses/api-response";
import {
  GuestSessionCreateDto,
  LogoutRequestDto
} from "./dto/auth.dto";
import { AuthService } from "./auth.service";

function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;

  if (!header) {
    return null;
  }

  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}

  public status = async (_req: Request, res: Response) => {
    return ok(res, {
      module: "auth",
      status: "ready",
      mode: "mock-local",
      supportedFlows: [
        "guest-session",
        "me",
        "logout"
      ]
    });
  };

  public createGuestSession = async (req: Request, res: Response) => {
    const input = req.body as GuestSessionCreateDto;
    const session = await this.authService.createGuestSession(input);

    return ok(res, {
      session
    });
  };

  public me = async (req: Request, res: Response) => {
    const token = getBearerToken(req);
    const result = await this.authService.getSessionByToken(token);

    if (!result.authenticated) {
      return fail(
        res,
        401,
        "AUTH_REQUIRED",
        "No hay una sesión válida o el token expiró."
      );
    }

    return ok(res, result);
  };

  public logout = async (req: Request, res: Response) => {
    const body = req.body as LogoutRequestDto;
    const token = body.accessToken || getBearerToken(req);
    const revoked = await this.authService.logout(token);

    return ok(res, {
      revoked
    });
  };
}
