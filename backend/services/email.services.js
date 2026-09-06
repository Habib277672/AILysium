import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Kept as its own file so auth logic never talks to Resend's API directly
// — if the email provider changes later, only this file needs to change.
export const sendVerificationEmail = async ({ to, fullName, token }) => {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to,
        subject: "Verify your AiLysium account",
        html: `
      <p>Hi ${fullName},</p>
      <p>Thanks for signing up for AiLysium. Please verify your email address to activate your account:</p>
      <p><a href="${verifyUrl}">Verify my email</a></p>
      <p>This link expires in 1 hour. If you didn't create this account, you can ignore this email.</p>
    `,
    });
};