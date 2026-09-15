import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "../Components/UI/Button";
import { Card } from "../Components/UI/Card";
import { Badge } from "../Components/UI/Badge";

export const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { user, resendVerification } = useAuth();

    const [status, setStatus] = useState("verifying");
    const [error, setError] = useState("");
    const [resendState, setResendState] = useState("idle");
    const hasVerified = useRef(false);

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setError("This verification link is missing a token.");
            return;
        }

        if (hasVerified.current) return;
        hasVerified.current = true;

        const verify = async () => {
            try {
                await api.get(`/auth/verify-email?token=${token}`);
                toast.success("Email verified successfully!");
                setStatus("success");
            } catch (err) {
                const message =
                    err.response?.data?.error ||
                    "This verification link is invalid or has expired.";
                toast.error(message);
                setStatus("error");
                setError(message);
            }
        };
        verify();
    }, [token]);

    const handleResend = async () => {
        if (!user?.email) return;
        setResendState("sending");
        try {
            await resendVerification({ email: user.email });
            toast.success("Verification email sent again.");
        } catch (err) {
            toast.error("Couldn't resend the email. Please try again.");
        } finally {
            setResendState("sent");
        }
    };

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16 text-center">
            <Card padding="lg">
                {status === "verifying" && (
                    <p className="text-sm text-slate">Verifying your email…</p>
                )}

                {status === "success" && (
                    <>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky/10 text-sky">
                            ✓
                        </div>
                        <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
                            Email verified
                        </h1>
                        <p className="mt-3 text-sm text-slate">
                            {user
                                ? "Your email has been verified."
                                : "Your email has been verified. You can now log in to your account."}
                        </p>
                        <Button
                            as={Link}
                            to={user ? "/profile" : "/login"}
                            variant="primary"
                            size="lg"
                            className="mt-6 w-full"
                        >
                            {user ? "Go to my profile" : "Go to log in"}
                        </Button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <Badge variant="warning" className="mx-auto w-fit">
                            Verification failed
                        </Badge>
                        <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
                            {error}
                        </h1>

                        {user ? (
                            <>
                                <p className="mt-3 text-sm text-slate">
                                    This link has expired or was already used. You can
                                    request a new one below.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={resendState !== "idle"}
                                    className="mt-6 w-full rounded-full bg-sky px-6 py-3 text-sm font-medium text-white hover:bg-sky-light disabled:opacity-60"
                                >
                                    {resendState === "sent"
                                        ? "Verification email sent"
                                        : resendState === "sending"
                                            ? "Sending..."
                                            : "Resend verification email"}
                                </button>
                                <Button as={Link} to="/profile" variant="ghost" size="md" className="mt-3 w-full">
                                    Back to profile
                                </Button>
                            </>
                        ) : (
                            <>
                                <p className="mt-3 text-sm text-slate">
                                    If you already have an account, log in and resend the
                                    verification email from your profile. Otherwise, sign up
                                    to create a new account.
                                </p>
                                <Button as={Link} to="/login" variant="primary" size="lg" className="mt-6 w-full">
                                    Go to log in
                                </Button>
                                <Button as={Link} to="/signup" variant="ghost" size="md" className="mt-3 w-full">
                                    Sign up instead
                                </Button>
                            </>
                        )}
                    </>
                )}
            </Card>
        </div>
    );
};