import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CourseCard } from "../Components/UI/CourseCard";
import { CourseCardSkeleton } from "../Components/UI/CourseCardSkeleton";
import { Reveal } from "../Components/UI/Reveal";
import { useCourses } from "../hooks/useCourses";

const statusFilters = ["All", "AVAILABLE", "COMING_SOON"];

const filterLabel = {
  All: "All",
  AVAILABLE: "Available",
  COMING_SOON: "Coming Soon",
};

export const Courses = () => {
  const { data: courses = [], isLoading, isError } = useCourses();
  const [filter, setFilter] = useState("All");

  const visibleCourses =
    filter === "All"
      ? courses
      : courses.filter((course) => course.status === filter);

  return (
    <div>
      {/* Hero */}
      <section className="bg-cloud relative overflow-hidden py-16 md:py-36">
        <div className="pointer-events-none absolute top-0 left-0 h-48 w-full bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="bg-sky/15 pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl px-6 text-center"
        >
          <span className="border-sky/20 text-sky inline-flex items-center gap-2 rounded-full border bg-white/60 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
            <span className="bg-sky h-1 w-1 rounded-full" />
            Programs
          </span>
          <h1 className="font-heading text-ink mt-4 text-3xl leading-tight font-extrabold sm:text-4xl md:mt-5 md:text-5xl">
            Find the right{" "}
            <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
              AI program
            </span>{" "}
            for you
          </h1>
          <p className="text-muted mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base md:mt-5">
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
                className={`relative rounded-full cursor-pointer border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${filter === status
                  ? "border-sky text-white"
                  : "border-slate/20 text-slate hover:border-sky/40 hover:text-sky bg-white"
                  }`}
              >
                {filter === status && (
                  <motion.span
                    layoutId="courses-tab-active"
                    className="bg-sky shadow-sky/25 absolute inset-0 rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{filterLabel[status]}</span>
              </button>
            ))}
          </div>
        </Reveal>
        {isLoading && (
          <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <p className="mt-10 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            Couldn't load programs right now. Please try refreshing.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleCourses.map((course, index) => (
                <motion.div
                  key={`${filter}-${course.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.15 } }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </AnimatePresence>

            {visibleCourses.length === 0 && (
              <p className="text-slate col-span-full py-10 text-center text-sm">
                No programs match this filter yet.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
