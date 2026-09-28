import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineArrowLeft,
  HiOutlineLogin,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      toast.success(`Welcome back, ${loggedInUser.fullName.split(" ")[0]}!`);

      const destination =
        loggedInUser.role === "ADMIN"
          ? "/admin"
          : location.state?.from || "/profile";

      navigate(destination, { replace: true });
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
        <div className="bg-sky/10 text-sky mx-auto flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14">
          <HiOutlineLogin className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <h1 className="font-heading text-ink mt-3 text-2xl font-extrabold sm:text-3xl">
          Welcome back
        </h1>
        <p className="text-muted mt-1 text-sm">
          New here?{" "}
          <Link
            to="/signup"
            className="text-sky hover:text-sky-light font-semibold transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>

      <div className="border-slate/10 shadow-ink/5 mt-5 rounded-lg border bg-white p-5 shadow-xl sm:mt-6 sm:p-8">
        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
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
            <label htmlFor="password" className="block">
              <span className="text-ink mb-2 block text-sm font-medium">
                Password
              </span>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
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
            <div className="mt-2 flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sky hover:text-sky-light text-xs font-medium transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={submitting}
            className="shadow-sky/25 hover:shadow-sky/35 w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            {submitting ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <p className="text-muted mt-4 text-center text-xs leading-relaxed">
          By continuing, you agree to our{" "}
          <Link
            to="/terms-and-conditions"
            className="text-sky hover:text-sky-light font-medium transition-colors hover:underline"
          >
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy-policy"
            className="text-sky hover:text-sky-light font-medium transition-colors hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div className="bg-slate/10 my-5 h-px" />

        <Link
          to="/"
          className="text-muted hover:text-ink flex items-center justify-center gap-1.5 text-sm font-medium transition-colors"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </motion.div>
  );
};
