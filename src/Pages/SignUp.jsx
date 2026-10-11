import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import { PhoneInput } from "../Components/UI/PhoneInput";
import { ResultBadge } from "../Components/UI/ResultBadge";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineArrowLeft,
  HiOutlineUserAdd,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

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
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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
    } catch {
      toast.error("Couldn't resend the email. Please try again.");
    } finally {
      setResendState("sent");
    }
  };

  if (registeredEmail) {
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
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12, delayChildren: 0.05 },
            },
          }}
          className="border-slate/10 shadow-ink/5 rounded-lg border bg-white p-6 shadow-xl sm:p-8"
        >
          <ResultBadge variant="success" />
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="font-heading text-ink mt-5 text-2xl font-extrabold sm:text-3xl"
          >
            Check your email
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="text-muted mt-3 text-sm leading-relaxed"
          >
            We sent a verification link to{" "}
            <strong className="text-ink">{registeredEmail}</strong>. Verify your
            email, then log in to access your account.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <Button
              as={Link}
              to="/login"
              variant="primary"

              className="shadow-sky/25 mt-6 w-full cursor-pointer rounded-full py-2 text-base font-semibold shadow-lg"
            >
              Go to log in
            </Button>

            <button
              type="button"
              onClick={handleResend}
              disabled={resendState !== "idle"}
              className="text-sky hover:text-sky-light disabled:text-slate/50 mt-4 text-sm font-medium transition-colors hover:underline disabled:no-underline"
            >
              {resendState === "sent"
                ? "Verification email sent"
                : resendState === "sending"
                  ? "Sending..."
                  : "Didn't get it? Resend verification email"}
            </button>
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
          <HiOutlineUserAdd className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <h1 className="font-heading text-ink mt-3 text-2xl font-extrabold sm:text-3xl">
          Create your account
        </h1>
        <p className="text-muted mt-1 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky hover:text-sky-light font-semibold transition-colors"
          >
            Log in
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
            label="Phone number ( whatsapp )"
            value={form.phoneNumber}
            onChange={handlePhoneChange}
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
            <p className="text-muted mt-1.5 text-xs">At least 8 characters.</p>
          </div>

          <label
            htmlFor="acceptedTerms"
            className="border-slate/10 hover:border-sky/30 flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors"
          >
            <input
              id="acceptedTerms"
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="text-sky focus:ring-sky/20 accent-sky mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded"
            />
            <span className="text-muted text-xs leading-relaxed">
              I accept the{" "}
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
            </span>
          </label>

          <Button
            type="submit"
            variant="primary"
            disabled={submitting || !acceptedTerms}
            className="shadow-sky/25 hover:shadow-sky/35 mt-1 w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            {submitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

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
