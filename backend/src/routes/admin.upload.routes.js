import { Router } from "express";
import { requireAdmin } from "../middlewares/verify.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { uploadCourseImage } from "../controllers/admin.upload.controller.js";

const router = Router();

router.use(requireAdmin);

router.route("/course-image").post(upload.single("image"), uploadCourseImage);

export default router;