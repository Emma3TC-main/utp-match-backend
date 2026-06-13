import { Router } from "express";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { env } from "../../config/env";
import { ok } from "../../shared/responses/api-response";
import { requireAuth, AuthenticatedRequest } from "../../middlewares/auth.middleware";

export const authRoutes = Router();

authRoutes.post("/guest", (req, res) => {
  const guestId = randomUUID();

  const token = jwt.sign(
    {
      sub: guestId,
      role: "guest",
      type: "guest"
    },
    env.jwtSecret,
    {
      expiresIn: "7d"
    }
  );

  return ok(res, {
    accessToken: token,
    tokenType: "Bearer",
    expiresIn: "7d",
    user: {
      id: guestId,
      role: "guest",
      displayName: req.body?.displayName || "Alumno invitado"
    }
  });
});

authRoutes.get("/me", requireAuth, (req: AuthenticatedRequest, res) => {
  return ok(res, {
    user: req.user
  });
});
