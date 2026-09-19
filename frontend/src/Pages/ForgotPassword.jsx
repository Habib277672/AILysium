import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import { useAuth } from "../context/AuthContext";
import { HiOutlineArrowLeft, HiOutlineKey, HiOutlineCheckCircle } from "react-icons/hi";

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
            toast.success("Reset link sent — check your email.");
            setSent(true);
        } catch (err) {
            const message =
                err.response?.data?.error || "Something went wrong. Please try again.";
            setError(message);
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-12 sm:px-6 sm:py-16">
            <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/10 text-sky sm:h-14 sm:w-14">
                    <HiOutlineKey className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h1 className="mt-3 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
                    Forgot your password?
                </h1>
                <p className="mt-1 text-sm text-muted">
                    Enter your email and we'll send you a reset link.
                </p>
            </div>

            <div className="mt-5 rounded-lg border border-slate/10 bg-white p-5 shadow-xl shadow-ink/5 sm:mt-6 sm:p-8">
                {sent ? (
                    <div className="flex flex-col items-center gap-3 py-6 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                            <HiOutlineCheckCircle className="h-7 w-7" />
                        </div>
                        <p className="font-heading text-lg font-bold text-ink">
                            Check your inbox
                        </p>
                        <p className="max-w-xs text-sm leading-relaxed text-muted">
                            If an account exists for <strong className="text-ink">{email}</strong>, a password
                            reset link has been sent. It expires in 30 minutes.
                        </p>
                        <Link to="/login" className="mt-2 text-sm font-semibold text-sky transition-colors hover:text-sky-light">
                            Back to log in
                        </Link>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit} className="grid gap-5">
                            {error && (
                                <div className="flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
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
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                disabled={submitting}
                                className="w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg shadow-sky/25 transition-all duration-300 hover:shadow-xl hover:shadow-sky/35"
                            >
                                {submitting ? "Sending..." : "Send reset link"}
                            </Button>
                        </form>

                        <div className="my-5 h-px bg-slate/10" />

                        <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink">
                            <HiOutlineArrowLeft className="h-4 w-4" />
                            Back to log in
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};