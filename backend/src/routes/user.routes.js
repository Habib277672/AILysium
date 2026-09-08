import { Router } from "express";
import { requireAuth } from "../middlewares/verify.middleware.js";
import { getEnrollments, getProfile } from "../controllers/user.controller.js";

const router = Router();

// GET /api/me — authenticated profile
router.route("/")
    .get(requireAuth, getProfile);

// GET /api/me/enrollments — current user's enrollments
// Per the Profile page spec: course name, enrollment date, payment status.
router.route("/enrollments")
    .get(requireAuth, getEnrollments);

export default router;