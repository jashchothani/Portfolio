import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { Resend } from "resend";
import { env } from "../config/env.js";
import { buildOwnerNotificationEmail, buildVisitorAutoReplyEmail } from "./emailTemplates.js";

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

function createSmtpTransporter() {
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS?.replace(/\s+/g, "");
  if (!user || !pass || pass.length === 0) {
    return null;
  }

  if (env.SMTP_SERVICE) {
    return nodemailer.createTransport({
      service: env.SMTP_SERVICE,
      auth: {
        user,
        pass,
      },
    });
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST || "smtp.gmail.com",
    port: env.SMTP_PORT || 587,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
}

/**
 * Handles a validated contact form submission:
 *   1. Emails the site owner (${env.CONTACT_TO_EMAIL}) with the visitor's message.
 *   2. Emails the visitor a branded confirmation auto-reply from Jash.
 *
 * Primary delivery is via SMTP (e.g., Gmail with an App Password or any custom SMTP server).
 * If SMTP credentials are not set, falls back to Resend if RESEND_API_KEY is present.
 */
export async function notifyNewContactSubmission(
  submission: ContactSubmission
): Promise<{ emailSent: boolean }> {
  console.log("[contact] New submission received", {
    name: submission.name,
    email: submission.email,
    receivedAt: submission.receivedAt,
    messagePreview: submission.message.slice(0, 140),
  });

  const ownerEmail = buildOwnerNotificationEmail(submission);
  const visitorEmail = buildVisitorAutoReplyEmail(submission);

  const transporter = createSmtpTransporter();

  if (transporter) {
    console.log("[contact] Sending emails via SMTP...");

    // Find avatar asset for inline email rendering
    const avatarCandidates = [
      path.resolve(process.cwd(), "dist/assets/jash-headshot.png"),
      path.resolve(process.cwd(), "src/assets/jash-headshot.png"),
      path.resolve(process.cwd(), "backend/dist/assets/jash-headshot.png"),
      path.resolve(process.cwd(), "backend/src/assets/jash-headshot.png"),
      path.resolve(process.cwd(), "../frontend/src/assets/jash-headshot.png"),
      path.resolve(process.cwd(), "frontend/src/assets/jash-headshot.png"),
    ];
    const avatarPath = avatarCandidates.find((p) => fs.existsSync(p));
    const attachments = avatarPath
      ? [
          {
            filename: "jash-portrait.png",
            path: avatarPath,
            cid: "jashAvatar",
          },
        ]
      : [];

    try {
      const [ownerResult, visitorResult] = await Promise.allSettled([
        transporter.sendMail({
          from: env.SMTP_FROM,
          to: env.CONTACT_TO_EMAIL,
          replyTo: submission.email,
          subject: ownerEmail.subject,
          html: ownerEmail.html,
          attachments,
        }),
        transporter.sendMail({
          from: env.SMTP_FROM,
          to: submission.email,
          replyTo: env.CONTACT_TO_EMAIL,
          subject: visitorEmail.subject,
          html: visitorEmail.html,
          attachments,
        }),
      ]);

      if (ownerResult.status === "fulfilled") {
        console.log("[contact] Successfully sent owner notification via SMTP to", env.CONTACT_TO_EMAIL);
      } else {
        console.error("[contact] Failed to send owner notification via SMTP:", ownerResult.reason);
      }

      if (visitorResult.status === "fulfilled") {
        console.log("[contact] Successfully sent auto-reply confirmation via SMTP to", submission.email);
      } else {
        console.error("[contact] Failed to send auto-reply confirmation via SMTP:", visitorResult.reason);
      }

      const anySent = ownerResult.status === "fulfilled" || visitorResult.status === "fulfilled";
      return { emailSent: anySent };
    } catch (err) {
      console.error("[contact] Error sending emails via SMTP:", err);
      return { emailSent: false };
    }
  }

  // Fallback to Resend if RESEND_API_KEY is configured
  if (env.RESEND_API_KEY) {
    console.log("[contact] Sending emails via Resend...");
    const resend = new Resend(env.RESEND_API_KEY);
    try {
      const results = await Promise.allSettled([
        resend.emails.send({
          from: env.CONTACT_FROM_EMAIL,
          to: env.CONTACT_TO_EMAIL,
          replyTo: submission.email,
          subject: ownerEmail.subject,
          html: ownerEmail.html,
        }),
        resend.emails.send({
          from: env.CONTACT_FROM_EMAIL,
          to: submission.email,
          replyTo: env.CONTACT_TO_EMAIL,
          subject: visitorEmail.subject,
          html: visitorEmail.html,
        }),
      ]);

      results.forEach((result, i) => {
        const label = i === 0 ? "owner notification" : "visitor auto-reply";
        if (result.status === "rejected") {
          console.error(`[contact] Failed to send ${label} email via Resend:`, result.reason);
        } else {
          console.log(`[contact] Successfully sent ${label} via Resend.`);
        }
      });

      const anySent = results.some((r) => r.status === "fulfilled");
      return { emailSent: anySent };
    } catch (err) {
      console.error("[contact] Unexpected error sending email via Resend:", err);
      return { emailSent: false };
    }
  }

  console.warn(
    "[contact] Neither SMTP (SMTP_USER & SMTP_PASS) nor RESEND_API_KEY is configured in .env. " +
      "The message above was logged, but no email was dispatched. " +
      "To enable live SMTP delivery and auto-replies to senders, set SMTP_USER and SMTP_PASS in backend/.env."
  );
  return { emailSent: false };
}
