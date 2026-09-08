import { Router } from "express";
import { getCourseBySlug, getCourses } from "../controllers/courses.controller.js";

const router = Router();

// GET /api/courses — public course listing
router.route("/")
    .get(getCourses);

// GET /api/courses/:slug — public course details
router.route("/:slug")
    .get(getCourseBySlug);


export default router;