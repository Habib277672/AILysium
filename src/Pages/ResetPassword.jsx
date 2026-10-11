import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Button } from "../Components/UI/Button";
import { ResultBadge } from "../Components/UI/ResultBadge";
import { useAuth } from "../context/AuthContext";
import { HiOutlineKey, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

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
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="flex flex-col items-center"
        >
          <ResultBadge variant="error" />
          <motion.h1
            variants={fadeUp}
            className="font-heading text-ink mt-5 text-xl font-bold sm:text-2xl"
          >
            This reset link is missing a token
          </motion.h1>
          <motion.p variants={fadeUp} className="text-muted mt-2 text-sm">
            Request a new password reset link and try again.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button
              as={Link}
              to="/forgot-password"
              variant="primary"
              size="lg"
              className="mx-auto mt-8 cursor-pointer rounded-full"
            >
              Request new link
            </Button>
          </motion.div>
        </motion.div>
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
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="flex flex-col items-center"
        >
          <ResultBadge variant="success" />
          <motion.h1
            variants={fadeUp}
            className="font-heading text-ink mt-5 text-xl font-bold sm:text-2xl"
          >
            Password reset
          </motion.h1>
          <motion.p variants={fadeUp} className="text-muted mt-2 text-sm">
            Your password has been changed. Please log in with your new
            password.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button
              variant="primary"
              size="lg"
              className="mx-auto mt-8 cursor-pointer rounded-full"
              onClick={() => navigate("/login", { replace: true })}
            >
              Go to log in
            </Button>
          </motion.div>
        </motion.div>
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
        <div className="bg-sky text-cloud mx-auto flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14">
          <HiOutlineKey className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <h1 className="font-heading text-ink mt-2 text-2xl font-extrabold sm:text-3xl">
          Choose a new password
        </h1>
        <p className="text-muted mt-1 text-sm">
          Make sure it's at least 8 characters long.
        </p>
      </div>

      <div className="border-slate/10 shadow-ink/5 mt-5 rounded-lg border bg-white p-5 shadow-xl sm:mt-6 sm:p-8">
        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label htmlFor="password" className="block">
              <span className="text-ink mb-2 block text-sm font-medium">
                New password
              </span>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="border-slate/20 text-ink placeholder:text-slate/40 focus:border-sky focus:ring-sky/20 w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm transition-all focus:shadow-[0_0_0_4px_rgba(0,133,254,0.1)] focus:ring-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate/40 hover:text-slate absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <HiOutlineEye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block">
              <span className="text-ink mb-2 block text-sm font-medium">
                Confirm new password
              </span>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  className="border-slate/20 text-ink placeholder:text-slate/40 focus:border-sky focus:ring-sky/20 w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm transition-all focus:shadow-[0_0_0_4px_rgba(0,133,254,0.1)] focus:ring-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-slate/40 hover:text-slate absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
                >
                  {showConfirm ? (
                    <HiOutlineEyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <HiOutlineEye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
            </label>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={submitting}
            className="shadow-sky/25 hover:shadow-sky/35 mt-1 w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            {submitting ? "Resetting..." : "Reset password"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};
