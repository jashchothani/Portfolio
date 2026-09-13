import { profile } from "../data/profile.js";

interface SubmissionInput {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

const BRAND = {
  blue: "#2563EB",
  sky: "#0EA5E9",
  indigo: "#4F46E5",
  violet: "#7C3AED",
  ink: "#0F172A",
  inkMuted: "#334155",
  muted: "#64748B",
  faint: "#94A3B8",
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getPortfolioWebsiteUrl(): string {
  const envUrl = (process.env.FRONTEND_URL || "").trim();
  const urls = envUrl.split(",").map((u) => u.trim());
  const publicUrl = urls.find(
    (u) =>
      (u.startsWith("http://") || u.startsWith("https://")) &&
      !u.includes("localhost") &&
      !u.includes("127.0.0.1")
  );

  if (publicUrl) {
    return publicUrl.replace(/\/+$/, "");
  }
  // Default to live production portfolio URL
  return "https://jashchothani.vercel.app";
}

function layout(bodyHtml: string, previewText: string): string {
  const siteUrl = getPortfolioWebsiteUrl();

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${profile.name}</title>
    <!--[if mso]>
    <style type="text/css">
      body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
    </style>
    <![endif]-->
    <style>
      @media only screen and (max-width: 620px) {
        .outer-cell { padding: 20px 10px !important; }
        .card-inner { padding: 24px 18px !important; }
        .header-cell { padding: 22px 18px !important; }
        .footer-cell { padding: 18px 18px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#EBF3FA;background:linear-gradient(145deg, #E0F2FE 0%, #EDE9FE 38%, #E0E7FF 68%, #CCFBF1 100%);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <!-- Preheader preview text -->
    <div style="display:none;font-size:1px;color:#EBF3FA;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
      ${previewText}
    </div>

    <!-- Outer Aurora Mesh Background Table -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EBF3FA;background:linear-gradient(145deg, #E0F2FE 0%, #EDE9FE 38%, #E0E7FF 68%, #CCFBF1 100%);padding:44px 14px;">
      <tr>
        <td align="center" class="outer-cell">
          <!-- Main Apple visionOS Optical Frosted Glass Card -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:590px;background-color:rgba(255, 255, 255, 0.82);background:linear-gradient(140deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.68) 100%);backdrop-filter:blur(32px) saturate(190%);-webkit-backdrop-filter:blur(32px) saturate(190%);border-radius:30px;overflow:hidden;border:1.5px solid rgba(255, 255, 255, 0.95);box-shadow:inset 0 2px 3px 0 rgba(255, 255, 255, 1), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.02), 0 24px 60px -12px rgba(15, 23, 42, 0.14), 0 0 28px rgba(56, 189, 248, 0.14);">
            
            <!-- Sleek Ambient Neon Top Beam -->
            <tr>
              <td style="height:4px;background:linear-gradient(90deg, #38BDF8 0%, #818CF8 50%, #2DD4BF 100%);"></td>
            </tr>

            <!-- Header Branding (Available for Work removed as requested) -->
            <tr>
              <td class="header-cell" style="padding:28px 36px 22px;border-bottom:1px solid rgba(255, 255, 255, 0.85);background:linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.45) 100%);">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <!-- Avatar with Specular Ring -->
                    <td width="50" style="vertical-align:middle;">
                      <div style="width:48px;height:48px;border-radius:50%;overflow:hidden;background:linear-gradient(135deg, #2563EB, #7C3AED);text-align:center;line-height:48px;color:#ffffff;font-weight:700;font-size:16px;border:2.5px solid #FFFFFF;box-shadow:0 4px 18px rgba(56, 189, 248, 0.40);">
                        <img src="${siteUrl}/jash-headshot.png" width="48" height="48" alt="Jash" style="display:block;width:48px;height:48px;object-fit:cover;border-radius:50%;" onerror="this.style.display='none'" />
                      </div>
                    </td>
                    <!-- Identity & Role -->
                    <td style="padding-left:14px;vertical-align:middle;">
                      <div style="font-size:16px;font-weight:800;color:${BRAND.ink};letter-spacing:-0.02em;line-height:1.2;">
                        ${profile.name}
                      </div>
                      <div style="font-size:12px;color:${BRAND.muted};margin-top:3px;font-weight:600;">
                        Cybersecurity Analyst &amp; Full-Stack AI Engineer
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Main Body Content (Translucent frosted body) -->
            <tr>
              <td class="card-inner" style="padding:34px 36px 30px;background:transparent;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- Quick Action Links Bar (Frosted Navigation Footer) -->
            <tr>
              <td style="padding:18px 36px;background:linear-gradient(135deg, rgba(248, 250, 252, 0.85) 0%, rgba(241, 245, 249, 0.65) 100%);border-top:1px solid rgba(255, 255, 255, 0.85);">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:12px;color:${BRAND.muted};font-weight:500;">
                      Quick links:
                      <a href="${profile.contact.linkedin}" style="color:${BRAND.blue};font-weight:700;text-decoration:none;margin-left:8px;">LinkedIn &#8599;</a>
                      <a href="${profile.contact.github}" style="color:${BRAND.blue};font-weight:700;text-decoration:none;margin-left:12px;">GitHub &#8599;</a>
                    </td>
                    <td align="right">
                      <a href="${siteUrl}" style="font-size:12px;color:${BRAND.indigo};font-weight:700;text-decoration:none;">
                        Visit Portfolio &#8599;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer Meta -->
            <tr>
              <td class="footer-cell" style="padding:22px 36px;background:linear-gradient(180deg, rgba(241, 245, 249, 0.7) 0%, rgba(226, 232, 240, 0.5) 100%);border-top:1px solid rgba(255, 255, 255, 0.75);">
                <p style="margin:0 0 6px;font-size:12px;color:${BRAND.muted};line-height:1.6;">
                  This message was sent automatically from the contact system at
                  <a href="${siteUrl}" style="color:${BRAND.blue};font-weight:600;text-decoration:none;">${profile.name}'s portfolio</a>.
                </p>
                <p style="margin:0;font-size:11px;color:${BRAND.faint};line-height:1.5;">
                  &copy; ${new Date().getFullYear()} ${profile.name} &middot; Mumbai, India &middot; <a href="mailto:${profile.email}" style="color:${BRAND.muted};text-decoration:none;font-weight:600;">${profile.email}</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Confirms to the visitor that their message was received. */
export function buildVisitorAutoReplyEmail(submission: SubmissionInput): { subject: string; html: string } {
  const firstName = submission.name.trim().split(/\s+/)[0] || submission.name;
  const siteUrl = getPortfolioWebsiteUrl();

  const dateStr = new Date(submission.receivedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const body = `
    <!-- Top Optical Glass Pill -->
    <div style="margin-bottom:20px;">
      <span style="display:inline-block;padding:7px 16px;border-radius:999px;background:linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(124, 58, 237, 0.08) 100%);border:1px solid rgba(37, 99, 235, 0.28);box-shadow:inset 0 1px 1.5px rgba(255, 255, 255, 0.95), 0 3px 10px rgba(37, 99, 235, 0.08);color:${BRAND.blue};font-size:12px;font-weight:800;letter-spacing:0.02em;">
        &#10003; Confirmation &middot; Message Received
      </span>
    </div>

    <!-- Main Headline -->
    <h1 style="margin:0 0 14px;font-size:27px;font-weight:800;color:${BRAND.ink};letter-spacing:-0.025em;line-height:1.22;">
      Thanks for reaching out, ${escapeHtml(firstName)}! &#128075;
    </h1>

    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:${BRAND.inkMuted};">
      I have received your message and will review it shortly. I read every inquiry myself and typically respond within <strong>24 hours</strong>.
    </p>

    <!-- Apple visionOS Frosted Message Preview Sub-Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.60) 100%);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1.5px solid rgba(255, 255, 255, 0.95);border-left:4px solid #3B82F6;border-radius:20px;margin:24px 0 28px;box-shadow:inset 0 1.5px 2px rgba(255, 255, 255, 1), 0 10px 28px -6px rgba(15, 23, 42, 0.06), 0 0 16px rgba(59, 130, 246, 0.08);">
      <tr>
        <td style="padding:22px 26px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
            <tr>
              <td style="font-size:11px;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:${BRAND.blue};">
                Your Message Preview
              </td>
              <td align="right" style="font-size:11px;color:${BRAND.faint};font-weight:700;">
                ${dateStr}
              </td>
            </tr>
          </table>
          <p style="margin:0;font-size:15px;line-height:1.8;color:${BRAND.ink};white-space:pre-wrap;font-style:italic;">
            &ldquo;${escapeHtml(submission.message)}&rdquo;
          </p>
          <div style="margin-top:16px;font-size:12px;color:${BRAND.muted};border-top:1px dashed rgba(226, 232, 240, 0.9);padding-top:12px;">
            Confirmation dispatched to: <strong style="color:${BRAND.ink};font-weight:700;">${escapeHtml(submission.email)}</strong>
          </div>
        </td>
      </tr>
    </table>

    <!-- Signature Apple-Grade Dark Glass Button -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 12px;">
      <tr>
        <td style="border-radius:16px;background:linear-gradient(135deg, #0B1220 0%, #1E293B 100%);border:1px solid rgba(255, 255, 255, 0.25);box-shadow:inset 0 1.5px 2px rgba(255, 255, 255, 0.35), 0 12px 30px -4px rgba(11, 18, 32, 0.40), 0 0 24px rgba(56, 189, 248, 0.22);">
          <a href="${siteUrl}"
             style="display:inline-block;padding:15px 32px;font-size:13.5px;font-weight:800;color:#ffffff;text-decoration:none;letter-spacing:0.01em;border-radius:16px;">
            Explore Portfolio &amp; Projects <span style="color:#60A5FA;margin-left:6px;">&rarr;</span>
          </a>
        </td>
      </tr>
    </table>

    <!-- Personal Signoff -->
    <div style="margin-top:32px;padding-top:22px;border-top:1px solid rgba(255, 255, 255, 0.85);">
      <p style="margin:0 0 4px;font-size:13.5px;color:${BRAND.muted};">
        Best regards,
      </p>
      <p style="margin:0;font-size:16px;font-weight:800;color:${BRAND.ink};letter-spacing:-0.01em;">
        ${profile.name}
      </p>
      <p style="margin:4px 0 0;font-size:12px;color:${BRAND.muted};">
        ${profile.location} &middot; <a href="mailto:${profile.email}" style="color:${BRAND.blue};text-decoration:none;font-weight:700;">${profile.email}</a>
      </p>
    </div>
  `;

  return {
    subject: `Message received: Thanks for reaching out, ${firstName}!`,
    html: layout(body, `Hi ${firstName}, thanks for contacting Jash Chothani. Your message has been received!`),
  };
}

/** Notifies Jash that a new message came in through the portfolio. */
export function buildOwnerNotificationEmail(submission: SubmissionInput): { subject: string; html: string } {
  const dateStr = new Date(submission.receivedAt).toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const replyMailto = `mailto:${encodeURIComponent(submission.email)}?subject=${encodeURIComponent(
    `Re: Your message to ${profile.shortName}`
  )}&body=${encodeURIComponent(
    `Hi ${submission.name},\n\nThank you for reaching out through my portfolio!\n\n> ${submission.message}\n\n`
  )}`;

  const body = `
    <!-- Top Amber Glass Pill -->
    <div style="margin-bottom:20px;">
      <span style="display:inline-block;padding:7px 16px;border-radius:999px;background:linear-gradient(135deg, rgba(245, 158, 11, 0.14) 0%, rgba(217, 119, 6, 0.08) 100%);border:1px solid rgba(245, 158, 11, 0.32);box-shadow:inset 0 1px 1.5px rgba(255, 255, 255, 0.95), 0 3px 10px rgba(245, 158, 11, 0.08);color:#B45309;font-size:12px;font-weight:800;letter-spacing:0.03em;">
        &#9889; New Contact Inquiry
      </span>
    </div>

    <!-- Main Headline -->
    <h1 style="margin:0 0 18px;font-size:27px;font-weight:800;color:${BRAND.ink};letter-spacing:-0.025em;line-height:1.22;">
      New Message from ${escapeHtml(submission.name)}
    </h1>

    <!-- Apple visionOS Sender Detail Glass Sub-Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.60) 100%);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1.5px solid rgba(255, 255, 255, 0.95);border-radius:22px;margin:22px 0 26px;box-shadow:inset 0 1.5px 2px rgba(255, 255, 255, 1), 0 10px 28px -6px rgba(15, 23, 42, 0.06);">
      <tr>
        <td style="padding:24px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="28%" style="padding-bottom:12px;font-size:11px;color:${BRAND.muted};font-weight:800;text-transform:uppercase;letter-spacing:0.07em;">
                Sender
              </td>
              <td style="padding-bottom:12px;font-size:15px;color:${BRAND.ink};font-weight:800;letter-spacing:-0.01em;">
                ${escapeHtml(submission.name)}
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:12px;font-size:11px;color:${BRAND.muted};font-weight:800;text-transform:uppercase;letter-spacing:0.07em;">
                Email
              </td>
              <td style="padding-bottom:12px;font-size:15px;color:${BRAND.blue};font-weight:700;">
                <a href="mailto:${escapeHtml(submission.email)}" style="color:${BRAND.blue};text-decoration:none;">
                  ${escapeHtml(submission.email)}
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-size:11px;color:${BRAND.muted};font-weight:800;text-transform:uppercase;letter-spacing:0.07em;">
                Received
              </td>
              <td style="font-size:13px;color:${BRAND.inkMuted};font-weight:600;">
                ${dateStr}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Apple visionOS Message Content Glass Bubble -->
    <div style="margin:26px 0;">
      <div style="font-size:11px;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:10px;">
        Message Body
      </div>
      <div style="background:linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(248, 250, 252, 0.65) 100%);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1.5px solid rgba(255, 255, 255, 0.95);border-left:4px solid #2563EB;border-radius:20px;padding:24px 26px;font-size:15px;line-height:1.8;color:#1E293B;white-space:pre-wrap;box-shadow:inset 0 1.5px 2px rgba(255, 255, 255, 1), 0 10px 28px -6px rgba(15, 23, 42, 0.06), 0 0 16px rgba(37, 99, 235, 0.08);">
${escapeHtml(submission.message)}
      </div>
    </div>

    <!-- Signature Apple-Grade Dark Glass Button -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:30px 0 12px;">
      <tr>
        <td style="border-radius:16px;background:linear-gradient(135deg, #0B1220 0%, #1E293B 100%);border:1px solid rgba(255, 255, 255, 0.25);box-shadow:inset 0 1.5px 2px rgba(255, 255, 255, 0.35), 0 12px 30px -4px rgba(11, 18, 32, 0.40), 0 0 24px rgba(56, 189, 248, 0.22);">
          <a href="${replyMailto}"
             style="display:inline-block;padding:15px 32px;font-size:14px;font-weight:800;color:#ffffff;text-decoration:none;letter-spacing:0.01em;border-radius:16px;">
            Reply to ${escapeHtml(submission.name)} <span style="color:#60A5FA;margin-left:6px;">&rarr;</span>
          </a>
        </td>
      </tr>
    </table>
  `;

  return {
    subject: `⚡ New portfolio message from ${submission.name}`,
    html: layout(body, `New message received from ${submission.name} (${submission.email}).`),
  };
}
