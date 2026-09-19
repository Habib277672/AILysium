import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "../Components/UI/Button";
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineCalendar, HiOutlineExclamationCircle, HiOutlineAcademicCap, HiOutlineArrowRight, HiOutlineLogout } from "react-icons/hi";

const paymentBadgeStyles = {
    PENDING: "bg-amber-50 text-amber-600",
    CONFIRMED: "bg-emerald-50 text-emerald-600",
    FAILED: "bg-red-50 text-red-600",
};

const paymentDotStyles = {
    PENDING: "bg-amber-500",
    CONFIRMED: "bg-emerald-500",
    FAILED: "bg-red-500",
};

export const Profile = () => {
    const { user, resendVerification, logout } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [resendState, setResendState] = useState("idle");

    useEffect(() => {
        const loadEnrollments = async () => {
            try {
                const { data } = await api.get("/me/enrollments");
                setEnrollments(data);
            } catch (err) {
                setError("Couldn't load your enrollments. Please try refreshing.");
            } finally {
                setLoading(false);
            }
        };
        loadEnrollments();
    }, []);

    const handleResend = async () => {
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

    if (!user) return null;

    const initials = user.fullName?.split(" ").map(n => n.charAt(0)).join("").toUpperCase().slice(0, 2);

    return (
        <div>
            <div className="mx-auto max-w-4xl px-6 py-10">
                {/* Email verification alert */}
                {!user.emailVerifiedAt && (
                    <div className="mb-8 rounded-2xl border border-amber-200/50 bg-amber-50 px-6 py-4">
                        <div className="flex items-start gap-3">
                            <HiOutlineExclamationCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                            <div className="flex-1">
                                <p className="text-sm text-amber-700">
                                    Your email isn't verified yet. You'll need to verify before you can enroll in a course.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={resendState !== "idle"}
                                    className="mt-2 text-sm font-medium text-amber-800 underline decoration-amber-300 underline-offset-2 transition-colors hover:text-amber-900 disabled:no-underline disabled:opacity-50"
                                >
                                    {resendState === "sent"
                                        ? "Verification email sent"
                                        : resendState === "sending"
                                            ? "Sending..."
                                            : "Resend verification email"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Account details */}
                <div className="rounded-3xl border border-slate/10 bg-white p-5 shadow-sm sm:p-7">
                    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                        <div className="relative shrink-0">
                            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-sky/20 to-sky-light/20 blur-sm" />
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-light text-xl font-bold text-white ring-4 ring-white shadow-lg shadow-sky/25 sm:h-20 sm:w-20 sm:text-2xl">
                                {initials}
                            </div>
                        </div>
                        <div className="min-w-0 flex-1 text-center sm:text-left">
                            <h2 className="truncate font-heading text-xl font-bold text-ink sm:text-2xl">
                                {user.fullName}
                            </h2>
                            <div className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted sm:justify-start">
                                <HiOutlineMail className="h-4 w-4 shrink-0" />
                                <span className="truncate">{user.email}</span>
                            </div>
                            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                                {user.emailVerifiedAt ? (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Verified
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/60 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                        Unverified
                                    </span>
                                )}
                                <span className="rounded-full border border-sky/15 bg-sky/8 px-3 py-1 text-xs font-semibold text-sky">
                                    {user.role}
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-red-200/60 bg-transparent px-5 py-2.5 text-sm font-medium text-red-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                            onClick={logout}
                        >
                            <HiOutlineLogout className="h-4 w-4" />
                            Logout
                        </button>
                    </div>

                    <div className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                        <div className="flex items-center gap-3 rounded-xl border border-slate/10 px-3.5 py-3 transition-colors hover:border-sky/15 hover:bg-sky/[0.02] sm:gap-3.5 sm:px-4 sm:py-3.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky sm:h-9 sm:w-9">
                                <HiOutlineUser className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted/70">Full name</p>
                                <p className="mt-0.5 truncate text-sm font-semibold text-ink">{user.fullName}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-slate/10 px-3.5 py-3 transition-colors hover:border-sky/15 hover:bg-sky/[0.02] sm:gap-3.5 sm:px-4 sm:py-3.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky sm:h-9 sm:w-9">
                                <HiOutlineMail className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted/70">Email</p>
                                <p className="mt-0.5 truncate text-sm font-semibold text-ink">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-slate/10 px-3.5 py-3 transition-colors hover:border-sky/15 hover:bg-sky/[0.02] sm:gap-3.5 sm:px-4 sm:py-3.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky sm:h-9 sm:w-9">
                                <HiOutlinePhone className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted/70">Phone number</p>
                                <p className="mt-0.5 truncate text-sm font-semibold text-ink">{user.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-slate/10 px-3.5 py-3 transition-colors hover:border-sky/15 hover:bg-sky/[0.02] sm:gap-3.5 sm:px-4 sm:py-3.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky sm:h-9 sm:w-9">
                                <HiOutlineCalendar className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted/70">Member since</p>
                                <p className="mt-0.5 text-sm font-semibold text-ink">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enrollments */}
                <div className="mt-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                                <HiOutlineAcademicCap className="h-5 w-5" />
                            </div>
                            <h2 className="font-heading text-lg font-bold text-ink">
                                My enrollments
                            </h2>
                        </div>
                        <Button as={Link} to="/courses" variant="outline" size="sm" className="rounded-full cursor-pointer">
                            Browse courses
                        </Button>
                    </div>

                    {loading && (
                        <div className="mt-6 space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate/5" />
                            ))}
                        </div>
                    )}

                    {!loading && error && (
                        <div className="mt-5 rounded-2xl border border-red-200/50 bg-red-50 px-5 py-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {!loading && !error && enrollments.length === 0 && (
                        <div className="mt-6 rounded-3xl border border-dashed border-slate/20 bg-white py-14 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate/5 text-muted">
                                <HiOutlineAcademicCap className="h-7 w-7" />
                            </div>
                            <p className="mt-4 text-sm text-muted">
                                You haven't enrolled in any programs yet.
                            </p>
                            <Button as={Link} to="/courses" variant="primary" size="md" className="mt-5 rounded-full cursor-pointer">
                                Explore programs
                            </Button>
                        </div>
                    )}

                    {!loading && !error && enrollments.length > 0 && (
                        <div className="mt-5 space-y-2.5">
                            {enrollments.map((enrollment) => (
                                <div
                                    key={enrollment.id}
                                    to={enrollment.paymentStatus === "PENDING" ? `/payment?enrollmentId=${enrollment.id}` : "#"}
                                    className={`group flex flex-col gap-3 rounded-2xl border border-slate/10 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:border-sky/15 hover:shadow-md hover:shadow-sky/5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${enrollment.paymentStatus === "PENDING" ? "cursor-pointer border-l-2 border-l-amber-400" : "border-l-2 border-l-emerald-400"}`}
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky/10 text-sky">
                                            <HiOutlineAcademicCap className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate font-heading text-sm font-semibold text-ink">
                                                {enrollment.course.title}
                                            </p>
                                            <p className="mt-0.5 text-xs text-muted">
                                                Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5 pl-[3.25rem] sm:pl-0">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${paymentBadgeStyles[enrollment.paymentStatus]}`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${paymentDotStyles[enrollment.paymentStatus]}`} />
                                            {enrollment.paymentStatus}
                                        </span>
                                        {enrollment.paymentStatus === "PENDING" && (
                                            <span className="inline-flex items-center gap-1 text-sm font-medium text-sky transition-colors group-hover:text-sky-light">
                                                Pay now
                                                <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
