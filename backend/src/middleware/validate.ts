import type { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";

export const chatBodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      })
    )
    .min(1)
    .max(20),
});

export const contactBodySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("A valid email is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(3000),
  // Honeypot field — real users never fill this in. Bots often do.
  company: z.string().max(0).optional().or(z.literal("")),
});

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const firstIssue = result.error.issues[0];
      res.status(400).json({ error: firstIssue?.message || "Invalid request body." });
      return;
    }
    req.body = result.data;
    next();
  };
}
