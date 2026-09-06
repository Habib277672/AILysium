import { refreshTokenFn, verifyJWTToken } from "../services/auth.services.js";

// Runs on every request. Attaches `req.user` (or null) so downstream route
// handlers can check "is someone logged in?" without each one re-parsing
// cookies/tokens itself. Never blocks the request on its own — routes that
// require authentication use `requireAuth` (below) as an additional guard.
export const verifyAuthentication = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    if (!accessToken && !refreshToken) {
        req.user = null;
        return next();
    }

    if (accessToken) {
        try {
            const decodedToken = verifyJWTToken(accessToken);
            req.user = decodedToken;
            return next();
        } catch (error) {
            // Access token invalid/expired — fall through to try the refresh
            // token below instead of failing the request outright.
        }
    }

    if (refreshToken) {
        try {
            const { newAccessToken, newRefreshToken, user } = await refreshTokenFn(refreshToken);

            req.user = { sub: user.id, role: user.role };

            const baseConfig = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            };

            res.cookie("access_token", newAccessToken, {
                ...baseConfig,
                maxAge: 15 * 60 * 1000,
            });

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

// Hard gate for routes that require a logged-in user. Must run AFTER
// verifyAuthentication in the middleware chain, since it relies on
// req.user already being set.
export const requireAuth = (req, res, next) => {
    if (!req.user) {
        const error = new Error("Authentication required");
        error.status = 401;
        return next(error);
    }
    return next();
};

// Hard gate for admin-only routes, per the "only role: admin can access
// /admin/* routes and APIs" business rule. Must run after requireAuth
// (or verifyAuthentication) so req.user is populated.
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