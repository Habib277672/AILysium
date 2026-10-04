import { z } from "zod";

export const createAdminEnrollmentSchema = z.object({
    userId: z.string().min(1, { message: "Please select a user." }),
    courseId: z.string().min(1, { message: "Please select a course." }),
    paymentStatus: z.enum(["PENDING", "CONFIRMED", "FAILED", "FREE"], {
        message: "Please select a payment status.",
    }),
});

export const updateAdminEnrollmentSchema = z.object({
    paymentStatus: z.enum(["PENDING", "CONFIRMED", "FAILED", "FREE"], {
        message: "Please select a payment status.",
    }),
});