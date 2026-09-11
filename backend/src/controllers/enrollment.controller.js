import { prisma } from "../lib/prisma.js";

export const createEnrollment = async (req, res, next) => {
    try {
        // Admin accounts manage the catalog, not consume it — an admin
        // enrolling in their own course would pollute real enrollment
        // data and the admin report with a non-real, non-paying "student."
        if (req.user.role === "ADMIN") {
            const err = new Error("Admin accounts cannot enroll in courses");
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
}