import { z } from "zod";

export const contactMessageSchema = z.object({
    name: z.string().trim().min(2, { message: "Please enter your name." }).max(100),
    email: z.email({ message: "Please enter a valid email address." }).trim().toLowerCase(),
    phone: z.string().trim().min(6, { message: "Please enter a valid phone number." }).max(30),
    program: z.string().trim().min(1, { message: "Please select a program." }),
    age: z
        .number({ message: "Please enter the student's age." })
        .int()
        .positive({ message: "Age must be a positive number." }),
    message: z.string().trim().min(1, { message: "Please enter a message." }).max(2000),
});