import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import { PhoneInput } from "../Components/UI/PhoneInput";
import { useAuth } from "../context/AuthContext";
import { HiOutlineArrowLeft, HiOutlineUserAdd, HiOutlineCheckCircle, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

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
            <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-12 text-center sm:px-6 sm:py-16">
                <div className="rounded-3xl border border-slate/10 bg-white p-6 shadow-xl shadow-ink/5 sm:p-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                        <HiOutlineCheckCircle className="h-7 w-7" />
                    </div>
                    <h1 className="mt-4 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
                        Check your email
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                        We sent a verification link to{" "}
                        <strong className="text-ink">{registeredEmail}</strong>. Verify your email, then log
                        in to access your account.
                    </p>

                    <Button as={Link} to="/login" variant="primary" size="lg" className="mt-6 w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg shadow-sky/25">
                        Go to log in
                    </Button>

                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendState !== "idle"}
                        className="mt-4 text-sm font-medium text-sky transition-colors hover:text-sky-light hover:underline disabled:text-slate/50 disabled:no-underline"
                    >
                        {resendState === "sent"
                            ? "Verification email sent"
                            : resendState === "sending"
                                ? "Sending..."
                                : "Didn't get it? Resend verification email"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-12 sm:px-6 sm:py-16">
            <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/10 text-sky sm:h-14 sm:w-14">
                    <HiOutlineUserAdd className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h1 className="mt-3 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
                    Create your account
                </h1>
                <p className="mt-1 text-sm text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-sky transition-colors hover:text-sky-light">
                        Log in
                    </Link>
                </p>
            </div>

            <div className="mt-5 rounded-lg border border-slate/10 bg-white p-5 shadow-xl shadow-ink/5 sm:mt-6 sm:p-8">
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
                            <span className="mb-2 block text-sm font-medium text-ink">Password</span>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
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
                        <p className="mt-1.5 text-xs text-muted">At least 8 characters.</p>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={submitting}
                        className="mt-1 w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg shadow-sky/25 transition-all duration-300 hover:shadow-xl hover:shadow-sky/35"
                    >
                        {submitting ? "Creating account..." : "Create account"}
                    </Button>
                </form>

                <div className="my-5 h-px bg-slate/10" />

                <Link to="/" className="flex items-center justify-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink">
                    <HiOutlineArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>
            </div>
        </div>
    );
};