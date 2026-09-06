import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middlewares/verify.middleware.js";

const router = Router();

// Every route in this file requires an authenticated ADMIN — applied once
// at the router level so no individual route can accidentally forget it.
router.use(requireAdmin);

// GET /api/admin/users — registered users list
router.get("/users", async (req, res, next) => {
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
});

// GET /api/admin/enrollments — the primary "who enrolled in what" report.
// Columns per spec: User Name | Email | Phone Number | Course |
// Enrollment Date | Payment Status. Flattened into one object per row so
// the frontend admin table can render it directly without re-joining data.
router.get("/enrollments", async (req, res, next) => {
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
});

// GET /api/admin/users/:id — a single user's details + full enrollment
// history, for the admin "open a user" drill-down view.
router.get("/users/:id", async (req, res, next) => {
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
});

export default router;