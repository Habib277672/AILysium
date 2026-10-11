import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useCourseDetails } from "../hooks/useCourses";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { CourseDetailsSkeleton } from "../Components/UI/CourseDetailsSkeleton";
import { HiOutlineChevronLeft, HiOutlineClock, HiOutlineUser, HiOutlineCheckCircle, HiOutlineCollection, HiOutlineDocumentText, HiOutlineStatusOffline } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const statusLabel = {
    AVAILABLE: "Available",
    COMING_SOON: "Coming Soon",
};

export const CourseDetails = () => {
    const { slug } = useParams();
    const { user, loading: authLoading } = useAuth();
    const isAdmin = user?.role === "ADMIN";

    const {
        data: course,
        isLoading: courseLoading,
        isError: courseNotFound,
    } = useCourseDetails(slug);

    // Only fetches for a logged-in, non-admin user, and only once the
    // course itself has resolved (needs course.id to find a match) — same
    // conditions the original useEffect version checked.
    const { data: enrollments = [] } = useQuery({
        queryKey: ["me", "enrollments"],
        queryFn: async () => {
            const { data } = await api.get("/me/enrollments");
            return data;
        },
        enabled: Boolean(user) && !isAdmin && Boolean(course),
    });

    const enrollment = course
        ? enrollments.find((e) => e.course.id === course.id) ?? null
        : null;

    if (courseLoading) {
        return <CourseDetailsSkeleton />;
    }

    if (courseNotFound || !course) {
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
    const isFullyEnrolled = isEnrolled && ["CONFIRMED", "FREE"].includes(enrollment.paymentStatus);

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
            <section className="relative overflow-hidden min-h-[20rem] md:min-h-[34rem]">
                {/* Background image */}
                {course.imageUrl ? (
                    <>

                        <LazyLoadImage
                            src={course.imageUrl}
                            alt={course.title}
                            effect="blur"
                            wrapperProps={{ className: "absolute inset-0" }}
                            className="absolute inset-0 h-full w-full object-cover hidden sm:block"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/99 to-transparent w-[82%]" />
                        <div className="pointer-events-none absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-sky-light/20 blur-[120px]" />
                        <div className="pointer-events-none absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-sky-light/20 blur-[120px]" />
                        <div className="pointer-events-none absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-sky/20 blur-[120px]" />
                    </>

                ) : (
                    <div className="absolute inset-0 bg-cloud" />
                )}


                <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-12 md:py-20">
                    <Link to="/courses" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-sky transition-colors hover:text-sky-light">
                        <HiOutlineChevronLeft className="h-4 w-4" />
                        All programs
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-5 max-w-xl"
                    >
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${isAvailable ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500" : "bg-amber-500/10 text-amber-600 border border-amber-500"}`}>
                                {statusLabel[course.status]}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-600 sm:text-sm">
                                <HiOutlineClock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                {course.duration}
                            </span>
                            {course.ageRange && (
                                <span className="flex items-center gap-1.5 text-xs text-slate-600 sm:text-sm">
                                    <HiOutlineUser className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    Ages {course.ageRange}
                                </span>
                            )}
                            {/* {isEnrolled && (
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${enrollment.paymentStatus === "CONFIRMED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                    {enrollment.paymentStatus === "CONFIRMED" ? "Enrolled" : "Pending"}
                                </span>
                            )} */}
                        </div>

                        <h1 className="mt-3 font-heading text-ink text-2xl font-extrabold leading-tight drop-shadow-sm sm:text-3xl md:text-[2.75rem]">
                            {course.title}
                        </h1>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-600 sm:text-base">
                            {course.description}
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                            {/* Enrollment through Payment Method */}
                            <Button variant="primary" size="md" className="rounded-full px-6 shadow-lg shadow-sky/30 hover:shadow-sky/50" {...enrollButtonProps}>
                                {enrollLabel}
                            </Button>

                            {/* Enrollment through Whatsapp */}
                            {/* <Button
                                as="a"
                                href="https://wa.me/03111390351"
                                variant="primary"
                                size="md"
                                className="rounded-full px-6 shadow-lg shadow-sky/30 hover:shadow-sky/50">
                                Enroll Now
                            </Button> */}
                            <Button
                                as="a"
                                href="https://wa.me/03111390351"
                                target="_blank"
                                rel="noreferrer"
                                variant="outline"
                                size="md"
                                className="rounded-full border-slate/30 text-ink hover:border-ink hover:bg-ink/5"
                            >
                                Ask on WhatsApp
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Details */}
            <section className="relative bg-white py-16 md:py-28">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid items-start gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
                        <div className="space-y-6 sm:space-y-8">
                            {course.benefits.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky text-cloud sm:h-10 sm:w-10">
                                            <HiOutlineCheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </div>
                                        <h2 className="font-heading text-lg font-bold text-ink sm:text-xl">
                                            What you'll get
                                        </h2>
                                    </div>
                                    <ul className="mt-3 space-y-1.5 sm:space-y-2">
                                        {course.benefits.map((benefit) => (
                                            <li key={benefit} className="flex items-start gap-2.5 rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-slate/5 sm:gap-3 sm:px-4 sm:py-2.5">
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky text-cloud text-xs font-bold shadow shadow-sky/20">
                                                    ✓
                                                </span>
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {course.toolsCovered.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky text-cloud sm:h-10 sm:w-10">
                                            <HiOutlineCollection className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </div>
                                        <h2 className="font-heading text-lg font-bold text-ink sm:text-xl">
                                            Tools you'll use
                                        </h2>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                                        {course.toolsCovered.map((tool) => (
                                            <span key={tool} className="rounded-full bg-sky/5 border border-sky px-2 py-0.5 text-xs font-medium text-sky/80 transition-colors shadow cursor-pointer hover:bg-sky/10 hover:text-sky hover:shadow-sky/20 sm:px-4 sm:text-sm">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky text-cloud sm:h-10 sm:w-10">
                                        <HiOutlineDocumentText className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                    <h2 className="font-heading text-lg font-bold text-ink sm:text-xl">
                                        Format
                                    </h2>
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-muted">{course.format}</p>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="rounded-3xl border border-slate/15 bg-white p-5 shadow-sm sm:p-7">
                                <p className="text-sm text-muted">Price</p>
                                <p className="mt-1 font-heading text-2xl font-bold text-ink sm:text-3xl">
                                    {course.isFree ? "Free of Cost" : `PKR ${course.price.toLocaleString()}`}
                                </p>
                                <div className="mt-5 space-y-3 border-t border-slate/10 pt-5 text-sm sm:mt-6 sm:pt-6">
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
                                <Button variant="primary" size="md" className="mt-5 w-full rounded-full px-6 sm:mt-6" {...enrollButtonProps}>
                                    {enrollLabel}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};