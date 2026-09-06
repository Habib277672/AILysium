import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middlewares/verify.middleware.js";

const router = Router();

// GET /api/me — authenticated profile
router.get("/", requireAuth, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.sub },
        });

        if (!user) {
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        res.json({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            emailVerifiedAt: user.emailVerifiedAt,
            createdAt: user.createdAt,
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/me/enrollments — current user's enrollments
// Per the Profile page spec: course name, enrollment date, payment status.
router.get("/enrollments", requireAuth, async (req, res, next) => {
    try {
        const enrollments = await prisma.enrollment.findMany({
            where: { userId: req.user.sub },
            orderBy: { enrolledAt: "desc" },
            include: {
                course: {
                    select: { id: true, title: true, slug: true },
                },
            },
        });

        res.json(
            enrollments.map((enrollment) => ({
                id: enrollment.id,
                course: enrollment.course,
                paymentStatus: enrollment.paymentStatus,
                enrolledAt: enrollment.enrolledAt,
            }))
        );
    } catch (err) {
        next(err);
    }
});

export default router;