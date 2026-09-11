import { prisma } from "../lib/prisma.js";

// GET /api/courses — public course listing
// UNPUBLISHED courses are admin-only drafts/archived items — they should
// never appear in any public or student-facing listing, only in
// GET /api/admin/courses.
export const getCourses = async (req, res, next) => {
    try {
        const courses = await prisma.course.findMany({
            where: { status: { not: "UNPUBLISHED" } },
            orderBy: { createdAt: "asc" },
        });
        res.json(courses);
    } catch (err) {
        next(err);
    }
};

// GET /api/courses/:slug — public course details
export const getCourseBySlug = async (req, res, next) => {
    try {
        const course = await prisma.course.findUnique({
            where: { slug: req.params.slug },
        });

        if (!course || course.status === "UNPUBLISHED") {
            const error = new Error("Course not found");
            error.status = 404;
            throw error;
        }

        res.json(course);
    } catch (err) {
        next(err);
    }
};