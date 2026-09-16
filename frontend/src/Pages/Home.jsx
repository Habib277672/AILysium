import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { api } from "../lib/api";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";
import { FAQItem } from "../Components/UI/FAQItem";
import { TestimonialSection } from "../Components/UI/TestimonialSection";
import { ConsultationSection } from "../Components/UI/ConsultationSection";
import { FaLaptopCode, FaPalette, FaBriefcase, FaBullhorn, FaChartLine, FaShieldAlt } from "react-icons/fa";
import { FaSearch, FaUserPlus, FaLock, FaChalkboardTeacher } from "react-icons/fa";

import heroImg from "../assets/Images/hero_img.png";

const skillCategories = [
  { name: "Development", icon: <FaLaptopCode /> },
  { name: "Design", icon: <FaPalette /> },
  { name: "Business", icon: <FaBriefcase /> },
  { name: "Marketing", icon: <FaBullhorn /> },
  { name: "Data Science", icon: <FaChartLine /> },
  { name: "Personal Growth", icon: <FaShieldAlt /> },
];

const impactStats = [
  { label: "Skills in 12 weeks", value: "12", highlight: true },
  { label: "Hands-on projects", value: "3" },
  { label: "Pro tools covered", value: "30+" },
  { label: "From zero to builder", value: "100%" },
];

const statusLabel = { AVAILABLE: "Available", COMING_SOON: "Coming Soon" };
const statusBadgeVariant = { AVAILABLE: "success", COMING_SOON: "warning" };

const howItWorks = [
  {
    step: "01",
    title: "Browse the programs",
    description:
      "Explore our programs and pick the one that matches your goals and skill level.",
    icon: <FaSearch />,
  },
  {
    step: "02",
    title: "Create your account",
    description:
      "Sign up and verify your email in a couple of minutes so we know it's really you.",
    icon: <FaUserPlus />,
  },
  {
    step: "03",
    title: "Enroll and pay securely",
    description:
      "Pick a program, confirm your enrollment, and complete payment — your spot is locked in once it's confirmed.",
    icon: <FaLock />,
  },
  {
    step: "04",
    title: "Start learning with your mentor",
    description:
      "Join your first session and start building real skills with guided, hands-on support.",
    icon: <FaChalkboardTeacher />,
  },
];

const faqs = [
  { question: "What is the structure of the Kids AI course?", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
  { question: "How does the one-on-one VIP program work?", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
  { question: "When does the Freelancer AI course start?", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
  { question: "How do I enroll my child in a course?", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
  { question: "What payment methods do you accept?", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
];

export const Home = () => {
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await api.get("/courses");
        const featured = data.filter((course) => course.isFeatured).slice(0, 3);
        setCourses(featured);
      } catch (err) {
        setCoursesError("Couldn't load programs right now.");
      } finally {
        setCoursesLoading(false);
      }
    };
    loadCourses();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cloud">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgba(37,99,235,0.12) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-sky/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-sky-light/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl items-end gap-8 px-6 pt-8 pb-0 sm:gap-16 md:grid-cols-2 md:pt-10 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pb-12 sm:pb-20 md:pb-30"
          >
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky/5 px-4 py-1.5 text-sm font-medium text-sky sm:mt-0">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" />
              Forget the hype
            </span>

            <h1 className="mt-3 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:mt-6 md:text-[3.5rem] md:leading-[1.1]">
              Learn AI from{" "}
              <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                zero to building
              </span>
            </h1>

            <p className="mt-4 max-w-md text-lg leading-relaxed text-slate">
              Hands-on training for every stage — from teen beginners to
              freelancers — with real skills and tools you apply each week.
            </p>

            <div className="mt-7 flex flex-nowrap items-center gap-3 sm:flex-wrap sm:gap-4">
              <Button
                as={Link}
                to="/courses"
                variant="primary"
                size="md"
                className="shadow-lg shadow-sky/25 hover:shadow-sky/40 sm:size-lg"
              >
                Explore programs
              </Button>
              <Button
                as={Link}
                to="/contact"
                variant="outline"
                size="md"
                className="border-sky/30 text-sky hover:border-sky hover:bg-sky/5 sm:size-lg"
              >
                Let's Talk
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={heroImg}
              alt="AiLysium hero"
              className="block w-full max-w-sm rounded-3xl object-cover md:max-w-md"
            />
          </motion.div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="relative border-t border-slate/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky/5 px-3.5 py-1 text-xs font-medium uppercase tracking-wide text-sky">
              Why AiLysium
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-snug text-ink md:text-4xl">
              Real skills, <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">real fast</span>
            </h2>
            <p className="mt-2 max-w-md text-base leading-relaxed text-slate">
              Your child doesn't just watch AI — they build with it. Twelve
              weeks, twelve skills, and a project they actually ship.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-slate/10 bg-white p-6 shadow-sm shadow-ink/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-ink/8"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-sky/8 transition-transform duration-300 group-hover:scale-125" />
                <div className="relative">
                  <p className="font-heading text-4xl font-extrabold tracking-tight text-ink">
                    {stat.value}
                  </p>
                  <div className="mt-3 h-px w-8 bg-sky/30" />
                  <p className="mt-3 text-sm leading-snug text-slate">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Find the right course — category cards, no search bar */}
      <section className="relative overflow-hidden bg-cloud py-20 md:py-24">
        <div className="pointer-events-none absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/20 blur-[160px]" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
            <span className="h-1 w-1 rounded-full bg-sky" />
            Explore Skills
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-snug text-ink md:text-[2.75rem] md:leading-tight">
            Find the right course{" "}
            <span className="text-sky">for you</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted">
            Every program is built around the tools and skills below —
            pick one that interests you.
          </p>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex cursor-pointer flex-col items-center gap-3.5 rounded-[1.25rem] border border-slate/10 bg-white px-3 py-4 shadow-sm shadow-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky/25 hover:shadow-lg hover:shadow-sky/10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky/10 to-sky-light/10 text-sky transition-all duration-300 group-hover:scale-110 group-hover:from-sky group-hover:to-sky-light group-hover:text-white group-hover:shadow-md group-hover:shadow-sky/30">
                  {category.icon}
                </span>
                <span className="text-[13px] font-semibold text-ink transition-colors duration-200 group-hover:text-sky">{category.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs — top 3 featured, admin-controlled */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky">
              <span className="h-1 w-1 rounded-full bg-sky" />
              Our Programs
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold leading-snug text-ink md:text-[2.75rem] md:leading-tight">
              Find your perfect <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">AI program</span>
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
              Beginner to freelancer — pick the path that matches your goals.
            </p>
          </div>

          {coursesLoading && <p className="mt-14 text-center text-sm text-muted">Loading programs…</p>}
          {!coursesLoading && coursesError && (
            <p className="mt-14 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">{coursesError}</p>
          )}

          {!coursesLoading && !coursesError && (
            <>
              <div className="mt-14 grid gap-6 md:grid-cols-3">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate/10 bg-white shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky/20 hover:shadow-xl hover:shadow-sky/8">
                      {course.imageUrl && (
                        <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-3xl">
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="h-52 w-[calc(100%+3rem)] object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                          <div className="absolute bottom-3 left-3">
                            <Badge variant={statusBadgeVariant[course.status]}>{statusLabel[course.status]}</Badge>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col px-1">
                        <h3 className="font-heading text-xl font-bold text-ink transition-colors group-hover:text-sky">{course.title}</h3>
                        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{course.description}</p>

                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                          <span className="flex items-center gap-1.5">
                            <svg className="h-4 w-4 text-sky/60" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            {course.duration}
                          </span>
                          {course.mentor && (
                            <span className="flex items-center gap-1.5">
                              <svg className="h-4 w-4 text-sky/60" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M3 14.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                              {course.mentor}
                            </span>
                          )}
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-slate/10 pt-5">
                          <div>
                            <span className="text-xs text-muted">Starting from</span>
                            <p className="font-heading text-lg font-bold text-ink">PKR {course.price.toLocaleString()}</p>
                          </div>
                          <Button as={Link} to={`/courses/${course.slug}`} variant="primary" size="sm" className="rounded-full px-5">
                            View programme
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {courses.length === 0 && (
                  <p className="col-span-full py-10 text-center text-sm text-muted">
                    No featured programs are set yet — an admin can feature courses from the Courses page.
                  </p>
                )}
              </div>

              {courses.length > 0 && (
                <div className="mt-14 text-center">
                  <Button as={Link} to="/courses" variant="outline" size="lg" className="rounded-full border-sky/30 text-ink hover:border-sky hover:bg-sky/5">
                    View all programs
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-cloud py-20 md:py-28">
        <div className="pointer-events-none absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/20 blur-[160px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-sky" />
              Simple Process
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-snug text-ink md:text-[2.75rem] md:leading-tight">
              From sign-up to <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">your first build</span>
            </h2>
            <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-muted">
              Four simple steps — no friction, just results.
            </p>
          </div>

          <div className="relative mt-12">
            {/* Connector line — desktop only */}
            <div className="pointer-events-none absolute top-[2.75rem] left-0 hidden h-px w-full lg:block">
              <div className="h-full w-full bg-gradient-to-r from-sky/10 via-sky/25 to-sky/10" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Icon circle with glow */}
                  <div className="relative z-10 mb-6">
                    <div className="absolute inset-0 rounded-full bg-sky/15 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-sky/20 bg-white text-sky shadow-lg shadow-sky/10 transition-all duration-300 group-hover:scale-110 group-hover:border-sky group-hover:from-sky group-hover:to-sky-light group-hover:shadow-xl group-hover:shadow-sky/25">
                      <span className="text-xl transition-transform duration-300 group-hover:scale-110">
                        {item.icon}
                      </span>
                    </div>
                  </div>

                  {/* Step number */}
                  <span className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-sky/50 transition-colors group-hover:text-sky">
                    Step {item.step}
                  </span>

                  {/* Content */}
                  <h3 className="font-heading text-lg font-bold text-ink transition-colors group-hover:text-sky">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 max-w-[260px] text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Short About — data left, graphic right */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky">
                <span className="h-1 w-1 rounded-full bg-sky" />
                About AiLysium
              </span>
              <h2 className="mt-5 font-heading text-3xl font-bold leading-snug text-ink md:text-[2.75rem] md:leading-tight">
                Hands-on AI training, built for <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">real skills</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                AiLysium is based in Pakistan, training teen beginners and
                freelancers to actually build with AI — not just talk about
                it. Every program pairs real mentors with weekly, hands-on
                projects, so students leave with a portfolio, not just notes.
              </p>
              <Button as={Link} to="/about" variant="primary" size="md" className="mt-7 rounded-full px-6 shadow-lg shadow-sky/20 hover:shadow-sky/35">
                Learn more about us
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky/8 via-transparent to-sky-light/8" />
              <div className="relative overflow-hidden rounded-3xl border border-slate/10 bg-white shadow-xl shadow-ink/5">
                <img
                  src={heroImg}
                  alt="AiLysium training"
                  className="h-72 w-full object-cover sm:h-80 md:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-cloud py-24 md:py-28">
        <div className="pointer-events-none absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div className="md:sticky md:top-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-sky" />
              FAQ
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-snug text-ink md:text-[2.75rem] md:leading-tight">
              Got <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">questions?</span>
            </h2>
            <p className="mt-2 max-w-xs text-base leading-relaxed text-muted">
              Can't find what you're looking for? Reach out and we'll get back to you.
            </p>
            <Button as={Link} to="/contact" variant="primary" size="md" className="mt-5 rounded-full px-6 shadow-lg shadow-sky/20 hover:shadow-sky/35">
              Contact us
            </Button>
          </div>
          <div className="divide-y divide-slate/10 rounded-3xl border border-slate/10 bg-white/70 p-6 shadow-sm shadow-ink/4 backdrop-blur-md transition-shadow duration-300 hover:shadow-lg hover:shadow-ink/5 sm:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <ConsultationSection
        heading={<>Still deciding? Let's <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">talk</span> it through.</>}
      />
    </div>
  );
};