import { RequestHandler } from "express";
import { ZodError, ZodSchema } from "zod";
import { fail } from "../responses/api-response";

type RequestSchemas = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
    code: issue.code
  }));
}

export function validateRequest(schemas: RequestSchemas): RequestHandler {
  return (req, res, next) => {
    if (schemas.params) {
      const parsed = schemas.params.safeParse(req.params);

      if (!parsed.success) {
        return fail(
          res,
          400,
          "PARAMS_VALIDATION_ERROR",
          "Los parámetros de la ruta no son válidos.",
          formatZodError(parsed.error)
        );
      }

      Object.assign(req.params, parsed.data);
    }

    if (schemas.query) {
      const parsed = schemas.query.safeParse(req.query);

      if (!parsed.success) {
        return fail(
          res,
          400,
          "QUERY_VALIDATION_ERROR",
          "Los query params no son válidos.",
          formatZodError(parsed.error)
        );
      }

      Object.assign(req.query, parsed.data);
    }

    if (schemas.body) {
      const parsed = schemas.body.safeParse(req.body);

      if (!parsed.success) {
        return fail(
          res,
          400,
          "BODY_VALIDATION_ERROR",
          "El body enviado no es válido.",
          formatZodError(parsed.error)
        );
      }

      req.body = parsed.data;
    }

    return next();
  };
}
