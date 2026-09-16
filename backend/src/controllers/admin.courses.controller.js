import { prisma } from "../lib/prisma.js";
import { z } from "zod";

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