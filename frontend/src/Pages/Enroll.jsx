import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "../Components/UI/Button";
import { HiOutlineExclamationCircle, HiOutlineClock, HiOutlineUser, HiOutlineCheckCircle, HiOutlineArrowLeft } from "react-icons/hi";

export const Enroll = () => {
    const { user } = useAuth();
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                const { data } = await api.get("/courses");
                const match = data.find((c) => c.id === courseId);
                if (!match) {
                    setError("This course could not be found or is no longer available.");
                } else {
                    setCourse(match);
                }
            } catch (err) {
                setError("Something went wrong loading this course.");
            } finally {
                setLoading(false);
            }
        };
        loadCourse();
    }, [courseId]);

    const handleConfirm = async () => {
        setSubmitting(true);
        setError("");

        try {
            const { data: enrollment } = await api.post("/enrollments", { courseId });
            toast.success("Enrollment started — continue to payment.");
            navigate(`/payment?enrollmentId=${enrollment.id}`, { replace: true });
        } catch (err) {
            const message =
                err.response?.data?.error || "Couldn't start enrollment. Please try again.";
            setError(message);
            toast.error(message);
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-2xl px-6 py-24 text-center text-sm text-slate">
                Loading…
            </div>
        );
    }

    if (!course) {
        return (
            <div className="mx-auto max-w-2xl px-6 py-24 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                    <HiOutlineExclamationCircle className="h-7 w-7" />
                </div>
                <h1 className="mt-5 font-heading text-2xl font-bold text-ink">
                    {error || "This course could not be found."}
                </h1>
                <Button as={Link} to="/courses" variant="primary" size="lg" className="mt-8 rounded-full cursor-pointer">
                    Browse courses
                </Button>
            </div>
        );
    }

    const isAvailable = course.status === "AVAILABLE";
    const isVerified = Boolean(user?.emailVerifiedAt);

    return (
        <div>
            {/* Hero */}
            <section className="relative overflow-hidden bg-cloud py-14 md:py-20">
                <div className="pointer-events-none absolute top-0 left-0 h-48 w-full bg-gradient-to-b from-white via-white/80 to-transparent" />
                <div className="pointer-events-none absolute top-1/2 left-0 h-150 w-150 -translate-y-1/2 -translate-x-1/3 rounded-full bg-sky/15 blur-[160px]" />
                <div className="pointer-events-none absolute top-1/2 right-0 h-150 w-150 -translate-y-1/2 translate-x-1/3 rounded-full bg-sky-light/15 blur-[160px]" />

                <div className="relative mx-auto max-w-2xl px-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-light text-white shadow-lg shadow-sky/25 sm:h-16 sm:w-16">
                        <HiOutlineCheckCircle className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <h1 className="mt-4 font-heading text-2xl font-extrabold leading-tight text-ink sm:text-3xl md:text-4xl">
                        Confirm your{" "}
                        <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                            enrollment
                        </span>
                    </h1>
                    <p className="mt-2 max-w-md mx-auto text-sm leading-relaxed text-muted sm:text-base">
                        Review the details below before continuing to payment.
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
                {/* Course card */}
                <div className="rounded-3xl border border-slate/10 bg-white p-5 shadow-xl shadow-ink/5 sm:p-8">
                    {/* Header */}
                    <div className="text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky/8 px-3 py-1 text-xs font-semibold text-sky">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                            {isAvailable ? "Enrollment open" : "Coming soon"}
                        </span>
                        <h2 className="mt-4 font-heading text-xl font-bold text-ink sm:text-2xl md:text-3xl">
                            {course.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                            {course.description}
                        </p>
                    </div>

                    {/* Details row */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm sm:gap-6">
                        <div className="flex items-center gap-2 text-ink">
                            <HiOutlineClock className="h-4 w-4 text-sky" />
                            <span className="font-medium">{course.duration}</span>
                        </div>
                        {course.ageRange && (
                            <>
                                <div className="hidden h-4 w-px bg-slate/15 sm:block" />
                                <div className="flex items-center gap-2 text-ink">
                                    <HiOutlineUser className="h-4 w-4 text-sky" />
                                    <span className="font-medium">Ages {course.ageRange}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="my-6 h-px bg-slate/10 sm:my-7" />

                    {/* Price */}
                    <div className="text-center">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted/60">Price</p>
                        <p className="mt-1 font-heading text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                            PKR {course.price.toLocaleString()}
                        </p>
                    </div>

                    {/* Alerts */}
                    {!isVerified && (
                        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3">
                            <HiOutlineExclamationCircle className="h-5 w-5 shrink-0 text-amber-500" />
                            <p className="text-sm text-amber-700">
                                Verify your email first.{" "}
                                <Link to="/profile" className="font-semibold underline decoration-amber-300 underline-offset-2 transition-colors hover:text-amber-800">
                                    Resend
                                </Link>
                            </p>
                        </div>
                    )}

                    {!isAvailable && (
                        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3">
                            <HiOutlineExclamationCircle className="h-5 w-5 shrink-0 text-amber-500" />
                            <p className="text-sm text-amber-700">
                                This program isn't open for enrollment yet.
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3">
                            <HiOutlineExclamationCircle className="h-5 w-5 shrink-0 text-red-500" />
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* CTA */}
                    <Button
                        variant="primary"
                        size="lg"
                        className="mt-6 w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg shadow-sky/25 transition-all duration-300 hover:shadow-xl hover:shadow-sky/35"
                        onClick={handleConfirm}
                        disabled={!isAvailable || submitting || !isVerified}
                    >
                        {submitting ? "Enrolling..." : "Continue to payment →"}
                    </Button>

                    <Link
                        to="/courses"
                        className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-sky"
                    >
                        <HiOutlineArrowLeft className="h-4 w-4" />
                        Back to courses
                    </Link>
                </div>
            </div>
        </div>
    );
};
