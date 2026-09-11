import { prisma } from "../lib/prisma.js";

// GET /api/admin/users — registered users list
export const getUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                fullName: true,
                email: true,
                phoneNumber: true,
                role: true,
                emailVerifiedAt: true,
                createdAt: true,
            },
        });

        res.json(users);
    } catch (err) {
        next(err);
    }
}

// GET /api/admin/enrollments — all enrollments, for the admin "enrollments" view.
export const getEnrollments = async (req, res, next) => {
    try {
        const enrollments = await prisma.enrollment.findMany({
            orderBy: { enrolledAt: "desc" },
            include: {
                user: {
                    select: { id: true, fullName: true, email: true, phoneNumber: true },
                },
                course: {
                    select: { id: true, title: true, slug: true },
                },
            },
        });

        res.json(
            enrollments.map((enrollment) => ({
                enrollmentId: enrollment.id,
                userId: enrollment.user.id,
                userName: enrollment.user.fullName,
                email: enrollment.user.email,
                phoneNumber: enrollment.user.phoneNumber,
                course: enrollment.course.title,
                enrollmentDate: enrollment.enrolledAt,
                paymentStatus: enrollment.paymentStatus,
            }))
        );
    } catch (err) {
        next(err);
    }
}

// GET /api/admin/users/:id — a single user's details + full enrollment
export const getUserById = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
            select: {
                id: true,
                fullName: true,
                email: true,
                phoneNumber: true,
                role: true,
                emailVerifiedAt: true,
                createdAt: true,
                enrollments: {
                    orderBy: { enrolledAt: "desc" },
                    select: {
                        id: true,
                        paymentStatus: true,
                        enrolledAt: true,
                        course: { select: { id: true, title: true, slug: true } },
                    },
                },
            },
        });

        if (!user) {
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        res.json(user);
    } catch (err) {
        next(err);
    }
}