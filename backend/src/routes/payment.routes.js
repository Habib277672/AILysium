import { Router } from "express";
import { requireAuth } from "../middlewares/verify.middleware.js";
import { createPayment } from "../controllers/payment.controller.js";

const router = Router();

// POST /api/payments — create/process a payment for a pending enrollment.
// This is the MOCK payment gateway per your spec: a "Simulate Payment"
// button on the frontend calls this endpoint, and the BACKEND decides
// success/failure — the frontend never gets to declare a payment
// successful on its own. A real gateway integration later would replace
// the body of the try block with an actual provider call/webhook
// verification, but the shape of this endpoint (and the guarantee that
// only the backend flips paymentStatus) stays the same.

router.route("/")
    .post(requireAuth, createPayment)


export default router;