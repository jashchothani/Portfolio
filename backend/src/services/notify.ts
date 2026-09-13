import nodemailer from "nodemailer";
import dns from "node:dns";
import { env } from "../config/env.js";
import { buildOwnerNotificationEmail, buildVisitorAutoReplyEmail } from "./emailTemplates.js";

// Ensure IPv4 is prioritized in this process to prevent IPv6 ENETUNREACH errors on cloud hosts
try {
  dns.setDefaultResultOrder("ipv4first");
} catch {
  // Ignore in older runtimes
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

interface SmtpAttempt {
  name: string;
  host: string;
  port: number;
  secure: boolean;
  servername?: string;
}

/**
 * Handles contact form submissions strictly via SMTP (Gmail with App Password).
 * Tries modern submission Port 587 (STARTTLS) first, falling back to Port 465 (SSL).
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

  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS?.replace(/\s+/g, "");
  if (!user || !pass || pass.length === 0) {
    console.error("[contact] SMTP credentials (SMTP_USER / SMTP_PASS) are missing.");
    return { emailSent: false };
  }

  const ownerEmail = buildOwnerNotificationEmail(submission);
  const visitorEmail = buildVisitorAutoReplyEmail(submission);
  const hostname = env.SMTP_HOST || "smtp.gmail.com";

  // Resolve IPv4 address in advance so we have an alternative route if hostname lookup has issues
  let resolvedIpv4 = "";
  try {
    const addresses = await dns.promises.resolve4(hostname);
    if (addresses && addresses.length > 0) {
      resolvedIpv4 = addresses[0];
    }
  } catch (err) {
    console.warn(`[contact] DNS resolve4 for ${hostname} skipped:`, err);
  }

  // Ordered SMTP delivery attempts
  const attempts: SmtpAttempt[] = [
    // 1. Port 587 STARTTLS (Standard submission port, widely permitted on cloud providers)
    {
      name: "smtp.gmail.com:587 (STARTTLS)",
      host: hostname,
      port: 587,
      secure: false,
    },
    // 2. Port 465 SSL (Direct SMTPS)
    {
      name: "smtp.gmail.com:465 (SSL)",
      host: hostname,
      port: 465,
      secure: true,
    },
  ];

  // 3. Direct IPv4 IP address fallback if resolved
  if (resolvedIpv4) {
    attempts.push(
      {
        name: `${resolvedIpv4}:587 (Direct IPv4 STARTTLS)`,
        host: resolvedIpv4,
        port: 587,
        secure: false,
        servername: hostname,
      },
      {
        name: `${resolvedIpv4}:465 (Direct IPv4 SSL)`,
        host: resolvedIpv4,
        port: 465,
        secure: true,
        servername: hostname,
      }
    );
  }

  for (const attempt of attempts) {
    console.log(`[contact] Trying SMTP delivery via ${attempt.name}...`);
    try {
      const transporter = nodemailer.createTransport({
        host: attempt.host,
        port: attempt.port,
        secure: attempt.secure,
        family: 4, // Strict IPv4 in net.connect — prevents IPv6 ENETUNREACH
        connectionTimeout: 20000,
        greetingTimeout: 20000,
        socketTimeout: 30000,
        auth: {
          user,
          pass,
        },
        tls: {
          servername: attempt.servername || hostname,
          rejectUnauthorized: false,
        },
      } as any);

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
        console.log(`[contact] Successfully sent owner notification via ${attempt.name} to ${env.CONTACT_TO_EMAIL}`);
      } else {
        console.error(`[contact] Owner email rejected on ${attempt.name}:`, ownerResult.reason);
      }

      if (visitorResult.status === "fulfilled") {
        console.log(`[contact] Successfully sent auto-reply confirmation via ${attempt.name} to ${submission.email}`);
      } else {
        console.error(`[contact] Visitor email rejected on ${attempt.name}:`, visitorResult.reason);
      }

      const anySent = ownerResult.status === "fulfilled" || visitorResult.status === "fulfilled";
      if (anySent) {
        return { emailSent: true };
      }
    } catch (err) {
      console.error(`[contact] Attempt failed on ${attempt.name}:`, err);
    }
  }

  console.error("[contact] All SMTP attempts were unsuccessful.");
  return { emailSent: false };
}
