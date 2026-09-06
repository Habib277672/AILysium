import argon2 from "argon2";
import { prisma } from "./prisma.js";

// Ensures exactly one admin account exists, sourced from environment
// variables rather than the public register endpoint. Safe to run on
// every server start — it's a no-op once the admin already exists.
export const bootstrapAdmin = async () => {
    const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_FULL_NAME, ADMIN_PHONE_NUMBER } = process.env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        console.warn(
            "ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin bootstrap. " +
            "No admin account will exist until these are set."
        );
        return;
    }

    const existingAdmin = await prisma.user.findUnique({
        where: { email: ADMIN_EMAIL.toLowerCase() },
    });

    if (existingAdmin) {
        // If the account exists but somehow isn't an admin, promote it. This
        // also covers the case where ADMIN_EMAIL was reused for a normal
        // registered account.
        if (existingAdmin.role !== "ADMIN") {
            await prisma.user.update({
                where: { id: existingAdmin.id },
                data: { role: "ADMIN" },
            });
            console.log(`Promoted existing user ${ADMIN_EMAIL} to ADMIN.`);
        }
        return;
    }

    const passwordHash = await argon2.hash(ADMIN_PASSWORD);

    await prisma.user.create({
        data: {
            fullName: ADMIN_FULL_NAME || "AiLysium Admin",
            email: ADMIN_EMAIL.toLowerCase(),
            phoneNumber: ADMIN_PHONE_NUMBER || "+10000000000",
            passwordHash,
            role: "ADMIN",
            emailVerifiedAt: new Date(), // admin doesn't need email verification
        },
    });

    console.log(`Admin account created for ${ADMIN_EMAIL}.`);
};