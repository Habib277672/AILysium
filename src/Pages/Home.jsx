import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { api } from "../lib/api";
import { Button } from "../Components/UI/Button";
import { CourseCard } from "../Components/UI/CourseCard";
import { CourseCardSkeleton } from "../Components/UI/CourseCardSkeleton";
import { FAQItem } from "../Components/UI/FAQItem";
import { TestimonialSection } from "../Components/UI/TestimonialSection";
import { ConsultationSection } from "../Components/UI/ConsultationSection";
import { Reveal } from "../Components/UI/Reveal";
import {
  FaLaptopCode,
  FaPalette,
  FaBriefcase,
  FaBullhorn,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";
import {
  FaSearch,
  FaUserPlus,
  FaLock,
  FaChalkboardTeacher,
} from "react-icons/fa";

import heroImg from "../assets/Images/hero_img.webp";
import aboutImg from "../assets/Images/home_abt.webp";

const heroFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

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
  { label: "Live classes with a trainer", value: "72" },
  { label: "AI tools you learn to use", value: "30+" },
  { label: "From zero to builder", value: "100%" },
];

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
      "Pick a program, confirm your enrollment, and complete payment, your spot is locked in once it's confirmed.",
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
  {
    question: "How is the Kids AI Course structured?",
    answer:
      "It runs for 12 weeks with 72 one-hour live classes, split into three months: Foundations, Create and Study, and Build.",
  },
  {
    question: "Is it live or recorded?",
    answer: "Live online, with a trainer present in every class.",
  },
  {
    question: "Does my child need any experience?",
    answer: "No. The course starts from zero.",
  },
  {
    question: "What does the student finish with?",
    answer: "A working project, a portfolio piece and a certificate.",
  },
  {
    question: "Is it safe for children?",
    answer:
      "Yes. We require parent permission, use supervised accounts, share no personal details on AI tools, and keep a live trainer in every class.",
  },
  {
    question: "Can we speak to the instructor first?",
    answer:
      "Yes. A free consultation is available on WhatsApp at 0311 1390351.",
  },
  {
    question: "When do the other courses start?",
    answer:
      "They are coming soon. You can join the waitlist on each course page.",
  },
];

export const Home = () => {
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const description =
      "Live online AI training for students, professionals and institutions, plus AI solutions for businesses. AiLysium Academy, Gujranwala, Pakistan.";
    let meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute("content") ?? null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
    return () => {
      if (previous === null) meta.remove();
      else meta.setAttribute("content", previous);
    };
  }, []);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await api.get("/courses");
        const featured = data.filter((course) => course.isFeatured).slice(0, 3);
        setCourses(featured);
      } catch {
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
      <section className="bg-cloud relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(37,99,235,0.12) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="bg-sky/20 pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full blur-[120px]" />
        <div className="bg-sky-light/20 pointer-events-none absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl items-end gap-8 px-6 pt-8 pb-0 sm:gap-16 md:grid-cols-2 md:items-center md:pt-10 md:pb-0">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className="order-1 pb-4 text-center sm:pb-20 sm:text-left md:pb-30"
          >
            <motion.h1
              variants={heroFadeUp}
              className="font-heading text-ink mt-8 text-3xl leading-[1.08] font-extrabold tracking-tight text-balance sm:mt-6 sm:text-4xl md:text-[3.5rem] md:leading-[1.1]"
            >
              Learn AI from zero to{" "}
              <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
                Building Real Projects
              </span>
            </motion.h1>

            <motion.p
              variants={heroFadeUp}
              className="text-muted mt-4 max-w-lg text-base leading-relaxed sm:text-lg"
            >
              Practical training for every stage, from school students starting
              out to freelancers and professionals. Each week you learn one new
              skill with real AI tools and use it to make something of your
              own.{" "}
            </motion.p>

            <motion.div
              variants={heroFadeUp}
              className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4"
            >
              <Button
                as={Link}
                to="/courses"
                variant="primary"
                size="md"
                className="shadow-sky/25 hover:shadow-sky/40 sm:size-lg shadow-lg"
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
            </motion.div>
          </motion.div>

          <motion.div
            className="order-2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={heroImg}
              alt="AiLysium hero"
              className="block w-full max-w-[16rem] rounded-3xl object-cover sm:max-w-sm md:max-w-md"
            />
          </motion.div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="border-slate/10 relative border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
          <Reveal id="impact-header" className="mx-auto max-w-xl text-center">

            <h2 className="font-heading text-ink mt-2 text-3xl leading-snug font-bold sm:text-4xl md:text-5xl">
              Real Skills,{" "}
              <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
                Real Fast
              </span>
            </h2>
            <p className="text-slate mx-auto mt-2 max-w-md text-base leading-relaxed">
              No scattered videos and no theory overload. Each week teaches one
              clear skill and ends with something you create.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <Reveal
                key={stat.label}
                id={`impact-${index}`}
                y={12}
                delay={index * 0.08}
                className="group border-slate/10 shadow-ink/5 hover:shadow-ink/8 relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* <div className="bg-sky/8 pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-125" /> */}
                <div className="relative text-center">
                  <p className="font-heading text-ink text-4xl font-extrabold tracking-tight">
                    {stat.value}
                  </p>
                  <div className="bg-sky/30 mx-auto mt-3 h-px w-12" />
                  <p className="text-slate mt-3 text-sm leading-snug">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Find the right course — category cards, no search bar */}
      <section className="bg-cloud relative overflow-hidden py-20 md:py-24">
        <div className="pointer-events-none absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />
        <div className="bg-sky/10 pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <Reveal id="skills-header">
            <h2 className="font-heading text-ink text-2xl tracking-tight leading-snug font-bold sm:text-3xl md:text-4xl md:tracking-normal lg:text-[2.75rem] lg:leading-tight">
              Find the Right Course <span className="text-sky">For You</span>
            </h2>
            <p className="text-muted mx-auto mt-3 max-w-lg text-base leading-relaxed">
              Whether you are a school student, a working professional or an
              institution, there is a path for you. Start with the course that
              fits where you are today.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {skillCategories.map((category, index) => (
              <Reveal
                key={category.name}
                id={`skill-${index}`}
                y={14}
                delay={index * 0.07}
                className="group border-slate/10 shadow-ink/5 hover:border-sky/25 hover:shadow-sky/10 relative flex cursor-pointer flex-col items-center gap-3.5 overflow-hidden rounded-2xl border bg-white px-3 py-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <span className="bg-sky/5 pointer-events-none absolute -top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="bg-sky/75 text-cloud group-hover:from-sky group-hover:to-sky-light group-hover:shadow-sky/40 relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-xl transition-all duration-300 group-hover:scale-110 group-hover:text-white group-hover:shadow-lg">
                  {category.icon}
                </span>
                <span className="text-ink group-hover:text-sky relative text-[13px] font-semibold transition-colors duration-200">
                  {category.name}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs — top 3 featured, admin-controlled */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal
            id="programs-header"
            className="flex flex-col items-center text-center"
          >
            <h2 className="font-heading text-ink text-2xl leading-snug font-bold whitespace-nowrap max-[359px]:text-base sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Find Your Perfect{" "}
              <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
                AI Program
              </span>
            </h2>
            <p className="text-muted mt-3 max-w-lg text-base leading-relaxed">
              Beginner to freelancer, pick the path that matches your goals.
            </p>
          </Reveal>

          {coursesLoading && (
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          )}
          {!coursesLoading && coursesError && (
            <p className="mt-14 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
              {coursesError}
            </p>
          )}

          {!coursesLoading && !coursesError && (
            <>
              <div className="mt-14 grid gap-6 md:grid-cols-3">
                {courses.map((course, index) => (
                  <Reveal
                    key={course.slug}
                    id={`course-${course.slug}`}
                    y={16}
                    delay={index * 0.1}
                  >
                    <CourseCard course={course} />
                  </Reveal>
                ))}

                {courses.length === 0 && (
                  <p className="text-muted col-span-full py-10 text-center text-sm">
                    No featured programs are set yet, an admin can feature
                    courses from the Courses page.
                  </p>
                )}
              </div>

              {courses.length > 0 && (
                <Reveal id="view-all-cta" y={12} className="mt-14 text-center">
                  <Button
                    as={Link}
                    to="/courses"
                    variant="primary"
                    size="lg"
                    className="shadow-sky/25 hover:shadow-sky/35 rounded-full px-8 py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    View all programs
                  </Button>
                </Reveal>
              )}
            </>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cloud relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />
        <div className="bg-sky/10 pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal id="how-header" className="text-center">
            <h2 className="font-heading text-ink text-2xl tracking-tighter leading-snug font-bold sm:text-3xl md:text-4xl md:tracking-normal lg:text-[2.75rem] lg:leading-tight">
              From Sign-up to{" "}
              <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
                Your First Build
              </span>
            </h2>
            <p className="text-muted mx-auto mt-2 max-w-md text-base leading-relaxed">
              Four simple steps, no friction, just results.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => (
              <Reveal
                key={item.step}
                id={`step-${item.step}`}
                y={16}
                delay={index * 0.1}
                className="group border-slate/10 shadow-ink/5 hover:shadow-ink/8 relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <span className="bg-sky/90 text-cloud group-hover:bg-sky grid h-11 w-11 place-items-center rounded-xl text-lg transition-all duration-200 group-hover:text-white">
                    {item.icon}
                  </span>
                  <span className="font-heading text-sky/15 group-hover:text-sky/25 text-4xl leading-none font-extrabold transition-colors select-none">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-heading text-ink mt-5 text-lg font-bold">
                  {item.title}
                </h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection revealPrefix="home-testimonials" />

      {/* Short About — data left, graphic right */}
      <section className="relative overflow-hidden bg-white py-16 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <Reveal
              id="about-text"
              x={-20}
              className="text-center md:text-left"
            >
              <h2 className="font-heading text-ink text-xl tracking-tighter leading-snug font-bold sm:text-3xl md:text-[2.75rem] md:tracking-normal md:leading-tight">
                An AI Academy Built on{" "}
                <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
                  Real Projects
                </span>
              </h2>
              <p className="text-muted mt-4 text-sm leading-relaxed sm:text-base">
                AiLysium is an AI academy and solutions studio in Gujranwala,
                Pakistan. We teach AI through live, hands-on lessons that take
                learners from zero to real working projects. Our studio uses the
                same tools for paying clients, so what we teach is what we
                practise.
              </p>
              <Button
                as={Link}
                to="/about"
                variant="primary"
                size="md"
                className="shadow-sky/20 hover:shadow-sky/35 mt-7 rounded-full px-6 shadow-lg"
              >
                Learn more about us
              </Button>
            </Reveal>

            <Reveal
              id="about-image"
              x={20}
              delay={0.1}
              className="relative mx-auto w-full max-w-md md:mx-0 md:max-w-none"
            >
              <div className="from-sky/8 to-sky-light/8 absolute -inset-4 rounded-[2rem] bg-gradient-to-br via-transparent" />
              <div className="border-slate/10 shadow-ink/5 relative overflow-hidden rounded-3xl border bg-white shadow-xl">
                <img
                  src={aboutImg}
                  alt="AiLysium training"
                  className="h-56 w-full object-cover sm:h-72 md:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cloud relative overflow-hidden py-16 md:py-28">
        <div className="pointer-events-none absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.4fr] md:items-start md:gap-12">
          <Reveal
            id="faq-text"
            className="text-center md:sticky md:top-8 md:text-left"
          >
            <h2 className="font-heading text-ink text-2xl leading-snug font-bold sm:text-3xl md:text-[2.75rem] md:leading-tight">
              Got{" "}
              <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
                Questions?
              </span>
            </h2>
            <p className="text-muted mx-auto mt-2 max-w-xs text-sm leading-relaxed sm:text-base md:mx-0">
              Can't find what you're looking for? Reach out and we'll get back
              to you.
            </p>
            <Button
              as={Link}
              to="/contact"
              variant="primary"
              size="md"
              className="shadow-sky/20 hover:shadow-sky/35 mt-5 rounded-full px-6 shadow-lg"
            >
              Contact us
            </Button>
          </Reveal>
          <Reveal
            id="faq-list"
            delay={0.1}
            className="divide-slate/10 border-slate/10 shadow-ink/4 hover:shadow-ink/5 divide-y rounded-3xl border bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:bg-white/70 sm:p-8 sm:backdrop-blur-md"
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* Consultation CTA */}
      <Reveal id="consultation">
        <ConsultationSection
          heading={
            <>
              Still Deciding? Let's{" "}
              <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
                Talk
              </span>
              .
            </>
          }
        />
      </Reveal>
    </div>
  );
};
