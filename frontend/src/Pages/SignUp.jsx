import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../Components/UI/Button";
import { Card } from "../Components/UI/Card";
import { Input } from "../Components/UI/Input";
import { PhoneInput } from "../Components/UI/PhoneInput";
import { Badge } from "../Components/UI/Badge";
import { useAuth } from "../context/AuthContext";

const initialForm = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
};

export const SignUp = () => {
    const { register, resendVerification } = useAuth();

    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState("");
    const [resendState, setResendState] = useState("idle");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (fullNumber) => {
        setForm((prev) => ({ ...prev, phoneNumber: fullNumber }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await register(form);
            toast.success("Account created! Check your email to verify.");
            setRegisteredEmail(form.email);
        } catch (err) {
            const message =
                err.response?.data?.error || "Something went wrong. Please try again.";
            setError(message);
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleResend = async () => {
        setResendState("sending");
        try {
            await resendVerification({ email: registeredEmail });
            toast.success("Verification email sent again.");
        } catch (err) {
            toast.error("Couldn't resend the email. Please try again.");
        } finally {
            setResendState("sent");
        }
    };

    if (registeredEmail) {
        return (
            <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16 text-center">
                <Card padding="lg">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky/10 text-sky">
                        ✓
                    </div>
                    <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
                        Check your email
                    </h1>
                    <p className="mt-3 text-sm text-slate">
                        We sent a verification link to{" "}
                        <strong>{registeredEmail}</strong>. Verify your email, then log
                        in to access your account.
                    </p>

                    <Button as={Link} to="/login" variant="primary" size="lg" className="mt-6 w-full">
                        Go to log in
                    </Button>

                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendState !== "idle"}
                        className="mt-4 text-sm font-medium text-sky hover:underline disabled:text-slate/50 disabled:no-underline"
                    >
                        {resendState === "sent"
                            ? "Verification email sent"
                            : resendState === "sending"
                                ? "Sending..."
                                : "Didn't get it? Resend verification email"}
                    </button>
                </Card>
            </div>
        );
    }

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
                    <PhoneInput
                        label="Phone number"
                        value={form.phoneNumber}
                        onChange={handlePhoneChange}
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
                        <p className="mt-1.5 text-xs text-slate">At least 8 characters.</p>
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