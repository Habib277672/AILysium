import { z } from "zod";

export const registerSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, { message: "Please enter your full name." })
        .max(80, { message: "Full name can't be longer than 80 characters." }),

    email: z
        .email({ message: "Please enter a valid email address." })
        .trim()
        .toLowerCase()
        .max(120, { message: "Email can't be longer than 120 characters." }),

    phoneNumber: z
        .string()
        .trim()
        .regex(/^\+[1-9]\d{7,14}$/, {
            message: "Enter a valid phone number with country code, e.g. +923001234567.",
        }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(72, { message: "Password can't be longer than 72 characters." }),
});

export const loginSchema = z.object({
    email: z
        .email({ message: "Please enter a valid email address." })
        .trim()
        .toLowerCase()
        .max(120, { message: "Email can't be longer than 120 characters." }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(72, { message: "Password can't be longer than 72 characters." }),
});

export const forgotPasswordSchema = z.object({
    email: z
        .email({ message: "Please enter a valid email address." })
        .trim()
        .toLowerCase()
        .max(120, { message: "Email can't be longer than 120 characters." }),
});

export const resetPasswordSchema = z.object({
    token: z.string().min(10, { message: "This reset link is invalid or malformed." }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(72, { message: "Password can't be longer than 72 characters." }),
});