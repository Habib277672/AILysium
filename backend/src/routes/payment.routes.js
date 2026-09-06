import { Router } from "express";
import crypto from "crypto";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middlewares/verify.middleware.js";

const router = Router();

// POST /api/payments — create/process a payment for a pending enrollment.
//
// This is the MOCK payment gateway per your spec: a "Simulate Payment"
// button on the frontend calls this endpoint, and the BACKEND decides
// success/failure — the frontend never gets to declare a payment
// successful on its own. A real gateway integration later would replace
// the body of the try block with an actual provider call/webhook
// verification, but the shape of this endpoint (and the guarantee that
// only the backend flips paymentStatus) stays the same.
router.post("/", requireAuth, async (req, res, next) => {
    try {
        const { enrollmentId, simulateOutcome } = req.body;

        if (!enrollmentId) {
            const err = new Error("enrollmentId is required");
            err.status = 400;
            throw err;
        }

        const enrollment = await prisma.enrollment.findUnique({
            where: { id: enrollmentId },
            include: { course: true, payment: true },
        });

        if (!enrollment) {
            const err = new Error("Enrollment not found");
            err.status = 404;
            throw err;
        }

        // Ownership check — a user can only pay for their own enrollment.
        if (enrollment.userId !== req.user.sub) {
            const err = new Error("You cannot pay for another user's enrollment");
            err.status = 403;
            throw err;
        }

        if (enrollment.paymentStatus === "CONFIRMED") {
            const err = new Error("This enrollment is already paid and confirmed");
            err.status = 409;
            throw err;
        }

        if (enrollment.payment) {
            const err = new Error("A payment record already exists for this enrollment");
            err.status = 409;
            throw err;
        }

        // Mock gateway logic: defaults to success unless the caller explicitly
        // requests a failure simulation (useful for testing the Failed/Pending
        // path from the frontend without needing a real gateway).
        const isSuccess = simulateOutcome !== "fail";
        const resultingPaymentStatus = isSuccess ? "CONFIRMED" : "FAILED";
        const transactionId = `mock_${crypto.randomBytes(8).toString("hex")}`;

        const [payment] = await prisma.$transaction([
            prisma.payment.create({
                data: {
                    userId: req.user.sub,
                    courseId: enrollment.courseId,
                    enrollmentId: enrollment.id,
                    amount: enrollment.course.price,
                    provider: "mock",
                    transactionId,
                    paymentStatus: resultingPaymentStatus,
                },
            }),
            prisma.enrollment.update({
                where: { id: enrollment.id },
                data: { paymentStatus: resultingPaymentStatus },
            }),
        ]);

        res.status(201).json({ payment, status: resultingPaymentStatus });
    } catch (err) {
        next(err);
    }
});

export default router;