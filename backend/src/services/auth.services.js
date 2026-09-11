import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../lib/prisma.js";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = "7d";
const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const EMAIL_VERIFICATION_TTL_MS = 60 * 60 * 1000;
const PASSWORD_RESET_TTL_MS = 30 * 60 * 1000;

// --- Sessions -----------------------------------------------------------

export const createSession = ({ userId, userAgent, ipAddress }) =>
    prisma.session.create({
        data: {
            userId,
            userAgent: userAgent ?? null,
            ipAddress: ipAddress ?? null,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        },
    });

export const findSessionById = (id) => prisma.session.findUnique({ where: { id } });

// --- Tokens ---------------------------------------------------------------
// Access token carries everything a route guard needs (sub/role/sessionId)
// so no DB hit is required just to check who's asking. Refresh token
// carries ONLY sessionId — on its own it proves nothing about identity
// without the session row still being valid in the DB.

export const createAccessToken = (user, sessionId) =>
    jwt.sign(
        { sub: user.id, role: user.role, sessionId },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: ACCESS_TOKEN_TTL }
    );

export const createRefreshToken = (sessionId) =>
    jwt.sign({ sessionId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_TTL,
    });

export const verifyJWTToken = (token) =>
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);

const verifyRefreshJWTToken = (token) =>
    jwt.verify(token, process.env.JWT_REFRESH_SECRET);

// One shared helper for register + login — creates the session row ONCE,
// signs both tokens off it, sets both cookies. Never called during
// refresh, which is exactly what stops sessions from multiplying.
export const authenticateUser = async ({ req, res, user }) => {
    const session = await createSession({
        userId: user.id,
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip,
    });

    const accessToken = createAccessToken(user, session.id);
    const refreshToken = createRefreshToken(session.id);

    const baseConfig = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    };

    res.cookie("access_token", accessToken, { ...baseConfig, maxAge: 15 * 60 * 1000 });
    res.cookie("refresh_token", refreshToken, { ...baseConfig, maxAge: REFRESH_TOKEN_TTL_MS });
};

// The actual fix: verifies the refresh JWT, checks the session row is
// still valid/unexpired, then just RE-SIGNS both tokens off the SAME
// session id. No prisma.session.create, no prisma.session.update — zero
// writes. Two parallel requests hitting this at once both succeed
// independently; there's no shared mutable row to race over anymore.
export const refreshTokenFn = async (refreshToken) => {
    const decoded = verifyRefreshJWTToken(refreshToken);
    const session = await findSessionById(decoded.sessionId);

    if (!session || !session.valid || session.expiresAt < new Date()) {
        const error = new Error("Invalid or expired session");
        error.status = 401;
        throw error;
    }

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) {
        const error = new Error("User not found");
        error.status = 401;
        throw error;
    }

    const newAccessToken = createAccessToken(user, session.id);
    const newRefreshToken = createRefreshToken(session.id);

    return { newAccessToken, newRefreshToken, user, sessionId: session.id };
};

export const clearUserSession = async (sessionId) => {
    if (!sessionId) return;
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => { });
};

// --- Email verification (unchanged logic) --------------------------------

export const createEmailVerificationToken = async (userId) => {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS);
    await prisma.emailVerificationToken.create({ data: { userId, token, expiresAt } });
    return token;
};

export const consumeEmailVerificationToken = async (token) => {
    const record = await prisma.emailVerificationToken.findUnique({ where: { token } });

    if (!record || record.expiresAt < new Date()) {
        const error = new Error("Invalid or expired verification link");
        error.status = 400;
        throw error;
    }

    await prisma.$transaction([
        prisma.user.update({ where: { id: record.userId }, data: { emailVerifiedAt: new Date() } }),
        prisma.emailVerificationToken.delete({ where: { id: record.id } }),
    ]);

    return record.userId;
};

// --- Password reset -------------------------------------------------------

export const createPasswordResetToken = async (userId) => {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MS);
    await prisma.passwordResetToken.create({ data: { userId, token, expiresAt } });
    return token;
};

export const consumePasswordResetToken = async (token) => {
    const record = await prisma.passwordResetToken.findUnique({ where: { token } });

    if (!record || record.expiresAt < new Date()) {
        const error = new Error("Invalid or expired reset link");
        error.status = 400;
        throw error;
    }

    // Deleted immediately, before the caller even changes the password —
    // a reset link is single-use no matter what happens next.
    await prisma.passwordResetToken.delete({ where: { id: record.id } });
    return record.userId;
};