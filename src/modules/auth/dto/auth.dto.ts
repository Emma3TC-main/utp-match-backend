import { z } from "zod";

export const guestSessionCreateSchema = z.object({
  displayName: z.string().trim().min(1).max(80).optional()
});

export const authUserSchema = z.object({
  id: z.string(),
  role: z.enum(["guest", "student", "guardian", "advisor", "admin", "system"]),
  status: z.enum(["active", "inactive", "blocked", "deleted"]).default("active"),
  email: z.string().email().nullable().optional()
});

export const authSessionSchema = z.object({
  accessToken: z.string(),
  expiresIn: z.number().int().positive().optional(),
  user: authUserSchema
});

export type GuestSessionCreateDto = z.infer<typeof guestSessionCreateSchema>;
export type AuthUserDto = z.infer<typeof authUserSchema>;
export type AuthSessionDto = z.infer<typeof authSessionSchema>;
