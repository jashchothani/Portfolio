import type { Request, Response, NextFunction } from "express";
import { notifyNewContactSubmission } from "../services/notify.js";

export async function postContact(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, message } = req.body as {
      name: string;
      email: string;
      message: string;
    };

    const { emailSent } = await notifyNewContactSubmission({
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      emailSent,
      message: emailSent
        ? "Message received — check your inbox for a confirmation."
        : "Message received.",
    });
  } catch (err) {
    next(err);
  }
}
