import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../lib/prisma.js";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const EMAIL_VERIFICATION_TTL_MS = 60 * 60 * 1000; // 1 hour

// --- Access tokens (short-lived, stateless JWT) -----------------------

export const createAccessToken = (user) => {
    return jwt.sign(
        { sub: user.id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: ACCESS_TOKEN_TTL }
    );
};

export const verifyJWTToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

// --- Refresh tokens (long-lived, backed by the sessions table) --------
// The refresh token itself is a random opaque string, NOT a JWT. Storing
// it (hashed would be even stronger, but keeping this simple per your
// request) in the `sessions` table is what makes "is this session still
// valid?" a real database check instead of just trusting an unexpired JWT
// — so logout / revoke-all-sessions actually works.

export const createRefreshToken = async ({ userId, userAgent, ipAddress }) => {
    const refreshToken = crypto.randomBytes(48).toString("hex");
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

    await prisma.session.create({
        data: {
            userId,
            refreshToken,
            userAgent: userAgent ?? null,
            ipAddress: ipAddress ?? null,
            expiresAt,
        },
    });

    return refreshToken;
};

// Creates a full session (access + refresh) for a freshly authenticated
// user — used by both register and login.
export const createSession = async ({ req, res, user }) => {
    const accessToken = createAccessToken(user);
    const refreshToken = await createRefreshToken({
        userId: user.id,
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip,
    });

    const baseConfig = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    };

    res.cookie("access_token", accessToken, { ...baseConfig, maxAge: 15 * 60 * 1000 });
    res.cookie("refresh_token", refreshToken, { ...baseConfig, maxAge: REFRESH_TOKEN_TTL_MS });
};

// Given a valid refresh token, issues a brand-new access + refresh token
// pair (rotation — the old refresh token is invalidated so it can't be
// reused if it was ever stolen/replayed).
export const refreshTokenFn = async (refreshToken) => {
    const session = await prisma.session.findUnique({
        where: { refreshToken },
        include: { user: true },
    });

    if (!session || !session.valid || session.expiresAt < new Date()) {
        const error = new Error("Invalid or expired session");
        error.status = 401;
        throw error;
    }

    // Rotate: invalidate the old session, issue a new one.
    await prisma.session.update({
        where: { id: session.id },
        data: { valid: false },
    });

    const newAccessToken = createAccessToken(session.user);
    const newRefreshToken = await createRefreshToken({
        userId: session.user.id,
        userAgent: session.userAgent,
        ipAddress: session.ipAddress,
    });

    return { newAccessToken, newRefreshToken, user: session.user };
};

export const clearUserSession = async (refreshToken) => {
    if (!refreshToken) return;
    await prisma.session
        .update({ where: { refreshToken }, data: { valid: false } })
        .catch(() => {
            // Session may already be gone/invalid — logout should never fail
            // just because the token was already stale.
        });
};

// --- Email verification -------------------------------------------------

export const createEmailVerificationToken = async (userId) => {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS);

    await prisma.emailVerificationToken.create({
        data: { userId, token, expiresAt },
    });

    return token;
};

export const consumeEmailVerificationToken = async (token) => {
    const record = await prisma.emailVerificationToken.findUnique({
        where: { token },
    });

    if (!record || record.expiresAt < new Date()) {
        const error = new Error("Invalid or expired verification link");
        error.status = 400;
        throw error;
    }

    await prisma.$transaction([
        prisma.user.update({
            where: { id: record.userId },
            data: { emailVerifiedAt: new Date() },
        }),
        prisma.emailVerificationToken.delete({ where: { id: record.id } }),
    ]);

    return record.userId;
};