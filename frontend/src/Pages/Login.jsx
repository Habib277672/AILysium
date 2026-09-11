import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Card } from "../Components/UI/Card";
import { Input } from "../Components/UI/Input";
import { Badge } from "../Components/UI/Badge";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({ email: "", password: "" });
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
            const loggedInUser = await login(form);

            // Admins always land in the admin dashboard — /profile is a
            // student-only page (their own enrollments), which is meaningless
            // for an admin account. `location.state?.from` (set when
            // ProtectedRoute bounces someone to /login) is only honored for
            // non-admins, since an admin should never have been trying to
            // reach a student-only protected page in the first place.
            const destination =
                loggedInUser.role === "ADMIN"
                    ? "/admin"
                    : location.state?.from || "/profile";

            navigate(destination, { replace: true });
        } catch (err) {
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
                Welcome back
            </Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold text-ink">
                Log in to AiLysium
            </h1>
            <p className="mt-2 text-sm text-slate">
                New here?{" "}
                <Link to="/signup" className="font-medium text-sky hover:underline">
                    Create an account
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
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
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
                        <Link
                            to="/forgot-password"
                            className="mt-2 inline-block text-xs font-medium text-sky hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={submitting}
                        className="mt-2"
                    >
                        {submitting ? "Logging in..." : "Log in"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};