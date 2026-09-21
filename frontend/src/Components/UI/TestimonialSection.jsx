import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import woman1 from "../../assets/Images/Testimonials_imgs/woman_1.webp";
import woman2 from "../../assets/Images/Testimonials_imgs/woman_2.webp";
import woman3 from "../../assets/Images/Testimonials_imgs/woman_3.webp";
import woman4 from "../../assets/Images/Testimonials_imgs/woman_4.webp";
import man1 from "../../assets/Images/Testimonials_imgs/man_1.webp";
import man2 from "../../assets/Images/Testimonials_imgs/man_2.webp";

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Parent of a Kids AI Course Student",
    summary:
      "Her son progressed from gaming to building his own web project over three months.",
    image: woman1,
  },
  {
    name: "Bilal Ahmed",
    role: "Parent of a VIP Program Student",
    summary:
      "Values the one-on-one guidance and hands-on work with image and video AI tools.",
    image: man1,
  },
  {
    name: "Fatima Noor",
    role: "Parent of a Kids AI Course Student",
    summary:
      "Appreciates the clear roadmap, the focus on responsible AI use, and AI agents.",
    image: woman2,
  },
  {
    name: "Imran Ali",
    role: 'Parent of a "Freelancers AI" Course Student',
    summary:
      "Highlights the freelancer preparation — video, websites, automation — and his child's growing confidence.",
    image: man2,
  },
  {
    name: "Sana Malik",
    role: "Parent of a Kids AI Course Student",
    summary:
      "Loves watching her daughter go from curious beginner to confidently prompting and building her own tools.",
    image: woman3,
  },
  {
    name: "Hira Sheikh",
    role: 'Parent of a "Freelancers AI" Course Student',
    summary:
      "Says the practical, project-based approach gave her daughter real skills she now uses to freelance part-time.",
    image: woman4,
  },
];

const AUTO_SWIPE_INTERVAL = 5000;

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1.5l1.85 3.75L14 5.9l-3 2.92.71 4.13L8 10.77l-3.71 2.18.71-4.13-3-2.92 4.15-.65z" />
  </svg>
);

export const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);

  const total = testimonials.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTO_SWIPE_INTERVAL);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const prev = () => {
    setCurrent((p) => (p - 1 + total) % total);
    startTimer();
  };

  const next = () => {
    setCurrent((p) => (p + 1) % total);
    startTimer();
  };

  const visibleCount = isMobile ? 1 : 3;
  const visible = Array.from({ length: visibleCount }, (_, i) =>
    testimonials[(current + i) % total]
  );

  const progress = ((current + 1) / total) * 100;

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-sky" />
              Testimonials
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-snug text-ink md:text-[2.75rem] md:leading-tight">
              Loved by <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">parents & students</span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate/20 bg-white text-slate shadow-sm transition-all duration-200 hover:border-sky hover:text-sky hover:shadow-md hover:shadow-sky/10"
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
                <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="relative h-1.5 w-20 overflow-hidden rounded-full bg-slate/10">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-sky"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            <button
              type="button"
              onClick={next}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate/20 bg-white text-slate shadow-sm transition-all duration-200 hover:border-sky hover:text-sky hover:shadow-md hover:shadow-sky/10"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          className="mt-10"
          onMouseEnter={() => clearInterval(timerRef.current)}
          onMouseLeave={startTimer}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((t, i) => (
                <motion.div
                  key={t.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -24 }}
                  transition={{
                    layout: { duration: 0.35, ease: "easeInOut" },
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.35, ease: "easeOut" },
                    y: { duration: 0.35, ease: "easeOut" },
                    delay: i * 0.08,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-slate/15 bg-white/70 p-7 shadow-sm shadow-ink/4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky/20 hover:shadow-xl hover:shadow-sky/8"
                >
                  {/* Decorative gradient corner */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-sky/8 to-transparent transition-transform duration-500 group-hover:scale-150" />

                  {/* Stars */}
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <StarIcon key={j} />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-4 text-[15px] leading-relaxed text-slate">
                    &ldquo;{t.summary}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-5 flex items-center gap-3.5 border-t border-slate/10 pt-5">
                    <div className="relative">
                      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-sky to-sky-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <img
                        src={t.image}
                        alt={t.name}
                        width="44"
                        height="44"
                        className="relative h-11 w-11 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-bold text-ink">
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
