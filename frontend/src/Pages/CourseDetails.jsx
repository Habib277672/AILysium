import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { CourseDetailsSkeleton } from "../Components/UI/CourseDetailsSkeleton";
import { HiOutlineChevronLeft, HiOutlineClock, HiOutlineUser, HiOutlineCheckCircle, HiOutlineCollection, HiOutlineDocumentText, HiOutlineStatusOffline } from "react-icons/hi";

const statusLabel = {
    AVAILABLE: "Available",
    COMING_SOON: "Coming Soon",
};

export const CourseDetails = () => {
    const { slug } = useParams();
    const { user, loading: authLoading } = useAuth();
    const isAdmin = user?.role === "ADMIN";

    const [course, setCourse] = useState(null);
    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);

        const loadCourse = async () => {
            try {
                const { data: courseData } = await api.get(`/courses/${slug}`);
                setCourse(courseData);

                // Only check enrollment status for a logged-in, non-admin user
                // — an anonymous visitor can't be enrolled in anything, and
                // admins can never enroll at all.
                if (user && !isAdmin) {
                    try {
                        const { data: enrollments } = await api.get("/me/enrollments");
                        const match = enrollments.find((e) => e.course.id === courseData.id);
                        setEnrollment(match ?? null);
                    } catch {
                        // Non-fatal — the course details still render fine
                        // even if this secondary call fails.
                        setEnrollment(null);
                    }
                }
            } catch (err) {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        loadCourse();
    }, [slug, user, isAdmin]);

    if (loading) {
        return <CourseDetailsSkeleton />;
    }

    if (notFound || !course) {
        return (
            <div className="mx-auto max-w-3xl px-6 py-24 text-center">
                <Badge variant="warning">Not found</Badge>
                <h1 className="mt-4 font-heading text-3xl font-bold text-ink">
                    We couldn't find that program
                </h1>
                <p className="mt-3 text-slate">
                    It may have been renamed or is no longer listed. Browse all current
                    programs instead.
                </p>
                <Button as={Link} to="/courses" variant="primary" size="lg" className="mt-8">
                    View all programs
                </Button>
            </div>
        );
    }

    const isAvailable = course.status === "AVAILABLE";
    const isEnrolled = Boolean(enrollment);
    const isFullyEnrolled = isEnrolled && enrollment.paymentStatus === "CONFIRMED";

    // Pending enrollment -> straight to finishing payment, not back through
    // /enroll (they've already enrolled, no need to redo that step).
    // Anyone else -> normal enroll-or-login routing.
    const enrollHref = isEnrolled
        ? `/payment?enrollmentId=${enrollment.id}`
        : !authLoading && user
            ? `/enroll/${course.id}`
            : "/login";

    // Only a CONFIRMED enrollment makes this CTA truly inert — a PENDING
    // one still has a real next step (pay), so it must stay clickable.
    const enrollDisabled = isAdmin || isFullyEnrolled || (!isEnrolled && !isAvailable);

    const enrollLabel = isAdmin
        ? "Admin accounts can't enroll"
        : isFullyEnrolled
            ? "Already enrolled"
            : isEnrolled
                ? "Complete payment"
                : isAvailable
                    ? "Enroll now"
                    : "Coming Soon";

    // Rendering as a real <button disabled> (not as={Link}) when disabled
    // is the actual fix for click-blocking: an <a> tag has no native
    // "disabled" state in HTML, so a disabled Link still navigates if
    // clicked — only a genuine disabled <button> is truly unclickable.
    const enrollButtonProps = enrollDisabled
        ? { as: "button", type: "button", disabled: true }
        : { as: Link, to: enrollHref };

    return (
        <div>
            {/* Hero */}
            <section className="relative overflow-hidden  min-h-[28rem] md:min-h-[34rem]">
                {/* Background image */}
                {course.imageUrl ? (
                    <>

                        <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="absolute inset-0 hidden h-full w-full object-cover sm:block"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/99 to-transparent w-[82%]" />
                        <div className="pointer-events-none absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-sky-light/20 blur-[120px]" />
                        <div className="pointer-events-none absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-sky-light/20 blur-[120px]" />
                        <div className="pointer-events-none absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-sky/20 blur-[120px]" />
                    </>

                ) : (
                    <div className="absolute inset-0 bg-cloud" />
                )}


                <div className="relative mx-auto max-w-6xl px-6 mt-10 py-16 md:py-20">
                    <Link to="/courses" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-sky transition-colors hover:text-sky-light">
                        <HiOutlineChevronLeft className="h-4 w-4" />
                        All programs
                    </Link>

                    <div className="mt-5 max-w-xl">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-amber-500"}`} />
                                {statusLabel[course.status]}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm text-slate-600">
                                <HiOutlineClock className="h-4 w-4" />
                                {course.duration}
                            </span>
                            {course.ageRange && (
                                <span className="flex items-center gap-1.5 text-sm text-slate-600">
                                    <HiOutlineUser className="h-4 w-4" />
                                    Ages {course.ageRange}
                                </span>
                            )}
                            {isEnrolled && (
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${enrollment.paymentStatus === "CONFIRMED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                    {enrollment.paymentStatus === "CONFIRMED" ? "Enrolled" : "Pending"}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-3 font-heading text-3xl font-bold leading-snug text-ink drop-shadow-sm md:text-[2.75rem] md:leading-tight">
                            {course.title}
                        </h1>
                        <p className="mt-2 max-w-lg text-base leading-relaxed text-slate-600">
                            {course.description}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <Button variant="primary" size="md" className="rounded-full px-6 shadow-lg shadow-sky/30 hover:shadow-sky/50" {...enrollButtonProps}>
                                {enrollLabel}
                            </Button>
                            <Button
                                as="a"
                                href="https://wa.me/12345678900"
                                target="_blank"
                                rel="noreferrer"
                                variant="outline"
                                size="md"
                                className="rounded-full border-slate/30 text-ink hover:border-ink hover:bg-ink/5"
                            >
                                Ask on WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="relative bg-white py-24 md:py-28">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid items-start gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
                        <div className="space-y-8">
                            {course.benefits.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                                            <HiOutlineCheckCircle className="h-5 w-5" />
                                        </div>
                                        <h2 className="font-heading text-xl font-bold text-ink">
                                            What you'll get
                                        </h2>
                                    </div>
                                    <ul className="mt-3 space-y-2">
                                        {course.benefits.map((benefit) => (
                                            <li key={benefit} className="flex items-start gap-3 rounded-xl px-4 py-2.5 text-sm text-muted transition-colors hover:bg-slate/5">
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky/10 text-xs font-bold text-sky">
                                                    ✓
                                                </span>
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {course.toolsCovered.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                                            <HiOutlineCollection className="h-5 w-5" />
                                        </div>
                                        <h2 className="font-heading text-xl font-bold text-ink">
                                            Tools you'll use
                                        </h2>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {course.toolsCovered.map((tool) => (
                                            <span key={tool} className="rounded-full bg-slate/5 px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-sky/10 hover:text-sky">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                                        <HiOutlineDocumentText className="h-5 w-5" />
                                    </div>
                                    <h2 className="font-heading text-xl font-bold text-ink">
                                        Format
                                    </h2>
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-muted">{course.format}</p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <div className="rounded-3xl border border-slate/15 bg-white p-7">
                                <p className="text-sm text-muted">Starting from</p>
                                <p className="mt-1 font-heading text-3xl font-bold text-ink">
                                    PKR {course.price.toLocaleString()}
                                </p>
                                <div className="mt-6 space-y-3 border-t border-slate/10 pt-6 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-muted">
                                            <HiOutlineClock className="h-4 w-4 text-sky/60" />
                                            Duration
                                        </span>
                                        <span className="font-medium text-ink">{course.duration}</span>
                                    </div>
                                    {course.mentor && (
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-2 text-muted">
                                                <HiOutlineUser className="h-4 w-4 text-sky/60" />
                                                Mentor
                                            </span>
                                            <span className="font-medium text-ink">{course.mentor}</span>
                                        </div>
                                    )}
                                    {course.projectsCount != null && (
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-2 text-muted">
                                                <HiOutlineCollection className="h-4 w-4 text-sky/60" />
                                                Projects
                                            </span>
                                            <span className="font-medium text-ink">{course.projectsCount}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-muted">
                                            <HiOutlineStatusOffline className="h-4 w-4 text-sky/60" />
                                            Status
                                        </span>
                                        <span className="font-medium text-ink">{statusLabel[course.status]}</span>
                                    </div>
                                </div>
                                <Button variant="primary" size="md" className="mt-6 w-full rounded-full px-6" {...enrollButtonProps}>
                                    {enrollLabel}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};