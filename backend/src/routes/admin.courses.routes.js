import { Router } from "express";
import { requireAdmin } from "../middlewares/verify.middleware.js";
import { createCourse, deleteCourse, exportCourseEnrollments, getAllCourses, updateCourse } from "../controllers/admin.courses.controller.js";

const router = Router();

router.use(requireAdmin);

// GET /api/admin/courses — list all courses, any status (unlike the public
// GET /api/courses which callers might later want to filter to
// AVAILABLE-only; admin sees everything including UNPUBLISHED/COMING_SOON).
router.route("/")
    .get(getAllCourses)
    .post(createCourse);

router.route("/:id")
    .patch(updateCourse)
    .delete(deleteCourse);

// GET /api/admin/courses/:id/export — downloads an .xlsx of every user
router.route("/:id/export").get(exportCourseEnrollments);

export default router;