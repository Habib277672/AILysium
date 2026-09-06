import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import coursesRouter from "./routes/courses.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import enrollmentRouter from "./routes/enrollment.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import adminRouter from "./routes/admin.routes.js";
import adminCoursesRouter from "./routes/admin.courses.routes.js";
import { verifyAuthentication } from "./middlewares/verify.middleware.js";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(verifyAuthentication);

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api/courses", coursesRouter);
app.use("/api/auth", authRouter);
app.use("/api/me", userRouter);
app.use("/api/enrollments", enrollmentRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin/courses", adminCoursesRouter);

app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({
        error: err.message || "Internal server error",
    });
});

export default app;