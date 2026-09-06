import { z } from "zod";

export const registerSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, { message: "Full name must be at least 2 characters long" })
        .max(80, { message: "Full name must be at most 80 characters long" }),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email({ message: "Invalid email address" })
        .max(120, { message: "Email must be at most 120 characters long" }),

    // Requires international format, e.g. +923001234567
    phoneNumber: z
        .string()
        .trim()
        .regex(/^\+[1-9]\d{7,14}$/, {
            message: "Phone number must be in international format, e.g. +923001234567",
        }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(72, { message: "Password must be at most 72 characters long" }),
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email({ message: "Invalid email address" })
        .max(120, { message: "Email must be at most 120 characters long" }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(72, { message: "Password must be at most 72 characters long" }),
});