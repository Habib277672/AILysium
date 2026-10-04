import { prisma } from "../lib/prisma.js";
import {
    createAdminEnrollmentSchema,
    updateAdminEnrollmentSchema,
} from "../validators/adminEnrollment.validator.js";

// POST /api/admin/enrollments — admin enrolls any user into any course,
// setting the payment status directly. Bypasses the normal student-facing
// flow entirely (no email-verification check, no duplicate-request from
// the user) since this is an admin override action.
export const createAdminEnrollment = async (req, res, next) => {
    try {
        const { data, error } = createAdminEnrollmentSchema.safeParse(req.body);
        if (error) {
            const err = new Error(error.issues[0].message);
            err.status = 400;
            throw err;
        }

        const { userId, courseId, paymentStatus } = data;

        const [user, course] = await Promise.all([
            prisma.user.findUnique({ where: { id: userId } }),
            prisma.course.findUnique({ where: { id: courseId } }),
        ]);

        if (!user) {
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }
        if (user.role === "ADMIN") {
            const err = new Error("Cannot enroll an admin account in a course");
            err.status = 400;
            throw err;
        }
        if (!course) {
            const err = new Error("Course not found");
            err.status = 404;
            throw err;
        }

        const existing = await prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } },
        });
        if (existing) {
            const err = new Error("This user is already enrolled in this course");
            err.status = 409;
            throw err;
        }

        const operations = [
            prisma.enrollment.create({
                data: { userId, courseId, paymentStatus },
                include: {
                    user: { select: { id: true, fullName: true, email: true } },
                    course: { select: { id: true, title: true, price: true } },
                },
            }),
        ];

        // Keep Payment records consistent with a manually-confirmed
        // enrollment — a CONFIRMED enrollment with no Payment row would
        // look like a data-integrity gap in reports/revenue totals later.
        const enrollment = await prisma.$transaction(async (tx) => {
            const created = await tx.enrollment.create({
                data: { userId, courseId, paymentStatus },
                include: {
                    user: { select: { id: true, fullName: true, email: true } },
                    course: { select: { id: true, title: true, price: true } },
                },
            });

            if (paymentStatus === "CONFIRMED") {
                await tx.payment.create({
                    data: {
                        userId,
                        courseId,
                        enrollmentId: created.id,
                        amount: course.price,
                        provider: "admin_manual",
                        paymentStatus: "CONFIRMED",
                    },
                });
            }

            return created;
        });

        res.status(201).json(enrollment);
    } catch (err) {
        next(err);
    }
};

// PATCH /api/admin/enrollments/:id — change an existing enrollment's
// payment status directly.
export const updateAdminEnrollment = async (req, res, next) => {
    try {
        const { data, error } = updateAdminEnrollmentSchema.safeParse(req.body);
        if (error) {
            const err = new Error(error.issues[0].message);
            err.status = 400;
            throw err;
        }

        const enrollment = await prisma.enrollment.findUnique({
            where: { id: req.params.id },
            include: { course: true, payment: true },
        });
        if (!enrollment) {
            const err = new Error("Enrollment not found");
            err.status = 404;
            throw err;
        }

        const updated = await prisma.$transaction(async (tx) => {
            const result = await tx.enrollment.update({
                where: { id: enrollment.id },
                data: { paymentStatus: data.paymentStatus },
                include: {
                    user: { select: { id: true, fullName: true, email: true } },
                    course: { select: { id: true, title: true, price: true } },
                },
            });

            // Moving TO confirmed with no existing payment row — create one.
            if (data.paymentStatus === "CONFIRMED" && !enrollment.payment) {
                await tx.payment.create({
                    data: {
                        userId: enrollment.userId,
                        courseId: enrollment.courseId,
                        enrollmentId: enrollment.id,
                        amount: enrollment.course.price,
                        provider: "admin_manual",
                        paymentStatus: "CONFIRMED",
                    },
                });
            }

            return result;
        });

        res.json(updated);
    } catch (err) {
        next(err);
    }
};