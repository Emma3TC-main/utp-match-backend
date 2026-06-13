import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { fail } from "../shared/responses/api-response";

export type AuthUser = {
  sub: string;
  role: string;
  type?: string;
};

export type AuthenticatedRequest = Request & {
  user?: AuthUser;
};

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return fail(
      res,
      401,
      "UNAUTHORIZED",
      "Falta token Bearer en el header Authorization"
    );
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    if (typeof decoded === "string" || !decoded.sub) {
      return fail(
        res,
        401,
        "INVALID_TOKEN",
        "Token inválido"
      );
    }

    req.user = {
      sub: String(decoded.sub),
      role: String(decoded.role || "guest"),
      type: decoded.type ? String(decoded.type) : undefined
    };

    return next();
  } catch {
    return fail(
      res,
      401,
      "INVALID_TOKEN",
      "Token expirado o inválido"
    );
  }
}
