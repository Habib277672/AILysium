import { prisma } from "../lib/prisma.js";

const PAGE_SIZE = 20;

// GET /api/admin/users?page=1&search=...
export const getUsers = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const search = (req.query.search || "").trim();

        const where = search
            ? {
                OR: [
                    { fullName: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                    { phoneNumber: { contains: search, mode: "insensitive" } },
                ],
            }
            : {};

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * PAGE_SIZE,
                take: PAGE_SIZE,
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                    emailVerifiedAt: true,
                    createdAt: true,
                },
            }),
            prisma.user.count({ where }),
        ]);

        res.json({
            data: users,
            total,
            page,
            totalPages: Math.ceil(total / PAGE_SIZE) || 1,
        });
    } catch (err) {
        next(err);
    }
}

// GET /api/admin/enrollments?page=1&search=...&status=PENDING
export const getEnrollments = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const search = (req.query.search || "").trim();
        const status = req.query.status; // "All" or a PaymentStatus value

        const where = {
            ...(status && status !== "All" ? { paymentStatus: status } : {}),
            ...(search
                ? {
                    OR: [
                        { user: { fullName: { contains: search, mode: "insensitive" } } },
                        { user: { email: { contains: search, mode: "insensitive" } } },
                        { course: { title: { contains: search, mode: "insensitive" } } },
                    ],
                }
                : {}),
        };

        const [enrollments, total] = await Promise.all([
            prisma.enrollment.findMany({
                where,
                orderBy: { enrolledAt: "desc" },
                skip: (page - 1) * PAGE_SIZE,
                take: PAGE_SIZE,
                include: {
                    user: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
                    course: { select: { id: true, title: true, slug: true } },
                },
            }),
            prisma.enrollment.count({ where }),
        ]);

        res.json({
            data: enrollments.map((enrollment) => ({
                enrollmentId: enrollment.id,
                userId: enrollment.user.id,
                userName: enrollment.user.fullName,
                email: enrollment.user.email,
                phoneNumber: enrollment.user.phoneNumber,
                course: enrollment.course.title,
                enrollmentDate: enrollment.enrolledAt,
                paymentStatus: enrollment.paymentStatus,
            })),
            total,
            page,
            totalPages: Math.ceil(total / PAGE_SIZE) || 1,
        });
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