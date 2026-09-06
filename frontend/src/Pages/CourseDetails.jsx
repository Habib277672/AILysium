import { Link, useParams } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";
import { getCourseBySlug } from "../data/courses";

export const CourseDetails = () => {
    const { slug } = useParams();
    const course = getCourseBySlug(slug);

    if (!course) {
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

    const isAvailable = course.status === "Available";

    // Enroll CTA: per the enrollment flow in the project data, "visitor
    // clicks Enroll -> system checks authentication." Auth isn't built yet
    // (Phase 5), so for now this always routes to /login, matching the
    // documented flow's first gate. This will be replaced with a real
    // authenticated check once auth exists.
    const enrollHref = "/login";

    return (
        <div>
            {/* Hero */}
            <section className="relative overflow-hidden bg-ink text-white">
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(96,165,250,0.18) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                />
                <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-sky/25 blur-[120px]" />

                <div className="relative mx-auto max-w-4xl px-6 py-24">
                    <Link
                        to="/courses"
                        className="text-sm text-white/60 hover:text-sky-light"
                    >
                        ← All programs
                    </Link>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Badge variant={isAvailable ? "success" : "warning"}>
                            {course.status}
                        </Badge>
                        <span className="text-sm text-white/60">{course.duration}</span>
                    </div>
                    <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight md:text-5xl">
                        {course.title}
                    </h1>
                    <p className="mt-6 max-w-xl text-white/70">
                        {course.shortDescription}
                    </p>

                    {course.ageNote && (
                        <p className="mt-6 max-w-xl rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                            {course.ageNote}
                        </p>
                    )}

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <Button
                            as={Link}
                            to={enrollHref}
                            variant="primary"
                            size="lg"
                            disabled={!isAvailable}
                        >
                            {isAvailable ? "Enroll now" : "Coming Soon"}
                        </Button>
                        <Button
                            as="a"
                            href="https://wa.me/12345678900"
                            target="_blank"
                            rel="noreferrer"
                            variant="outline"
                            size="lg"
                            className="border-white/25 text-white hover:border-sky hover:text-sky-light"
                        >
                            Ask on WhatsApp
                        </Button>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="mx-auto max-w-4xl px-6 py-20">
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-ink">
                            What you'll get
                        </h2>
                        <ul className="mt-6 space-y-4">
                            {course.benefits.map((benefit) => (
                                <li key={benefit} className="flex gap-3 text-sm text-slate">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky/10 text-xs font-bold text-sky">
                                        ✓
                                    </span>
                                    {benefit}
                                </li>
                            ))}
                        </ul>

                        <h2 className="mt-10 font-heading text-2xl font-bold text-ink">
                            Format
                        </h2>
                        <p className="mt-4 text-sm text-slate">{course.format}</p>
                    </div>

                    <Card padding="lg" className="h-fit">
                        <p className="text-sm font-medium text-slate">Price</p>
                        <p className="mt-1 font-heading text-3xl font-bold text-ink">
                            {course.price}
                        </p>
                        <div className="mt-6 space-y-3 text-sm text-slate">
                            <p className="flex justify-between">
                                <span>Duration</span>
                                <span className="font-medium text-ink">{course.duration}</span>
                            </p>
                            {course.mentor && (
                                <p className="flex justify-between">
                                    <span>Mentor</span>
                                    <span className="font-medium text-ink">{course.mentor}</span>
                                </p>
                            )}
                            <p className="flex justify-between">
                                <span>Status</span>
                                <span className="font-medium text-ink">{course.status}</span>
                            </p>
                        </div>
                        <Button
                            as={Link}
                            to={enrollHref}
                            variant="primary"
                            size="md"
                            className="mt-6 w-full"
                            disabled={!isAvailable}
                        >
                            {isAvailable ? "Enroll now" : "Coming Soon"}
                        </Button>
                    </Card>
                </div>
            </section>
        </div>
    );
};