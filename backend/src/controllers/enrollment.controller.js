import { prisma } from "../lib/prisma.js";

export const createEnrollment = async (req, res, next) => {
    try {
        if (req.user.role === "ADMIN") {
            const err = new Error("Admin accounts cannot enroll in courses");
            err.status = 403;
            throw err;
        }

        const user = await prisma.user.findUnique({ where: { id: req.user.sub } });

        if (!user.emailVerifiedAt) {
            const err = new Error(
                "Please verify your email before enrolling in a course. Check your inbox, or resend the verification email from your profile."
            );
            err.status = 403;
            throw err;
        }

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

        const existingEnrollment = await prisma.enrollment.findUnique({
            where: { userId_courseId: { userId: req.user.sub, courseId } },
        });

        if (existingEnrollment) {
            const err = new Error("You are already enrolled in this course");
            err.status = 409;
            throw err;
        }

        // Free courses skip payment entirely — the enrollment is created
        // already CONFIRMED-equivalent (FREE), so the frontend never sends
        // the user to /payment for these at all.
        const enrollment = await prisma.enrollment.create({
            data: {
                userId: req.user.sub,
                courseId,
                paymentStatus: course.isFree ? "FREE" : "PENDING",
            },
            include: {
                course: { select: { id: true, title: true, slug: true, price: true, isFree: true } },
            },
        });

        res.status(201).json(enrollment);
    } catch (err) {
        next(err);
    }
}