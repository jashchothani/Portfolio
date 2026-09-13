import type { Request, Response, NextFunction } from "express";
import { notifyNewContactSubmission } from "../services/notify.js";

export async function postContact(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, message } = req.body as {
      name: string;
      email: string;
      message: string;
    };

    // Respond immediately (<100ms) so visitor never hangs waiting on SMTP handshakes
    res.status(200).json({
      success: true,
      emailSent: true,
      message: "Message received — check your inbox for a confirmation.",
    });

    // Asynchronously dispatch notifications in background
    notifyNewContactSubmission({
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    }).catch((err) => {
      console.error("[contact] Background email delivery error:", err);
    });
  } catch (err) {
    next(err);
  }
}
