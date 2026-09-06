import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middlewares/verify.middleware.js";

const router = Router();

// POST /api/enrollments — create or validate an enrollment
// Per the flow: "Confirm" step creates a PENDING enrollment record; it only
// becomes CONFIRMED after a verified payment (handled in payments.routes.js).
router.post("/", requireAuth, async (req, res, next) => {
    try {
        const { courseId } = req.body;

        if (!courseId) {
            const err = new Error("courseId is required");
            err.status = 400;
            throw err;
        }

        const course = await prisma.course.findUnique({ where: { id: courseId } });
        if (!course) {
            const err = new Error("Course not found");
            err.status = 404;
            throw err;
        }

        // Enforced again here (not just at the DB level) so we can return a
        // clear, specific error instead of a raw Prisma unique-constraint
        // failure if someone tries to re-enroll in the same course.
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: req.user.sub,
                    courseId,
                },
            },
        });

        if (existingEnrollment) {
            const err = new Error("You are already enrolled in this course");
            err.status = 409;
            throw err;
        }

        const enrollment = await prisma.enrollment.create({
            data: {
                userId: req.user.sub,
                courseId,
                paymentStatus: "PENDING",
            },
            include: {
                course: { select: { id: true, title: true, slug: true, price: true } },
            },
        });

        res.status(201).json(enrollment);
    } catch (err) {
        next(err);
    }
});

export default router;