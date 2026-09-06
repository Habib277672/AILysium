import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";
import { courses } from "../data/courses";

const statusFilters = ["All", "Available", "Coming Soon"];

export const Courses = () => {
    const [filter, setFilter] = useState("All");

    const visibleCourses =
        filter === "All"
            ? courses
            : courses.filter((course) => course.status === filter);

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
                <div className="pointer-events-none absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-sky/25 blur-[120px]" />

                <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
                    <Badge variant="sky" className="bg-white/10 text-sky-light">
                        Programs
                    </Badge>
                    <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight md:text-5xl">
                        Find the right AI program for you
                    </h1>
                    <p className="mt-6 text-white/70">
                        Browse hands-on AI training for teen beginners, personalized
                        mentorship, and a freelancer-ready track — no account needed to
                        browse.
                    </p>
                </div>
            </section>

            {/* Catalog */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="flex flex-wrap gap-3">
                    {statusFilters.map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => setFilter(status)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filter === status
                                ? "border-sky bg-sky/10 text-sky"
                                : "border-slate/20 text-slate hover:border-sky/50 hover:text-sky"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {visibleCourses.map((course) => (
                        <Card
                            key={course.slug}
                            className="flex flex-col border-t-4 border-t-sky"
                        >
                            <Badge
                                variant={course.status === "Available" ? "success" : "warning"}
                            >
                                {course.status}
                            </Badge>
                            <h2 className="mt-4 font-heading text-xl font-semibold text-ink">
                                {course.title}
                            </h2>
                            <p className="mt-2 flex-1 text-sm text-slate">
                                {course.shortDescription}
                            </p>
                            <div className="mt-4 space-y-1 text-sm text-slate">
                                <p>
                                    <span className="font-medium text-ink">Price:</span>{" "}
                                    {course.price}
                                </p>
                                <p>
                                    <span className="font-medium text-ink">Duration:</span>{" "}
                                    {course.duration}
                                </p>
                                {course.mentor && (
                                    <p>
                                        <span className="font-medium text-ink">Mentor:</span>{" "}
                                        {course.mentor}
                                    </p>
                                )}
                            </div>
                            <Button
                                as={Link}
                                to={`/courses/${course.slug}`}
                                variant="outline"
                                size="sm"
                                className="mt-6"
                            >
                                View details
                            </Button>
                        </Card>
                    ))}

                    {visibleCourses.length === 0 && (
                        <p className="col-span-full py-10 text-center text-sm text-slate">
                            No programs match this filter yet.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};