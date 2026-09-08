import { prisma } from "../lib/prisma.js";

// GET /api/me — authenticated profile
export const getProfile = async (req, res, next) => {
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
}

// GET /api/me/enrollments — current user's enrollments
export const getEnrollments = async (req, res, next) => {
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
}