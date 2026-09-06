import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// GET /api/courses — public course listing
router.get("/", async (req, res, next) => {
    try {
        const courses = await prisma.course.findMany({
            orderBy: { createdAt: "asc" },
        });
        res.json(courses);
    } catch (err) {
        next(err);
    }
});

// GET /api/courses/:slug — public course details
router.get("/:slug", async (req, res, next) => {
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
});

export default router;