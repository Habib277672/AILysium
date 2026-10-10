// Email-safe templates: table layout, inline styles, small <style> block for dark mode.
// Works in Gmail, Outlook, Apple Mail and mobile clients — in light and dark mode.

// ─── Logo ──────────────────────────────────────────────────────────────
// Your logo is transparent, so on a dark background it can disappear.
// Two Cloudinary variants of the same file are used:
//  • LOGO_URL      – logo on a solid white rounded tile (opaque, so it is
//                    visible on ANY background, incl. Gmail dark mode which
//                    ignores CSS media queries). This is the default.
//  • LOGO_DARK_URL – pure white logo, transparent background. Swapped in
//                    for clients that support dark mode CSS (Apple Mail,
//                    iOS Mail, Outlook, ...) so it looks native on the dark card.
// PNG is used instead of WebP because Outlook desktop can't render WebP.
// If you later upload dedicated logo files, just replace these two URLs.
const CLOUD_BASE = "https://res.cloudinary.com/qxfu3egn/image/upload";
const LOGO_PATH = "v1791611910/logo.png";
const LOGO_URL = `${CLOUD_BASE}/b_white/bo_14px_solid_white/r_12/${LOGO_PATH}`;
const LOGO_DARK_URL = `${CLOUD_BASE}/e_colorize:100,co_white/${LOGO_PATH}`;

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

const firstNameRaw = (fullName) =>
  (fullName ?? "").trim().split(" ")[0] || "there";

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

// Dark-mode palette (light-mode colors stay inline, these only override).
const DARK = {
  page: "#0b1220",
  card: "#111c2e",
  border: "#22324a",
  ink: "#f1f5f9",
  body: "#cbd5e1",
  link: "#4db3ff",
};

const darkCss = `
    :root { color-scheme: light dark; supported-color-schemes: light dark; }

    /* Apple Mail, iOS Mail, Outlook (modern), Thunderbird, etc. */
    @media (prefers-color-scheme: dark) {
      .bg-page { background-color: ${DARK.page} !important; }
      .bg-card { background-color: ${DARK.card} !important; border-color: ${DARK.border} !important; }
      .bd-top  { border-top-color: ${DARK.border} !important; }
      .t-ink   { color: ${DARK.ink} !important; }
      .t-body  { color: ${DARK.body} !important; }
      .t-link  { color: ${DARK.link} !important; }
      .logo-light { display: none !important; }
      .logo-dark  { display: block !important; max-height: none !important; }
    }

    /* Outlook.com / Outlook mobile dark mode */
    [data-ogsb] .bg-page { background-color: ${DARK.page} !important; }
    [data-ogsb] .bg-card { background-color: ${DARK.card} !important; border-color: ${DARK.border} !important; }
    [data-ogsc] .t-ink   { color: ${DARK.ink} !important; }
    [data-ogsc] .t-body  { color: ${DARK.body} !important; }
    [data-ogsc] .t-link  { color: ${DARK.link} !important; }
    [data-ogsc] .logo-light { display: none !important; }
    [data-ogsc] .logo-dark  { display: block !important; max-height: none !important; }
`;

const layout = ({ preheader, title, bodyHtml }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>${title}</title>
  <style>${darkCss}</style>
</head>
<body class="bg-page" style="margin:0;padding:0;background-color:${BRAND.cloud};">
  <!-- Preheader (inbox preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${preheader}
  </div>

  <table class="bg-page" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.cloud}">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table class="bg-card" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff"
          style="max-width:560px;background:#ffffff;border:1px solid ${BRAND.border};border-radius:20px;overflow:hidden;">
          <!-- Brand bar -->
          <tr><td style="height:4px;background:${BRAND.sky};font-size:0;line-height:0;">&nbsp;</td></tr>

          <!-- Logo (light/default + dark-mode swap) -->
          <tr>
            <td align="center" style="padding:32px 32px 8px;">
              <img class="logo-light" src="${LOGO_URL}" alt="AiLysium" height="52"
                style="display:block;margin:0 auto;height:52px;width:auto;border:0;outline:none;" />
              <!--[if !mso]><!-->
              <img class="logo-dark" src="${LOGO_DARK_URL}" alt="AiLysium" height="40"
                style="display:none;max-height:0;overflow:hidden;margin:0 auto;height:40px;width:auto;border:0;outline:none;" />
              <!--<![endif]-->
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="t-body" style="padding:16px 40px 36px;font-family:Arial,Helvetica,sans-serif;color:${BRAND.slate};font-size:15px;line-height:1.65;">
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
    <a class="t-link" href="${url}" style="color:${BRAND.sky};text-decoration:underline;">${url}</a>
  </p>`;

// ─── Verification email ────────────────────────────────────────────────
export const verificationEmailTemplate = ({
  fullName,
  verifyUrl,
  expiresIn = "1 hour",
}) => {
  const name = escapeHtml(firstNameRaw(fullName));

  const html = layout({
    title: "Verify your AiLysium account",
    preheader: "Confirm your email to activate your AiLysium account.",
    bodyHtml: `
      <h1 class="t-ink" style="margin:8px 0 16px;font-size:24px;line-height:1.3;color:${BRAND.ink};text-align:center;">
        Verify your email
      </h1>
      <p style="margin:0 0 12px;">Hi ${name},</p>
      <p style="margin:0;">
        Welcome to AiLysium! Please confirm your email address to activate your account and get started.
      </p>
      <div align="center">${button(verifyUrl, "Verify my email")}</div>
      <p style="margin:0 0 24px;font-size:13px;color:${BRAND.muted};text-align:center;">
        This link expires in <strong>${expiresIn}</strong>.
      </p>
      <div class="bd-top" style="border-top:1px solid ${BRAND.border};padding-top:20px;">
        ${linkFallback(verifyUrl)}
        <p style="margin:16px 0 0;font-size:13px;color:${BRAND.muted};">
          If you didn't create an AiLysium account, you can safely ignore this email.
        </p>
      </div>`,
  });

  const text = `Hi ${firstNameRaw(fullName)},

Welcome to AiLysium! Confirm your email to activate your account:
${verifyUrl}

This link expires in ${expiresIn}.
If you didn't create an account, you can safely ignore this email.`;

  return { html, text };
};

// ─── Password reset email ──────────────────────────────────────────────
export const passwordResetEmailTemplate = ({
  fullName,
  resetUrl,
  expiresIn = "30 minutes",
}) => {
  const name = escapeHtml(firstNameRaw(fullName));

  const html = layout({
    title: "Reset your AiLysium password",
    preheader: `Use this link to choose a new AiLysium password. It expires in ${expiresIn}.`,
    bodyHtml: `
      <h1 class="t-ink" style="margin:8px 0 16px;font-size:24px;line-height:1.3;color:${BRAND.ink};text-align:center;">
        Reset your password
      </h1>
      <p style="margin:0 0 12px;">Hi ${name},</p>
      <p style="margin:0;">
        We received a request to reset your AiLysium password. Click the button below to choose a new one.
      </p>
      <div align="center">${button(resetUrl, "Reset my password")}</div>
      <p style="margin:0 0 24px;font-size:13px;color:${BRAND.muted};text-align:center;">
        This link expires in <strong>${expiresIn}</strong>.
      </p>
      <div class="bd-top" style="border-top:1px solid ${BRAND.border};padding-top:20px;">
        ${linkFallback(resetUrl)}
        <p style="margin:16px 0 0;font-size:13px;color:${BRAND.muted};">
          If you didn't request this, you can safely ignore this email, your password won't be changed.
        </p>
      </div>`,
  });

  const text = `Hi ${firstNameRaw(fullName)},

We received a request to reset your AiLysium password. Choose a new one here:
${resetUrl}

This link expires in ${expiresIn}.
If you didn't request this, you can safely ignore this email — your password won't be changed.`;

  return { html, text };
};