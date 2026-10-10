import { Resend } from "resend";
import {
  passwordResetEmailTemplate,
  verificationEmailTemplate,
} from "./emailtemplates.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async ({ to, fullName, token }) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const { html, text } = verificationEmailTemplate({ fullName, verifyUrl });

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to,
    subject: "Verify your AiLysium account",
    html,
    text,
  });
};

export const sendPasswordResetEmail = async ({ to, fullName, token }) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const { html, text } = passwordResetEmailTemplate({ fullName, resetUrl });

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to,
    subject: "Reset your AiLysium password",
    html,
    text,
  });
};