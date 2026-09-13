import nodemailer, { type Transporter } from "nodemailer";
import dns from "node:dns";
import path from "path";
import fs from "fs";
import { Resend } from "resend";
import { env } from "../config/env.js";
import { buildOwnerNotificationEmail, buildVisitorAutoReplyEmail } from "./emailTemplates.js";

// Ensure IPv4 is prioritized in this module to prevent ENETUNREACH on cloud containers
try {
  dns.setDefaultResultOrder("ipv4first");
} catch {
  // Ignore
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

async function getSmtpTransporter(): Promise<Transporter | null> {
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS?.replace(/\s+/g, "");
  if (!user || !pass || pass.length === 0) {
    return null;
  }

  const hostname = env.SMTP_HOST || "smtp.gmail.com";

  // Explicitly resolve IPv4 to prevent Nodemailer from connecting via IPv6 on Render (ENETUNREACH)
  let hostTarget = hostname;
  try {
    const ipv4s = await dns.promises.resolve4(hostname);
    if (ipv4s && ipv4s.length > 0) {
      hostTarget = ipv4s[0];
      console.log(`[contact] Successfully resolved ${hostname} to IPv4: ${hostTarget}`);
    }
  } catch (err) {
    console.warn(`[contact] IPv4 resolution for ${hostname} skipped, using hostname:`, err);
  }

  return nodemailer.createTransport({
    host: hostTarget,
    port: 465,
    secure: true,
    tls: {
      servername: hostname, // Required when connecting by IP address for TLS verification
    },
    connectionTimeout: 12000,
    greetingTimeout: 12000,
    socketTimeout: 15000,
    auth: {
      user,
      pass,
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

  const transporter = await getSmtpTransporter();

  if (transporter) {
    console.log("[contact] Sending emails via SMTP...");

    try {
      const [ownerResult, visitorResult] = await Promise.allSettled([
        transporter.sendMail({
          from: env.SMTP_FROM,
          to: env.CONTACT_TO_EMAIL,
          replyTo: submission.email,
          subject: ownerEmail.subject,
          html: ownerEmail.html,
        }),
        transporter.sendMail({
          from: env.SMTP_FROM,
          to: submission.email,
          replyTo: env.CONTACT_TO_EMAIL,
          subject: visitorEmail.subject,
          html: visitorEmail.html,
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
