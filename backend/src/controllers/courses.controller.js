import { prisma } from "../lib/prisma.js";

// GET /api/courses — public course listing
export const getCourses = async (req, res, next) => {
    try {
        const courses = await prisma.course.findMany({
            orderBy: { createdAt: "asc" },
        });
        res.json(courses);
    } catch (err) {
        next(err);
    }
}

// GET /api/courses/:slug — public course details
export const getCourseBySlug = async (req, res, next) => {
    try {
        const course = await prisma.course.findUnique({
            where: { slug: req.params.slug },
        });

        if (!course) {
            const error = new Error("Course not found");
            error.status = 404;
            throw error;
        }

        res.json(course);
    } catch (err) {
        next(err);
    }
}