import { Router } from "express";
import argon2 from "argon2";
import { prisma } from "../lib/prisma.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import {
    createSession,
    clearUserSession,
    createEmailVerificationToken,
    consumeEmailVerificationToken,
} from "../services/auth.services.js";
import { sendVerificationEmail } from "../services/email.services.js";
import { requireAuth } from "../middlewares/verify.middleware.js";

const router = Router();

// POST /api/auth/register
router.post("/register", async (req, res, next) => {
    try {
        const { data, error } = registerSchema.safeParse(req.body);

        if (error) {
            const err = new Error(error.issues[0].message);
            err.status = 400;
            throw err;
        }

        const { fullName, email, phoneNumber, password } = data;

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            const err = new Error("An account with this email already exists");
            err.status = 409;
            throw err;
        }

        const passwordHash = await argon2.hash(password);

        const user = await prisma.user.create({
            data: { fullName, email, phoneNumber, passwordHash },
        });

        await createSession({ req, res, user });

        // Verification email is sent after the session is created — if
        // Resend fails, the user is still registered and logged in, just
        // unverified. That failure is logged, not thrown, so a flaky email
        // provider never blocks account creation.
        try {
            const token = await createEmailVerificationToken(user.id);
            await sendVerificationEmail({ to: user.email, fullName: user.fullName, token });
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError);
        }

        res.status(201).json({
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                emailVerifiedAt: user.emailVerifiedAt,
            },
        });
    } catch (err) {
        next(err);
    }
});

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
    try {
        const { data, error } = loginSchema.safeParse(req.body);

        if (error) {
            const err = new Error(error.issues[0].message);
            err.status = 400;
            throw err;
        }

        const { email, password } = data;

        const user = await prisma.user.findUnique({ where: { email } });

        // Same vague error for "no such user" and "wrong password" — never
        // reveal which one failed.
        const invalidCredentialsError = () => {
            const err = new Error("Invalid email or password");
            err.status = 401;
            return err;
        };

        if (!user) throw invalidCredentialsError();

        const passwordMatches = await argon2.verify(user.passwordHash, password);
        if (!passwordMatches) throw invalidCredentialsError();

        await createSession({ req, res, user });

        res.json({
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                emailVerifiedAt: user.emailVerifiedAt,
            },
        });
    } catch (err) {
        next(err);
    }
});

// POST /api/auth/logout
router.post("/logout", async (req, res, next) => {
    try {
        await clearUserSession(req.cookies.refresh_token);
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.json({ message: "Logged out" });
    } catch (err) {
        next(err);
    }
});

// GET /api/auth/verify-email?token=...
// Not in the original scope PDF's API list, but required to actually
// consume the verification link sent by email — the frontend's
// /verify-email page will call this once with the token from the URL.
router.get("/verify-email", async (req, res, next) => {
    try {
        const { token } = req.query;
        if (!token) {
            const err = new Error("Missing verification token");
            err.status = 400;
            throw err;
        }

        await consumeEmailVerificationToken(token);
        res.json({ message: "Email verified successfully" });
    } catch (err) {
        next(err);
    }
});

// POST /api/auth/resend-verification
// Requires an active session — lets a logged-in but unverified user
// request a new link if the first one expired or was lost.
router.post("/resend-verification", requireAuth, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.sub } });

        if (!user) {
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        if (user.emailVerifiedAt) {
            return res.json({ message: "Email is already verified" });
        }

        const token = await createEmailVerificationToken(user.id);
        await sendVerificationEmail({ to: user.email, fullName: user.fullName, token });

        res.json({ message: "Verification email sent" });
    } catch (err) {
        next(err);
    }
});

export default router;