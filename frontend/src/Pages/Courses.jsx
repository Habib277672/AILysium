import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { api } from "../lib/api";
import { CourseCard } from "../Components/UI/CourseCard";
import { CourseCardSkeleton } from "../Components/UI/CourseCardSkeleton";
import { Reveal } from "../Components/UI/Reveal";

const statusFilters = ["All", "AVAILABLE", "COMING_SOON"];

const filterLabel = {
    All: "All",
    AVAILABLE: "Available",
    COMING_SOON: "Coming Soon",
};

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
            <section className="relative overflow-hidden bg-cloud py-16 md:py-36">
                <div className="pointer-events-none absolute top-0 left-0 h-48 w-full bg-gradient-to-b from-white via-white/80 to-transparent" />
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/15 blur-[160px]" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto max-w-3xl px-6 text-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
                        <span className="h-1 w-1 rounded-full bg-sky" />
                        Programs
                    </span>
                    <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:mt-5 md:text-5xl">
                        Find the right{" "}
                        <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                            AI program
                        </span>{" "}
                        for you
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base md:mt-5">
                        Browse hands-on AI training for teen beginners, personalized
                        mentorship, and a freelancer-ready track — no account needed to
                        browse.
                    </p>
                </motion.div>
            </section>

            {/* Catalog */}
            <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-20">
                <Reveal id="courses-tabs" y={12}>
                    <div className="flex flex-wrap gap-2.5">
                        {statusFilters.map((status) => (
                            <button
                                key={status}
                                type="button"
                                onClick={() => setFilter(status)}
                                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-in-out ${filter === status
                                    ? "border-sky bg-sky text-white shadow-lg shadow-sky/25"
                                    : "border-slate/20 bg-white text-slate hover:border-sky/40 hover:text-sky hover:shadow-md hover:shadow-sky/10"
                                    }`}
                            >
                                {filterLabel[status]}
                            </button>
                        ))}
                    </div>
                </Reveal>
                {loading && (
                    <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <CourseCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <p className="mt-10 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
                        {visibleCourses.map((course, index) => (
                            <Reveal
                                key={`${filter}-${course.slug}`}
                                id={`courses-card-${course.slug}`}
                                y={16}
                                delay={index * 0.08}
                            >
                                <CourseCard course={course} />
                            </Reveal>
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