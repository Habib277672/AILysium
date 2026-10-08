import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Parent of a Kids AI Course Student",
    summary:
      "I honestly did not expect my son to enjoy learning this much. He started with games and now builds small web projects on his own at home with confidence daily!",
    image: "",
  },
  {
    name: "Bilal Ahmed",
    role: "Parent of a VIP Program Student",
    summary:
      "I really liked the direct guidance. My son was not just watching lessons, he was using AI tools and creating useful things by himself with confidence each day.",
    image: "",
  },
  {
    name: "Fatima Noor",
    role: "Parent of a Kids AI Course Student",
    summary:
      "The roadmap made learning much easier for us. I also liked that they teach kids to use AI responsibly, and not just look for quick answers when they get stuck.",
    image: "",
  },
  {
    name: "Imran Ali",
    role: 'Parent of a "Freelancers AI" Course Student',
    summary:
      "My child now thinks about skills and freelancing in a new way. From websites to videos and automation, he is learning practical skills he can use in real life.",
    image: "",
  },
  {
    name: "Sana Malik",
    role: "Parent of a Kids AI Course Student",
    summary:
      "At first my daughter was simply curious about AI. Now she writes better prompts, tries different tools, and builds small projects herself with more confidence!",
    image: "",
  },
  {
    name: "Hira Sheikh",
    role: 'Parent of a "Freelancers AI" Course Student',
    summary:
      "I liked the practical approach. My daughter worked on real projects, and she is already using those skills for freelance work online with confidence right now.",
    image: "",
  },
];

const AUTO_SWIPE_INTERVAL = 4000;

const getInitials = (name) => {
  const parts = name.trim().split(/\s+/);
  return (
    (parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")
  ).toUpperCase();
};

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1.5l1.85 3.75L14 5.9l-3 2.92.71 4.13L8 10.77l-3.71 2.18.71-4.13-3-2.92 4.15-.65z" />
  </svg>
);

export const TestimonialSection = ({ revealPrefix = "testimonials" }) => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);

  const total = testimonials.length;
  const visibleCount = isMobile ? 1 : 3;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Advance a full page at a time so every visible card is replaced.
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + visibleCount) % total);
    }, AUTO_SWIPE_INTERVAL);
  }, [total, visibleCount]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const prev = () => {
    setCurrent((p) => (p - visibleCount + total) % total);
    startTimer();
  };

  const next = () => {
    setCurrent((p) => (p + visibleCount) % total);
    startTimer();
  };

  const visible = Array.from(
    { length: visibleCount },
    (_, i) => testimonials[(current + i) % total],
  );

  const progress = ((current + visibleCount) / total) * 100;

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <Reveal id={`${revealPrefix}-header`} className="text-center">
          <h2 className="font-heading text-ink text-[25px] leading-snug font-bold md:text-[2.75rem] md:leading-tight">
            Feedbacks From{" "}
            <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
              Learners
            </span>
          </h2>
        </Reveal>

        {/* Cards */}
        <Reveal id={`${revealPrefix}-cards`} delay={0.1} className="mt-10">
          <div
            onMouseEnter={() => clearInterval(timerRef.current)}
            onMouseLeave={startTimer}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map((t, i) => (
                  <motion.div
                    key={t.name}
                    layout={!isMobile}
                    initial={{
                      opacity: 0,
                      scale: isMobile ? 1 : 0.95,
                      y: isMobile ? 8 : 24,
                    }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: isMobile ? 1 : 0.95,
                      y: isMobile ? -8 : -24,
                    }}
                    transition={
                      isMobile
                        ? { duration: 0.2, ease: "easeOut", delay: i * 0.04 }
                        : {
                          layout: { duration: 0.35, ease: "easeInOut" },
                          opacity: { duration: 0.25 },
                          scale: { duration: 0.35, ease: "easeOut" },
                          y: { duration: 0.35, ease: "easeOut" },
                          delay: i * 0.08,
                        }
                    }
                    className="group border-slate/15 shadow-ink/4 hover:border-sky/20 hover:shadow-sky/8 relative overflow-hidden rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:bg-white/70 sm:backdrop-blur-md"
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <StarIcon key={j} />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-slate mt-4 text-[15px] leading-relaxed">
                      &ldquo;{t.summary}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="border-slate/10 mt-5 flex items-center gap-3.5 border-t pt-5">
                      <div className="relative">
                        <div className="from-sky to-sky-light absolute -inset-0.5 rounded-full bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        {t.image ? (
                          <img
                            src={t.image}
                            alt={t.name}
                            width="44"
                            height="44"
                            className="relative h-11 w-11 rounded-full object-cover"
                          />
                        ) : (
                          <div className="from-sky to-sky-light relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white">
                            {getInitials(t.name)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-heading text-ink text-sm font-bold">
                          {t.name}
                        </p>
                        <p className="text-muted mt-0.5 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Navigation — bottom center */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            className="group border-slate/20 text-slate hover:border-sky hover:text-sky hover:shadow-sky/10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            aria-label="Previous"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              <path
                d="M11 4L6 9L11 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="bg-slate/10 relative h-1.5 w-20 overflow-hidden rounded-full">
            <motion.div
              className="bg-sky absolute inset-y-0 left-0 rounded-full"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <button
            type="button"
            onClick={next}
            className="group border-slate/20 text-slate hover:border-sky hover:text-sky hover:shadow-sky/10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            aria-label="Next"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                d="M7 4L12 9L7 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
