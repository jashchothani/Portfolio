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

  // 1. Prioritize Resend over HTTPS (port 443) — Render blocks outbound SMTP ports 465/587
  if (env.RESEND_API_KEY) {
    console.log("[contact] Sending emails via Resend HTTPS API...");
    const resend = new Resend(env.RESEND_API_KEY);

    // Resend requires verified domain or 'onboarding@resend.dev' for sandbox
    const fromAddress = env.CONTACT_FROM_EMAIL.includes("@gmail.com")
      ? "Jash Chothani <onboarding@resend.dev>"
      : env.CONTACT_FROM_EMAIL;

    try {
      const results = await Promise.allSettled([
        resend.emails.send({
          from: fromAddress,
          to: env.CONTACT_TO_EMAIL,
          replyTo: submission.email,
          subject: ownerEmail.subject,
          html: ownerEmail.html,
        }),
        resend.emails.send({
          from: fromAddress,
          to: submission.email,
          replyTo: env.CONTACT_TO_EMAIL,
          subject: visitorEmail.subject,
          html: visitorEmail.html,
        }),
      ]);

      const ownerResult = results[0];
      const visitorResult = results[1];

      if (ownerResult.status === "fulfilled" && !("error" in ownerResult.value && ownerResult.value.error)) {
        console.log("[contact] Successfully sent owner notification via Resend to", env.CONTACT_TO_EMAIL);
      } else {
        const err = ownerResult.status === "fulfilled" ? ownerResult.value.error : ownerResult.reason;
        console.error("[contact] Failed to send owner notification via Resend:", err);
      }

      if (visitorResult.status === "fulfilled" && !("error" in visitorResult.value && visitorResult.value.error)) {
        console.log("[contact] Successfully sent auto-reply confirmation via Resend to", submission.email);
      } else {
        const err = visitorResult.status === "fulfilled" ? visitorResult.value.error : visitorResult.reason;
        console.error("[contact] Failed to send auto-reply confirmation via Resend:", err);
      }

      const anySent =
        (ownerResult.status === "fulfilled" && !("error" in ownerResult.value && ownerResult.value.error)) ||
        (visitorResult.status === "fulfilled" && !("error" in visitorResult.value && visitorResult.value.error));

      if (anySent) {
        return { emailSent: true };
      }
      console.warn("[contact] Resend did not deliver, attempting SMTP fallback...");
    } catch (err) {
      console.error("[contact] Unexpected error sending email via Resend:", err);
    }
  }

  // 2. Fallback to SMTP (Direct IPv4 on port 465)
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

  console.warn(
    "[contact] Neither RESEND_API_KEY nor working SMTP is available. " +
      "Render free tier blocks raw SMTP connections (ports 465/587). " +
      "To send emails reliably on Render, set RESEND_API_KEY in Render Dashboard."
  );
  return { emailSent: false };
}
