import { z } from "zod";
import { nonEmptyStringSchema } from "../../../shared/schemas/common.schema";

export const guestSessionCreateSchema = z.object({
  displayName: z.string().trim().min(1).max(80).optional(),
  source: z.enum([
    "web",
    "mobile",
    "thunder-client",
    "local-test",
    "system"
  ]).default("web"),
  metadata: z.record(z.string(), z.unknown()).default({})
});

export const authUserRoleSchema = z.enum([
  "guest",
  "student",
  "guardian",
  "advisor",
  "admin",
  "system"
]);

export const authUserStatusSchema = z.enum([
  "active",
  "inactive",
  "blocked",
  "deleted"
]);

export const authUserSchema = z.object({
  id: nonEmptyStringSchema,
  role: authUserRoleSchema,
  status: authUserStatusSchema.default("active"),
  email: z.string().email().nullable().optional(),
  displayName: z.string().nullable().optional(),
  studentProfileId: z.string().nullable().optional()
});

export const authSessionSchema = z.object({
  accessToken: nonEmptyStringSchema,
  tokenType: z.literal("Bearer").default("Bearer"),
  expiresIn: z.number().int().positive(),
  expiresAt: nonEmptyStringSchema,
  user: authUserSchema
});

export const authMeResponseSchema = z.object({
  authenticated: z.boolean(),
  user: authUserSchema.nullable()
});

export const logoutRequestSchema = z.object({
  accessToken: z.string().trim().optional()
});

export type GuestSessionCreateDto = z.infer<typeof guestSessionCreateSchema>;
export type AuthUserRoleDto = z.infer<typeof authUserRoleSchema>;
export type AuthUserStatusDto = z.infer<typeof authUserStatusSchema>;
export type AuthUserDto = z.infer<typeof authUserSchema>;
export type AuthSessionDto = z.infer<typeof authSessionSchema>;
export type AuthMeResponseDto = z.infer<typeof authMeResponseSchema>;
export type LogoutRequestDto = z.infer<typeof logoutRequestSchema>;
