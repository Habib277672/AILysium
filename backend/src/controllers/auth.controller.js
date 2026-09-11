import argon2 from "argon2";
import { prisma } from "../lib/prisma.js";
import {
    loginSchema,
    registerSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} from "../validators/auth.validator.js";
import {
    authenticateUser,
    clearUserSession,
    createEmailVerificationToken,
    consumeEmailVerificationToken,
    createPasswordResetToken,
    consumePasswordResetToken,
} from "../services/auth.services.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../services/email.services.js";
import { prisma as db } from "../lib/prisma.js";

const publicUser = (user) => ({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    emailVerifiedAt: user.emailVerifiedAt,
});

export const register = async (req, res, next) => {
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

        await authenticateUser({ req, res, user });

        try {
            const token = await createEmailVerificationToken(user.id);
            await sendVerificationEmail({ to: user.email, fullName: user.fullName, token });
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError);
        }

        res.status(201).json({ user: publicUser(user) });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { data, error } = loginSchema.safeParse(req.body);
        if (error) {
            const err = new Error(error.issues[0].message);
            err.status = 400;
            throw err;
        }

        const { email, password } = data;
        const user = await prisma.user.findUnique({ where: { email } });

        const invalidCredentialsError = () => {
            const err = new Error("Invalid email or password");
            err.status = 401;
            return err;
        };

        if (!user) throw invalidCredentialsError();
        const passwordMatches = await argon2.verify(user.passwordHash, password);
        if (!passwordMatches) throw invalidCredentialsError();

        await authenticateUser({ req, res, user });

        res.json({ user: publicUser(user) });
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res, next) => {
    try {
        await clearUserSession(req.user?.sessionId);
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.json({ message: "Logged out" });
    } catch (err) {
        next(err);
    }
};

export const verifyEmail = async (req, res, next) => {
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
};

export const resendVerification = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.sub } });
        if (!user) {
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }
        if (user.emailVerifiedAt) return res.json({ message: "Email is already verified" });

        const token = await createEmailVerificationToken(user.id);
        await sendVerificationEmail({ to: user.email, fullName: user.fullName, token });
        res.json({ message: "Verification email sent" });
    } catch (err) {
        next(err);
    }
};

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
    try {
        const { data, error } = forgotPasswordSchema.safeParse(req.body);
        if (error) {
            const err = new Error(error.issues[0].message);
            err.status = 400;
            throw err;
        }

        const user = await prisma.user.findUnique({ where: { email: data.email } });

        // Same response whether or not the account exists — never let this
        // endpoint be used to enumerate registered emails.
        if (user) {
            try {
                const token = await createPasswordResetToken(user.id);
                await sendPasswordResetEmail({ to: user.email, fullName: user.fullName, token });
            } catch (emailError) {
                console.error("Failed to send password reset email:", emailError);
            }
        }

        res.json({
            message: "If an account exists for that email, a password reset link has been sent.",
        });
    } catch (err) {
        next(err);
    }
};

// POST /api/auth/reset-password
export const resetPassword = async (req, res, next) => {
    try {
        const { data, error } = resetPasswordSchema.safeParse(req.body);
        if (error) {
            const err = new Error(error.issues[0].message);
            err.status = 400;
            throw err;
        }

        const userId = await consumePasswordResetToken(data.token);
        const passwordHash = await argon2.hash(data.password);

        await prisma.user.update({ where: { id: userId }, data: { passwordHash } });

        // Reset implies the old password may be compromised — log out every
        // existing session for this user immediately, everywhere.
        await db.session.deleteMany({ where: { userId } });

        res.json({ message: "Password has been reset. Please log in with your new password." });
    } catch (err) {
        next(err);
    }
};