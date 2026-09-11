import { refreshTokenFn, verifyJWTToken } from "../services/auth.services.js";

export const verifyAuthentication = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    if (!accessToken && !refreshToken) {
        req.user = null;
        return next();
    }

    if (accessToken) {
        try {
            req.user = verifyJWTToken(accessToken); // { sub, role, sessionId }
            return next();
        } catch (error) {
            // expired/invalid — fall through to refresh
        }
    }

    if (refreshToken) {
        try {
            const { newAccessToken, newRefreshToken, user, sessionId } =
                await refreshTokenFn(refreshToken);

            req.user = { sub: user.id, role: user.role, sessionId };

            const baseConfig = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            };

            res.cookie("access_token", newAccessToken, { ...baseConfig, maxAge: 15 * 60 * 1000 });
            res.cookie("refresh_token", newRefreshToken, {
                ...baseConfig,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return next();
        } catch (error) {
            req.user = null;
            return next();
        }
    }

    req.user = null;
    return next();
};

export const requireAuth = (req, res, next) => {
    if (!req.user) {
        const error = new Error("Authentication required");
        error.status = 401;
        return next(error);
    }
    return next();
};

export const requireAdmin = (req, res, next) => {
    if (!req.user) {
        const error = new Error("Authentication required");
        error.status = 401;
        return next(error);
    }
    if (req.user.role !== "ADMIN") {
        const error = new Error("Admin access required");
        error.status = 403;
        return next(error);
    }
    return next();
};