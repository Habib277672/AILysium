import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middlewares/verify.middleware.js";

const router = Router();

router.use(requireAdmin);

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
    // Optional — if omitted, generated from title. Letting an admin override
    // it matters because auto-slugging "Freelancer AI" vs the live site's
    // "Flantsers AI" typo, or any future renames, shouldn't be forced.
    slug: z.string().trim().min(2).max(140).optional(),
});

const updateCourseSchema = courseSchema.partial();

// GET /api/admin/courses — list all courses, any status (unlike the public
// GET /api/courses which callers might later want to filter to
// AVAILABLE-only; admin sees everything including UNPUBLISHED/COMING_SOON).
router.get("/", async (req, res, next) => {
    try {
        const courses = await prisma.course.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(courses);
    } catch (err) {
        next(err);
    }
});

// POST /api/admin/courses — create a course
router.post("/", async (req, res, next) => {
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
});

// PATCH /api/admin/courses/:id — edit a course (partial update, includes
// publish/unpublish via `status`)
router.patch("/:id", async (req, res, next) => {
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
});

// DELETE /api/admin/courses/:id — delete a course
router.delete("/:id", async (req, res, next) => {
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

        // Refuse to delete a course that already has enrollments/payment
        // history attached — deleting it would either orphan or cascade-delete
        // real enrollment/payment records, destroying financial history.
        // Unpublishing (PATCH status: UNPUBLISHED) is the safe alternative.
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
});

export default router;