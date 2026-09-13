import { Resend } from "resend";
import { env } from "../config/env.js";
import { buildOwnerNotificationEmail, buildVisitorAutoReplyEmail } from "./emailTemplates.js";

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

/**
 * Handles contact form submissions strictly via the Resend HTTPS API (port 443).
 * Bypasses all SMTP connection issues, timeouts, and cloud firewall restrictions.
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

  const apiKey = env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is missing. Please configure RESEND_API_KEY.");
    return { emailSent: false };
  }

  const resend = new Resend(apiKey);
  const ownerEmail = buildOwnerNotificationEmail(submission);
  const visitorEmail = buildVisitorAutoReplyEmail(submission);

  const fromAddress = env.CONTACT_FROM_EMAIL.includes("@gmail.com")
    ? "Jash Chothani <onboarding@resend.dev>"
    : env.CONTACT_FROM_EMAIL;

  console.log("[contact] Sending emails via Resend HTTPS API (port 443)...");

  try {
    const results = await Promise.allSettled([
      // 1. Send inquiry notification directly to Jash's inbox
      resend.emails.send({
        from: fromAddress,
        to: env.CONTACT_TO_EMAIL,
        replyTo: submission.email,
        subject: ownerEmail.subject,
        html: ownerEmail.html,
      }),
      // 2. Send branded auto-reply to visitor
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

    let ownerDelivered = false;

    if (ownerResult.status === "fulfilled" && !("error" in ownerResult.value && ownerResult.value.error)) {
      console.log(`[contact] Successfully delivered owner notification via Resend to ${env.CONTACT_TO_EMAIL}!`);
      ownerDelivered = true;
    } else {
      const err = ownerResult.status === "fulfilled" ? ownerResult.value.error : ownerResult.reason;
      console.error("[contact] Failed to deliver owner notification via Resend:", err);
    }

    if (visitorResult.status === "fulfilled" && !("error" in visitorResult.value && visitorResult.value.error)) {
      console.log(`[contact] Successfully delivered visitor auto-reply via Resend to ${submission.email}!`);
    } else {
      const err = visitorResult.status === "fulfilled" ? visitorResult.value.error : visitorResult.reason;
      console.warn("[contact] Visitor auto-reply status:", err?.message || err);
    }

    return { emailSent: ownerDelivered };
  } catch (err) {
    console.error("[contact] Unexpected error dispatching via Resend:", err);
    return { emailSent: false };
  }
}
