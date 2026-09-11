import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Card } from "../Components/UI/Card";
import { Input } from "../Components/UI/Input";
import { Badge } from "../Components/UI/Badge";
import { useAuth } from "../context/AuthContext";

export const ResetPassword = () => {
    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setSubmitting(true);
        try {
            await resetPassword({ token, password });
            // The backend deletes every session for this user on a successful
            // reset (a deliberate security choice), so there's no session left
            // to log the user into here — they must sign in again with the
            // new password.
            setSuccess(true);
        } catch (err) {
            const message =
                err.response?.data?.error || "Something went wrong. Please try again.";
            setError(message);
        } finally {
            setSubmitting(false);
        }
    };

    if (!token) {
        return (
            <div className="mx-auto max-w-md px-6 py-24 text-center">
                <Badge variant="warning">Invalid link</Badge>
                <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
                    This reset link is missing a token
                </h1>
                <p className="mt-3 text-sm text-slate">
                    Request a new password reset link and try again.
                </p>
                <Button as={Link} to="/forgot-password" variant="primary" size="lg" className="mt-8">
                    Request new link
                </Button>
            </div>
        );
    }

    if (success) {
        return (
            <div className="mx-auto max-w-md px-6 py-24 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky/10 text-sky">
                    ✓
                </div>
                <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
                    Password reset
                </h1>
                <p className="mt-3 text-sm text-slate">
                    Your password has been changed. Please log in with your new
                    password.
                </p>
                <Button
                    variant="primary"
                    size="lg"
                    className="mt-8"
                    onClick={() => navigate("/login", { replace: true })}
                >
                    Go to log in
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
            <Badge variant="sky" className="w-fit">
                Reset your password
            </Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold text-ink">
                Choose a new password
            </h1>

            <Card padding="lg" className="mt-8">
                {error && (
                    <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="grid gap-5">
                    <Input
                        id="password"
                        label="New password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <Input
                        id="confirmPassword"
                        label="Confirm new password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                    <Button type="submit" variant="primary" size="lg" disabled={submitting}>
                        {submitting ? "Resetting..." : "Reset password"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};