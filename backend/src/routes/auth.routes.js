import { Router } from "express";
import { requireAuth } from "../middlewares/verify.middleware.js";
import {
    login,
    logout,
    register,
    resendVerification,
    verifyEmail,
    forgotPassword,
    resetPassword,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verify-email").get(verifyEmail);
router.route("/resend-verification").post(requireAuth, resendVerification);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

export default router;