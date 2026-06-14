import { randomBytes, randomUUID } from "crypto";
import {
  AuthMeResponseDto,
  AuthSessionDto,
  AuthUserDto,
  GuestSessionCreateDto
} from "./dto/auth.dto";

const sessionStore = new Map<string, AuthSessionDto>();

const DEFAULT_EXPIRES_IN_SECONDS = 60 * 60 * 24;

function createAccessToken(): string {
  return `guest_${randomBytes(32).toString("hex")}`;
}

function buildGuestUser(input: GuestSessionCreateDto): AuthUserDto {
  const userId = randomUUID();

  return {
    id: userId,
    role: "guest",
    status: "active",
    email: null,
    displayName: input.displayName || "Estudiante invitado",
    studentProfileId: `profile-${userId}`
  };
}

export class AuthService {
  public async createGuestSession(
    input: GuestSessionCreateDto
  ): Promise<AuthSessionDto> {
    const accessToken = createAccessToken();
    const now = Date.now();
    const expiresAt = new Date(
      now + DEFAULT_EXPIRES_IN_SECONDS * 1000
    ).toISOString();

    const session: AuthSessionDto = {
      accessToken,
      tokenType: "Bearer",
      expiresIn: DEFAULT_EXPIRES_IN_SECONDS,
      expiresAt,
      user: buildGuestUser(input)
    };

    sessionStore.set(accessToken, session);

    return session;
  }

  public async getSessionByToken(
    accessToken: string | null
  ): Promise<AuthMeResponseDto> {
    if (!accessToken) {
      return {
        authenticated: false,
        user: null
      };
    }

    const session = sessionStore.get(accessToken);

    if (!session) {
      return {
        authenticated: false,
        user: null
      };
    }

    const isExpired = new Date(session.expiresAt).getTime() < Date.now();

    if (isExpired) {
      sessionStore.delete(accessToken);

      return {
        authenticated: false,
        user: null
      };
    }

    return {
      authenticated: true,
      user: session.user
    };
  }

  public async logout(accessToken: string | null): Promise<boolean> {
    if (!accessToken) {
      return false;
    }

    return sessionStore.delete(accessToken);
  }
}
