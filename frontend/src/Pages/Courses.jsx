import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { CourseCard } from "../Components/UI/CourseCard";

const statusFilters = ["All", "AVAILABLE", "COMING_SOON"];

export const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const loadCourses = async () => {
            try {
                // Public endpoint — no auth required, works whether or not
                // someone is logged in. Backend already excludes UNPUBLISHED.
                const { data } = await api.get("/courses");
                setCourses(data);
            } catch (err) {
                setError("Couldn't load programs right now. Please try refreshing.");
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, []);

    const visibleCourses =
        filter === "All" ? courses : courses.filter((course) => course.status === filter);

    return (
        <div>
            {/* Hero */}
            <section className="relative overflow-hidden bg-cloud py-24 md:py-32">
                <div className="pointer-events-none absolute top-0 left-0 h-48 w-full bg-gradient-to-b from-white via-white/80 to-transparent" />
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/15 blur-[160px]" />

                <div className="relative mx-auto max-w-3xl px-6 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
                        <span className="h-1 w-1 rounded-full bg-sky" />
                        Programs
                    </span>
                    <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight text-ink md:text-5xl">
                        Find the right{" "}
                        <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                            AI program
                        </span>{" "}
                        for you
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-base leading-relaxed text-muted">
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
                            {status === "All" ? "All" : status === "AVAILABLE" ? "Available" : "Coming Soon"}
                        </button>
                    ))}
                </div>

                {loading && (
                    <p className="mt-10 text-center text-sm text-slate">
                        Loading programs…
                    </p>
                )}

                {!loading && error && (
                    <p className="mt-10 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {visibleCourses.map((course) => (
                            <CourseCard key={course.slug} course={course} />
                        ))}

                        {visibleCourses.length === 0 && (
                            <p className="col-span-full py-10 text-center text-sm text-slate">
                                No programs match this filter yet.
                            </p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};