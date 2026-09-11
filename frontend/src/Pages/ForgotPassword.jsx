import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Card } from "../Components/UI/Card";
import { Input } from "../Components/UI/Input";
import { Badge } from "../Components/UI/Badge";
import { useAuth } from "../context/AuthContext";

export const ForgotPassword = () => {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await forgotPassword({ email });
            // Backend always returns the same success message whether or not
            // the account exists — this page mirrors that by always showing
            // the "sent" state on a successful request, never revealing
            // whether the email was actually registered.
            setSent(true);
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
                Reset your password
            </Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold text-ink">
                Forgot your password?
            </h1>
            <p className="mt-2 text-sm text-slate">
                <Link to="/login" className="font-medium text-sky hover:underline">
                    Back to log in
                </Link>
            </p>

            <Card padding="lg" className="mt-8">
                {sent ? (
                    <div className="flex flex-col items-center gap-3 py-6 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky/10 text-sky">
                            ✓
                        </div>
                        <p className="font-heading text-lg font-semibold text-ink">
                            Check your inbox
                        </p>
                        <p className="text-sm text-slate">
                            If an account exists for <strong>{email}</strong>, a password
                            reset link has been sent. It expires in 30 minutes.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid gap-5">
                        {error && (
                            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </p>
                        )}
                        <Input
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
                            {submitting ? "Sending..." : "Send reset link"}
                        </Button>
                    </form>
                )}
            </Card>
        </div>
    );
};