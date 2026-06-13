import { Response } from "express";

export function ok<T>(res: Response, data: T, meta: Record<string, unknown> = {}) {
  return res.status(200).json({
    success: true,
    data,
    meta
  });
}

export function fail(
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  details: unknown[] = []
) {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details
    }
  });
}
