import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string().trim().min(2).max(80),
    email: z.email({ message: "Invalid email address" }).trim().toLowerCase().max(120),
    phoneNumber: z.string().trim().regex(/^\+[1-9]\d{7,14}$/, {
        message: "Phone number must be in international format, e.g. +923001234567",
    }),
    password: z.string().min(8).max(72),
});

export const loginSchema = z.object({
    email: z.email({ message: "Invalid email address" }).trim().toLowerCase().max(120),
    password: z.string().min(8).max(72),
});

export const forgotPasswordSchema = z.object({
    email: z.email({ message: "Invalid email address" }).trim().toLowerCase().max(120),
});

export const resetPasswordSchema = z.object({
    token: z.string().min(10, { message: "Invalid reset token" }),
    password: z.string().min(8).max(72),
});