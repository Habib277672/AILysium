import { prisma } from "../lib/prisma.js";
import { z } from "zod";
import ExcelJS from "exceljs";

const slugify = (title) =>
    title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const courseSchema = z.object({
    title: z.string().trim().min(2).max(120),
    description: z.string().trim().min(1),
    price: z.number().int().nonnegative(),
    status: z.enum(["AVAILABLE", "COMING_SOON", "UNPUBLISHED"]).default("COMING_SOON"),
    isFeatured: z.boolean().default(false),
    isFree: z.boolean().default(false),
    // Optional — if omitted, generated from title.
    slug: z.string().trim().min(2).max(140).optional(),

    duration: z.string().trim().min(1, { message: "Duration is required" }),
    format: z.string().trim().min(1, { message: "Format is required" }),
    mentor: z.string().trim().min(1).optional().nullable(),

    // Bullet-list fields — accept an array of non-empty strings. Empty
    // array is valid (e.g. a brand-new course with no benefits written
    // yet), but individual empty strings inside the array are rejected so
    // admin can't accidentally save blank bullets.
    benefits: z.array(z.string().trim().min(1)).default([]),
    toolsCovered: z.array(z.string().trim().min(1)).default([]),

    ageRange: z.string().trim().min(1).optional().nullable(),
    projectsCount: z.number().int().nonnegative().optional().nullable(),
    imageUrl: z.string().trim().url({ message: "imageUrl must be a valid URL" }).optional().nullable(),
});

const updateCourseSchema = courseSchema.partial();

// GET /api/admin/courses — list all courses, any status
export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await prisma.course.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(courses);
    } catch (err) {
        next(err);
    }
}

// POST /api/admin/courses — create a course
export const createCourse = async (req, res, next) => {
    try {
        const { data, error } = courseSchema.safeParse(req.body);
        if (error) {
            const err = new Error(error.issues[0].message);
            err.status = 400;
            throw err;
        }

        const slug = data.slug || slugify(data.title);

        const existing = await prisma.course.findUnique({ where: { slug } });
        if (existing) {
            const err = new Error(`A course with slug "${slug}" already exists`);
            err.status = 409;
            throw err;
        }

        const course = await prisma.course.create({
            data: { ...data, slug },
        });

        res.status(201).json(course);
    } catch (err) {
        next(err);
    }
}

// PATCH /api/admin/courses/:id — edit a course (partial update)
export const updateCourse = async (req, res, next) => {
    try {
        const { data, error } = updateCourseSchema.safeParse(req.body);
        if (error) {
            const err = new Error(error.issues[0].message);
            err.status = 400;
            throw err;
        }

        const course = await prisma.course.findUnique({ where: { id: req.params.id } });
        if (!course) {
            const err = new Error("Course not found");
            err.status = 404;
            throw err;
        }

        if (data.slug && data.slug !== course.slug) {
            const slugTaken = await prisma.course.findUnique({ where: { slug: data.slug } });
            if (slugTaken) {
                const err = new Error(`A course with slug "${data.slug}" already exists`);
                err.status = 409;
                throw err;
            }
        }

        const updated = await prisma.course.update({
            where: { id: req.params.id },
            data,
        });

        res.json(updated);
    } catch (err) {
        next(err);
    }
}

// DELETE /api/admin/courses/:id — delete a course
export const deleteCourse = async (req, res, next) => {
    try {
        const course = await prisma.course.findUnique({
            where: { id: req.params.id },
            include: { enrollments: true },
        });

        if (!course) {
            const err = new Error("Course not found");
            err.status = 404;
            throw err;
        }

        if (course.enrollments.length > 0) {
            const err = new Error(
                "This course has existing enrollments and cannot be deleted. Set its status to UNPUBLISHED instead."
            );
            err.status = 409;
            throw err;
        }

        await prisma.course.delete({ where: { id: req.params.id } });
        res.json({ message: "Course deleted" });
    } catch (err) {
        next(err);
    }
}

// GET /api/admin/courses/:id/export — downloads an .xlsx of every user
// enrolled in this specific course, with their enrollment and payment
// details.
export const exportCourseEnrollments = async (req, res, next) => {
    try {
        const course = await prisma.course.findUnique({
            where: { id: req.params.id },
        });

        if (!course) {
            const err = new Error("Course not found");
            err.status = 404;
            throw err;
        }

        const enrollments = await prisma.enrollment.findMany({
            where: { courseId: course.id },
            orderBy: { enrolledAt: "desc" },
            include: {
                user: {
                    select: {
                        fullName: true,
                        username: true,
                        email: true,
                        phoneNumber: true,
                    },
                },
                payment: {
                    select: { amount: true, transactionId: true, createdAt: true },
                },
            },
        });

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Enrollments");

        sheet.columns = [
            { header: "Full Name", key: "fullName", width: 24 },
            { header: "Username", key: "username", width: 20 },
            { header: "Email", key: "email", width: 28 },
            { header: "Phone Number", key: "phoneNumber", width: 18 },
            { header: "Enrollment Date", key: "enrolledAt", width: 18 },
            { header: "Payment Status", key: "paymentStatus", width: 16 },
            { header: "Amount Paid (PKR)", key: "amount", width: 16 },
            { header: "Transaction ID", key: "transactionId", width: 22 },
        ];

        sheet.getRow(1).font = { bold: true };

        enrollments.forEach((enrollment) => {
            sheet.addRow({
                fullName: enrollment.user.fullName,
                username: enrollment.user.username ? `@${enrollment.user.username}` : "",
                email: enrollment.user.email,
                phoneNumber: enrollment.user.phoneNumber,
                enrolledAt: enrollment.enrolledAt.toLocaleDateString(),
                paymentStatus: enrollment.paymentStatus,
                amount: enrollment.payment?.amount ?? "",
                transactionId: enrollment.payment?.transactionId ?? "",
            });
        });

        // Safe filename: course title with spaces/special chars stripped.
        const safeFileName = course.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${safeFileName}-enrollments.xlsx"`
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        next(err);
    }
};