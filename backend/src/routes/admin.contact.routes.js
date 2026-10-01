import { Router } from "express";
import { requireAdmin } from "../middlewares/verify.middleware.js";
import { getContactMessages, getContactMessageById } from "../controllers/contact.controller.js";

const router = Router();

router.use(requireAdmin);

router.route("/").get(getContactMessages);
router.route("/:id").get(getContactMessageById);

export default router;