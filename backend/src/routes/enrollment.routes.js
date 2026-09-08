import { Router } from "express";
import { requireAuth } from "../middlewares/verify.middleware.js";
import { createEnrollment } from "../controllers/enrollment.controller.js";

const router = Router();

// POST /api/enrollments — create or validate an enrollment
// Per the flow: "Confirm" step creates a PENDING enrollment record; it only
// becomes CONFIRMED after a verified payment (handled in payments.routes.js).
router.route("/")
    .post(requireAuth, createEnrollment);


export default router;