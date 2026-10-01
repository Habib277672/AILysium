import { Router } from "express";
import { submitContactMessage } from "../controllers/contact.controller.js";

const router = Router();

router.route("/").post(submitContactMessage);

export default router;