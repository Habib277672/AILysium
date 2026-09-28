import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "../Components/UI/Button";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { user, resendVerification } = useAuth();

  const [status, setStatus] = useState(() => (token ? "verifying" : "error"));
  const [error, setError] = useState(() =>
    token ? "" : "This verification link is missing a token.",
  );
  const [resendState, setResendState] = useState("idle");
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!token || hasVerified.current) return;
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
    } catch {
      toast.error("Couldn't resend the email. Please try again.");
    } finally {
      setResendState("sent");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-[70vh] w-full items-center justify-center px-5 py-12 sm:px-6 sm:py-16"
    >
      <div className="border-slate/10 shadow-ink/5 w-full max-w-md rounded-3xl border bg-white p-6 text-center shadow-xl sm:p-8">
        {status === "verifying" && (
          <div className="flex flex-col items-center">
            <div className="relative flex h-14 w-14 items-center justify-center">
              <span className="border-sky/15 border-t-sky absolute inset-0 animate-spin rounded-full border-[3px]" />
              <span className="bg-sky h-2.5 w-2.5 rounded-full" />
            </div>
            <h1 className="font-heading text-ink mt-5 text-xl font-extrabold sm:text-2xl">
              Verifying your email
            </h1>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              Hang tight — this only takes a moment.
            </p>
          </div>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
              <HiOutlineCheckCircle className="h-7 w-7" />
            </div>
            <h1 className="font-heading text-ink mt-4 text-2xl font-extrabold sm:text-3xl">
              Email verified
            </h1>
            <p className="text-muted mx-auto mt-3 max-w-xs text-sm leading-relaxed">
              {user
                ? "Your email has been verified and your account is ready to go."
                : "Your email has been verified. You can now log in to your account."}
            </p>
            <Button
              as={Link}
              to={user ? "/profile" : "/login"}
              variant="primary"
              size="lg"
              className="shadow-sky/25 hover:shadow-sky/35 mt-6 w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {user ? "Go to my profile" : "Go to log in"}
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <HiOutlineExclamationCircle className="h-7 w-7" />
            </div>
            <h1 className="font-heading text-ink mt-4 text-2xl font-extrabold sm:text-3xl">
              Verification failed
            </h1>
            <p className="text-muted mx-auto mt-3 max-w-sm text-sm leading-relaxed">
              {error}
            </p>

            {user ? (
              <>
                <p className="text-muted mt-3 text-sm leading-relaxed">
                  This link has expired or was already used. You can request a
                  new one below.
                </p>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendState !== "idle"}
                  className="bg-sky shadow-sky/25 hover:bg-sky-light mt-6 w-full cursor-pointer rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resendState === "sent"
                    ? "Verification email sent"
                    : resendState === "sending"
                      ? "Sending..."
                      : "Resend verification email"}
                </button>
                <Button
                  as={Link}
                  to="/profile"
                  variant="ghost"
                  size="md"
                  className="mt-3 w-full rounded-full"
                >
                  Back to profile
                </Button>
              </>
            ) : (
              <>
                <p className="text-muted mt-3 text-sm leading-relaxed">
                  If you already have an account, log in and resend the
                  verification email from your profile. Otherwise, sign up to
                  create a new account.
                </p>
                <Button
                  as={Link}
                  to="/login"
                  variant="primary"
                  size="lg"
                  className="shadow-sky/25 hover:shadow-sky/35 mt-6 w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Go to log in
                </Button>
                {/* <Button
                  as={Link}
                  to="/signup"
                  variant="ghost"
                  size="md"
                  className="mt-3 w-full rounded-full"
                >
                  Sign up instead
                </Button> */}
              </>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};
