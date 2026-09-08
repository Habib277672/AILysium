import { Router } from "express";
import { requireAdmin } from "../middlewares/verify.middleware.js";
import { getEnrollments, getUserById, getUsers } from "../controllers/admin.controller.js";

const router = Router();

// Every route in this file requires an authenticated ADMIN — applied once
// at the router level so no individual route can accidentally forget it.
router.use(requireAdmin);

router.route("/users")
    .get(getUsers);

router.route("/users/:id")
    .get(getUserById);

router.route("/enrollments")
    .get(getEnrollments);

export default router;