import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async ({ to, fullName, token }) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to,
    subject: "Verify your AiLysium account",
    html: `<p>Hi ${fullName},</p><p>Verify your email:</p><p><a href="${verifyUrl}">Verify my email</a></p><p>Expires in 1 hour.</p>`,
  });
};

export const sendPasswordResetEmail = async ({ to, fullName, token }) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to,
    subject: "Reset your AiLysium password",
    html: `
      <p>Hi ${fullName},</p>
      <p>We received a request to reset your AiLysium password. Click below to choose a new one:</p>
      <p><a href="${resetUrl}">Reset my password</a></p>
      <p>This link expires in 30 minutes. If you didn't request this, you can safely ignore this email — your password won't be changed.</p>
    `,
  });
};