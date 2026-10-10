// Email-safe templates: table layout, inline styles, no external CSS.
// Works in Gmail, Outlook, Apple Mail and mobile clients.

const LOGO_URL =
    "https://res.cloudinary.com/qxfu3egn/image/upload/v1791611910/logo.webp";

const BRAND = {
    sky: "#0085fe",
    ink: "#0f172a",
    slate: "#475569",
    muted: "#94a3b8",
    cloud: "#f1f7fd",
    border: "#e2e8f0",
};

const escapeHtml = (value = "") =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const firstNameOf = (fullName) =>
    escapeHtml((fullName ?? "").trim().split(" ")[0] || "there");

const button = (href, label) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
    <tr>
      <td align="center" bgcolor="${BRAND.sky}" style="border-radius:999px;">
        <a href="${href}" target="_blank"
          style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">
          ${label}
        </a>
      </td>
    </tr>
  </table>`;

const layout = ({ preheader, title, bodyHtml }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.cloud};">
  <!-- Preheader (inbox preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.cloud}">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:560px;background:#ffffff;border:1px solid ${BRAND.border};border-radius:20px;overflow:hidden;">
          <!-- Brand bar -->
          <tr><td style="height:4px;background:${BRAND.sky};font-size:0;line-height:0;">&nbsp;</td></tr>

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:32px 32px 8px;">
              <img src="${LOGO_URL}" alt="AiLysium" height="40"
                style="display:block;height:40px;width:auto;border:0;outline:none;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:16px 40px 36px;font-family:Arial,Helvetica,sans-serif;color:${BRAND.slate};font-size:15px;line-height:1.65;">
              ${bodyHtml}
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
          <tr>
            <td align="center" style="padding:20px 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${BRAND.muted};">
              This is an automated message from AiLysium. Please don't reply to this email.<br />
              &copy; ${new Date().getFullYear()} AiLysium. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const linkFallback = (url) => `
  <p style="margin:0 0 4px;font-size:13px;color:${BRAND.muted};">
    Button not working? Copy and paste this link into your browser:
  </p>
  <p style="margin:0;font-size:13px;word-break:break-all;">
    <a href="${url}" style="color:${BRAND.sky};text-decoration:underline;">${url}</a>
  </p>`;

// ─── Verification email ────────────────────────────────────────────────
export const verificationEmailTemplate = ({ fullName, verifyUrl }) => {
    const name = firstNameOf(fullName);

    const html = layout({
        title: "Verify your AiLysium account",
        preheader: "Confirm your email to activate your AiLysium account.",
        bodyHtml: `
      <h1 style="margin:8px 0 16px;font-size:24px;line-height:1.3;color:${BRAND.ink};text-align:center;">
        Verify your email
      </h1>
      <p style="margin:0 0 12px;">Hi ${name},</p>
      <p style="margin:0;">
        Welcome to AiLysium! Please confirm your email address to activate your account and get started.
      </p>
      <div align="center">${button(verifyUrl, "Verify my email")}</div>
      <p style="margin:0 0 24px;font-size:13px;color:${BRAND.muted};text-align:center;">
        This link expires in <strong>1 hour</strong>.
      </p>
      <div style="border-top:1px solid ${BRAND.border};padding-top:20px;">
        ${linkFallback(verifyUrl)}
        <p style="margin:16px 0 0;font-size:13px;color:${BRAND.muted};">
          If you didn't create an AiLysium account, you can safely ignore this email.
        </p>
      </div>`,
    });

    const text = `Hi ${(fullName ?? "").trim().split(" ")[0] || "there"},

Welcome to AiLysium! Confirm your email to activate your account:
${verifyUrl}

This link expires in 1 hour.
If you didn't create an account, you can safely ignore this email.`;

    return { html, text };
};

// ─── Password reset email ──────────────────────────────────────────────
export const passwordResetEmailTemplate = ({ fullName, resetUrl }) => {
    const name = firstNameOf(fullName);

    const html = layout({
        title: "Reset your AiLysium password",
        preheader: "Use this link to choose a new AiLysium password. It expires in 30 minutes.",
        bodyHtml: `
      <h1 style="margin:8px 0 16px;font-size:24px;line-height:1.3;color:${BRAND.ink};text-align:center;">
        Reset your password
      </h1>
      <p style="margin:0 0 12px;">Hi ${name},</p>
      <p style="margin:0;">
        We received a request to reset your AiLysium password. Click the button below to choose a new one.
      </p>
      <div align="center">${button(resetUrl, "Reset my password")}</div>
      <p style="margin:0 0 24px;font-size:13px;color:${BRAND.muted};text-align:center;">
        This link expires in <strong>30 minutes</strong>.
      </p>
      <div style="border-top:1px solid ${BRAND.border};padding-top:20px;">
        ${linkFallback(resetUrl)}
        <p style="margin:16px 0 0;font-size:13px;color:${BRAND.muted};">
          If you didn't request this, you can safely ignore this email, your password won't be changed.
        </p>
      </div>`,
    });

    const text = `Hi ${(fullName ?? "").trim().split(" ")[0] || "there"},

We received a request to reset your AiLysium password. Choose a new one here:
${resetUrl}

This link expires in 30 minutes.
If you didn't request this, you can safely ignore this email — your password won't be changed.`;

    return { html, text };
};