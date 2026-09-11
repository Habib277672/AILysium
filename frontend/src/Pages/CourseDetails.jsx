import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";

const statusLabel = {
    AVAILABLE: "Available",
    COMING_SOON: "Coming Soon",
};

export const CourseDetails = () => {
    const { slug } = useParams();
    const { user, loading: authLoading } = useAuth();
    const isAdmin = user?.role === "ADMIN";

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);

        const loadCourse = async () => {
            try {
                const { data } = await api.get(`/courses/${slug}`);
                setCourse(data);
            } catch (err) {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        loadCourse();
    }, [slug]);

    if (loading) {
        return (
            <div className="mx-auto max-w-3xl px-6 py-24 text-center text-sm text-slate">
                Loading…
            </div>
        );
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
    const enrollHref = !authLoading && user ? `/enroll/${course.id}` : "/login";
    const enrollDisabled = !isAvailable || isAdmin;
    const enrollLabel = isAdmin
        ? "Admin accounts can't enroll"
        : isAvailable
            ? "Enroll now"
            : "Coming Soon";

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
                    <Link to="/courses" className="text-sm text-white/60 hover:text-sky-light">
                        ← All programs
                    </Link>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Badge variant={isAvailable ? "success" : "warning"}>
                            {statusLabel[course.status]}
                        </Badge>
                        <span className="text-sm text-white/60">{course.duration}</span>
                        {course.ageRange && (
                            <span className="text-sm text-white/60">Ages {course.ageRange}</span>
                        )}
                    </div>
                    <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight md:text-5xl">
                        {course.title}
                    </h1>
                    <p className="mt-6 max-w-xl text-white/70">{course.description}</p>

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <Button as={Link} to={enrollHref} variant="primary" size="lg" disabled={enrollDisabled}>
                            {enrollLabel}
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
                        {course.benefits.length > 0 && (
                            <>
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
                            </>
                        )}

                        {course.toolsCovered.length > 0 && (
                            <>
                                <h2 className="mt-10 font-heading text-2xl font-bold text-ink">
                                    Tools you'll use
                                </h2>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {course.toolsCovered.map((tool) => (
                                        <Badge key={tool} variant="sky">
                                            {tool}
                                        </Badge>
                                    ))}
                                </div>
                            </>
                        )}

                        <h2 className="mt-10 font-heading text-2xl font-bold text-ink">
                            Format
                        </h2>
                        <p className="mt-4 text-sm text-slate">{course.format}</p>
                    </div>

                    <Card padding="lg" className="h-fit">
                        <p className="text-sm font-medium text-slate">Price</p>
                        <p className="mt-1 font-heading text-3xl font-bold text-ink">
                            PKR {course.price.toLocaleString()}
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
                            {course.projectsCount != null && (
                                <p className="flex justify-between">
                                    <span>Projects</span>
                                    <span className="font-medium text-ink">{course.projectsCount}</span>
                                </p>
                            )}
                            <p className="flex justify-between">
                                <span>Status</span>
                                <span className="font-medium text-ink">{statusLabel[course.status]}</span>
                            </p>
                        </div>
                        <Button
                            as={Link}
                            to={enrollHref}
                            variant="primary"
                            size="md"
                            className="mt-6 w-full"
                            disabled={enrollDisabled}
                        >
                            {enrollLabel}
                        </Button>
                    </Card>
                </div>
            </section>
        </div>
    );
};