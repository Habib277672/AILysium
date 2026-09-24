import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Button } from "../Components/UI/Button";
import { useAuth } from "../context/AuthContext";
import { HiOutlineKey, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            const message = "Passwords do not match.";
            setError(message);
            toast.error(message);
            return;
        }

        setSubmitting(true);
        try {
            await resetPassword({ token, password });
            toast.success("Password reset successfully. Please log in.");
            setSuccess(true);
        } catch (err) {
            const message =
                err.response?.data?.error || "Something went wrong. Please try again.";
            setError(message);
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    if (!token) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-12 text-center sm:px-6 sm:py-16"
            >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 mx-auto">
                    <HiOutlineExclamationCircle className="h-7 w-7" />
                </div>
                <h1 className="mt-5 font-heading text-xl font-bold text-ink sm:text-2xl">
                    This reset link is missing a token
                </h1>
                <p className="mt-2 text-sm text-muted">
                    Request a new password reset link and try again.
                </p>
                <Button as={Link} to="/forgot-password" variant="primary" size="lg" className="mt-8 mx-auto rounded-full cursor-pointer">
                    Request new link
                </Button>
            </motion.div>
        );
    }

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-12 text-center sm:px-6 sm:py-16"
            >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 mx-auto">
                    <HiOutlineCheckCircle className="h-7 w-7" />
                </div>
                <h1 className="mt-5 font-heading text-xl font-bold text-ink sm:text-2xl">
                    Password reset
                </h1>
                <p className="mt-2 text-sm text-muted">
                    Your password has been changed. Please log in with your new
                    password.
                </p>
                <Button
                    variant="primary"
                    size="lg"
                    className="mt-8 mx-auto rounded-full cursor-pointer"
                    onClick={() => navigate("/login", { replace: true })}
                >
                    Go to log in
                </Button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-12 sm:px-6 sm:py-16"
        >
            <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/10 text-sky sm:h-14 sm:w-14">
                    <HiOutlineKey className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h1 className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
                    Choose a new password
                </h1>
                <p className="mt-1 text-sm text-muted">
                    Make sure it's at least 8 characters long.
                </p>
            </div>

            <div className="mt-5 rounded-lg border border-slate/10 bg-white p-5 shadow-xl shadow-ink/5 sm:mt-6 sm:p-8">
                {error && (
                    <div className="mb-5 flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="grid gap-5">
                    <div>
                        <label htmlFor="password" className="block">
                            <span className="mb-2 block text-sm font-medium text-ink">New password</span>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    className="w-full rounded-xl border border-slate/20 bg-white px-4 py-3 pr-11 text-sm text-ink placeholder:text-slate/40 transition-all focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20 focus:shadow-[0_0_0_4px_rgba(0,133,254,0.1)]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate/40 transition-colors hover:text-slate"
                                >
                                    {showPassword ? <HiOutlineEyeOff className="h-4.5 w-4.5" /> : <HiOutlineEye className="h-4.5 w-4.5" />}
                                </button>
                            </div>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block">
                            <span className="mb-2 block text-sm font-medium text-ink">Confirm new password</span>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                    className="w-full rounded-xl border border-slate/20 bg-white px-4 py-3 pr-11 text-sm text-ink placeholder:text-slate/40 transition-all focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20 focus:shadow-[0_0_0_4px_rgba(0,133,254,0.1)]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate/40 transition-colors hover:text-slate"
                                >
                                    {showConfirm ? <HiOutlineEyeOff className="h-4.5 w-4.5" /> : <HiOutlineEye className="h-4.5 w-4.5" />}
                                </button>
                            </div>
                        </label>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={submitting}
                        className="mt-1 w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg shadow-sky/25 transition-all duration-300 hover:shadow-xl hover:shadow-sky/35"
                    >
                        {submitting ? "Resetting..." : "Reset password"}
                    </Button>
                </form>
            </div>
        </motion.div>
    );
};