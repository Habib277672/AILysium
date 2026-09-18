import crypto from "crypto";
import { prisma } from "../lib/prisma.js";

// POST /api/payments — create/process a payment for a pending enrollment.
export const createPayment = async (req, res, next) => {
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

        // A FAILED payment is not a real block — it means nothing was
        // actually charged, so the user must be able to try again. Since
        // Payment.enrollmentId is @unique, a retry requires clearing out
        // the old failed row first; only a CONFIRMED payment should ever
        // be treated as permanent.
        if (enrollment.payment && enrollment.payment.paymentStatus !== "FAILED") {
            const err = new Error("A payment record already exists for this enrollment");
            err.status = 409;
            throw err;
        }

        const isSuccess = simulateOutcome !== "fail";
        const resultingPaymentStatus = isSuccess ? "CONFIRMED" : "FAILED";
        const transactionId = `mock_${crypto.randomBytes(8).toString("hex")}`;

        const operations = [];

        // Clear the previous failed attempt before recording the new one
        // — must happen inside the same transaction as the new payment,
        // so there's never a moment where the unique constraint on
        // enrollmentId would reject the new insert.
        if (enrollment.payment) {
            operations.push(
                prisma.payment.delete({ where: { id: enrollment.payment.id } })
            );
        }

        operations.push(
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
            })
        );

        operations.push(
            prisma.enrollment.update({
                where: { id: enrollment.id },
                data: { paymentStatus: resultingPaymentStatus },
            })
        );

        const results = await prisma.$transaction(operations);
        const payment = results[results.length - 2]; // the create() result, second-to-last

        res.status(201).json({ payment, status: resultingPaymentStatus });
    } catch (err) {
        next(err);
    }
}