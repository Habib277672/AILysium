import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Card } from "../Components/UI/Card";
import { Input } from "../Components/UI/Input";
import { Badge } from "../Components/UI/Badge";
import { useAuth } from "../context/AuthContext";

const initialForm = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
};

export const SignUp = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await register(form);
            // Registration also creates a session server-side (createSession in
            // auth.controller.js), so the user is already logged in at this
            // point — same destination as a successful login.
            navigate("/profile", { replace: true });
        } catch (err) {
            // Covers both zod validation errors (400) and "email already
            // exists" (409) — both come back as { error: "message" } from the
            // backend's centralized error handler.
            const message =
                err.response?.data?.error || "Something went wrong. Please try again.";
            setError(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
            <Badge variant="sky" className="w-fit">
                Get started
            </Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold text-ink">
                Create your AiLysium account
            </h1>
            <p className="mt-2 text-sm text-slate">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-sky hover:underline">
                    Log in
                </Link>
            </p>

            <Card padding="lg" className="mt-8">
                {error && (
                    <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="grid gap-5">
                    <Input
                        id="fullName"
                        label="Full name"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        id="phoneNumber"
                        label="Phone number"
                        type="tel"
                        placeholder="+923001234567"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    <div>
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <p className="mt-1.5 text-xs text-slate">
                            At least 8 characters.
                        </p>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={submitting}
                        className="mt-2"
                    >
                        {submitting ? "Creating account..." : "Create account"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};