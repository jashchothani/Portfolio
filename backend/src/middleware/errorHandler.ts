import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const status = err instanceof ApiError ? err.status : 500;
  const message = err instanceof Error ? err.message : "Unexpected server error";

  if (status >= 500) {
    // Log server-side only — never leak internals to the client.
    console.error("[error]", err);
  }

  res.status(status).json({
    error: status >= 500 ? "Something went wrong on our end. Please try again shortly." : message,
    ...(env.isProduction ? {} : { detail: message }),
  });
}
