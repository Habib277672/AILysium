import { Router } from "express";
import { requireAuth } from "../middlewares/verify.middleware.js";
import { login, logout, register, resendVerification, verifyEmail } from "../controllers/auth.controller.js";

const router = Router();

// POST /api/auth/register
router.route("/register")
    .post(register);

// POST /api/auth/login
router.route("/login")
    .post(login);

// POST /api/auth/logout
router.route("/logout")
    .post(logout);

// GET /api/auth/verify-email?token=...
router.route("/verify-email")
    .get(verifyEmail);

// POST /api/auth/resend-verification
router.route("/resend-verification")
    .post(requireAuth, resendVerification);


export default router;