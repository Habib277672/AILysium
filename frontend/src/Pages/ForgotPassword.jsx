import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import { ResultBadge } from "../Components/UI/ResultBadge";
import { useAuth } from "../context/AuthContext";
import { HiOutlineArrowLeft, HiOutlineKey } from "react-icons/hi";

const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-12 sm:px-6 sm:py-16"
        >
            <div className="text-center">
                <div className="bg-sky text-cloud mx-auto flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14">
                    <HiOutlineKey className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h1 className="font-heading text-ink mt-3 text-2xl font-extrabold sm:text-3xl">
                    Forgot your password?
                </h1>
                <p className="text-muted mt-1 text-sm">
                    Enter your email and we'll send you a reset link.
                </p>
            </div>

            <div className="border-slate/10 shadow-ink/5 mt-5 rounded-lg border bg-white p-5 shadow-xl sm:mt-6 sm:p-8">
                {sent ? (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="flex flex-col items-center gap-3 py-6 text-center"
                    >
                        <ResultBadge variant="success" />
                        <motion.p
                            variants={fadeUp}
                            className="font-heading text-ink text-lg font-bold"
                        >
                            Check your inbox
                        </motion.p>
                        <motion.p
                            variants={fadeUp}
                            className="text-muted max-w-xs text-sm leading-relaxed"
                        >
                            If an account exists for{" "}
                            <strong className="text-ink">{email}</strong>, a password reset
                            link has been sent. It expires in 30 minutes.
                        </motion.p>
                        <motion.div variants={fadeUp}>
                            <Link
                                to="/login"
                                className="text-sky hover:text-sky-light mt-2 text-sm font-semibold transition-colors"
                            >
                                Back to log in
                            </Link>
                        </motion.div>
                    </motion.div>
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
                                className="shadow-sky/25 hover:shadow-sky/35 w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                {submitting ? "Sending..." : "Send reset link"}
                            </Button>
                        </form>

                        <div className="bg-slate/10 my-5 h-px" />

                        <Link
                            to="/login"
                            className="text-muted hover:text-ink flex items-center justify-center gap-1.5 text-sm font-medium transition-colors"
                        >
                            <HiOutlineArrowLeft className="h-4 w-4" />
                            Back to log in
                        </Link>
                    </>
                )}
            </div>
        </motion.div>
    );
};
