import { Router } from "express";
import { requireAdmin } from "../middlewares/verify.middleware.js";
import { createAdminEnrollment, updateAdminEnrollment } from "../controllers/admin.enrollment.controller.js";

const router = Router();

router.use(requireAdmin);

router.route("/").post(createAdminEnrollment);
router.route("/:id").patch(updateAdminEnrollment);

export default router;