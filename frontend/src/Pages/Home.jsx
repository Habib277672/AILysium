import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { api } from "../lib/api";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";
import { FAQItem } from "../Components/UI/FAQItem";

const skillCategories = [
  { name: "Python", icon: "🐍" },
  { name: "JavaScript", icon: "⚡" },
  { name: "Prompting", icon: "💬" },
  { name: "Video generation", icon: "🎬" },
  { name: "Image generation", icon: "🎨" },
  { name: "Website generation", icon: "🌐" },
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
      "Explore Kids AI, VIP Mentorship, and Freelancer AI — no account needed to look around.",
  },
  {
    step: "02",
    title: "Create your account",
    description:
      "Sign up and verify your email in a couple of minutes so we know it's really you.",
  },
  {
    step: "03",
    title: "Enroll and pay securely",
    description:
      "Pick a program, confirm your enrollment, and complete payment — your spot is locked in once it's confirmed.",
  },
  {
    step: "04",
    title: "Start building with your mentor",
    description:
      "Join your sessions and ship your first project with real, hands-on feedback every week.",
  },
];

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Parent of a Kids AI Course Student",
    summary:
      "Her son progressed from gaming to building his own web project over three months.",
  },
  {
    name: "Bilal Ahmed",
    role: "Parent of a VIP Program Student",
    summary:
      "Values the one-on-one guidance and hands-on work with image and video AI tools.",
  },
  {
    name: "Fatima Noor",
    role: "Parent of a Kids AI Course Student",
    summary:
      "Appreciates the clear roadmap, the focus on responsible AI use, and AI agents.",
  },
  {
    name: "Imran Ali",
    role: 'Parent of a "Flantsers AI" Course Student',
    summary:
      "Highlights the freelancer preparation — video, websites, automation — and his child's growing confidence.",
  },
];

const faqs = [
  { question: "What is the structure of the Kids AI course?", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
  { question: "How does the one-on-one VIP program work?", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
  { question: "When does the Freelancer AI course start?", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
  { question: "How do I enroll my child in a course?", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
  { question: "What payment methods do you accept?", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
];

const chipContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } };
const chipItem = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export const Home = () => {
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");

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
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgba(96,165,250,0.18) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-sky/25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-sky-light/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-2 md:items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="sky" className="bg-white/10 text-sky-light">
              Forget the hype
            </Badge>
            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] text-white md:text-6xl">
              Learn AI from zero to building
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/70">
              Learn to build with AI. Hands-on training for every stage, from
              teen beginners to freelancers, with real skills and tools you
              apply each week.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button as={Link} to="/courses" variant="primary" size="lg">
                Explore programs
              </Button>
              <Button
                as={Link}
                to="/courses"
                variant="outline"
                size="lg"
                className="border-white/25 text-white hover:border-sky hover:text-sky-light"
              >
                View courses
              </Button>
            </div>
            <Link to="/contact" className="mt-6 inline-block text-sm text-white/60 underline underline-offset-4 hover:text-sky-light">
              Talk to us
            </Link>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/10 bg-ink-soft/80 p-8 backdrop-blur"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-sm font-medium text-white/50">What you'll actually use, every week</p>
            <motion.div className="mt-5 flex flex-wrap gap-3" variants={chipContainer} initial="hidden" animate="show">
              {skillCategories.map((skill) => (
                <motion.span key={skill.name} variants={chipItem}>
                  <Badge variant="sky" className="bg-sky/15 text-sky-light">
                    {skill.icon} {skill.name}
                  </Badge>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-xl">
          <h2 className="font-heading text-3xl font-bold text-ink">One new skill, every single week</h2>
          <p className="mt-4 text-slate">
            Your child doesn't just watch AI, they build with it. Twelve
            weeks, twelve skills, and a project they actually ship.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <Card key={stat.label} variant={stat.highlight ? "highlight" : "default"} className={stat.highlight ? "shadow-lg shadow-sky/30" : ""}>
              <p className="font-heading text-4xl font-bold">{stat.value}</p>
              <p className={`mt-2 text-sm ${stat.highlight ? "text-white/80" : "text-slate"}`}>{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Find the right course — category cards, no search bar */}
      <section className="bg-soft-blue py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-ink">Find the right course for you</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate">
            Every program is built around the tools and skills below —
            pick one that interests you to see where it shows up in our
            courses.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {skillCategories.map((category) => (
              <Link
                key={category.name}
                to="/courses"
                className="flex flex-col items-center gap-3 rounded-2xl bg-white p-5 shadow-sm shadow-ink/5 transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky/10 text-xl">
                  {category.icon}
                </span>
                <span className="text-sm font-medium text-ink">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Programs — top 3 featured, admin-controlled */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-heading text-3xl font-bold text-ink">Programs</h2>
            <p className="max-w-sm text-sm text-slate">
              Pick the path that fits — hands-on beginner training, 1:1
              mentorship, or a freelancer-ready track.
            </p>
          </div>

          {coursesLoading && <p className="mt-10 text-center text-sm text-slate">Loading programs…</p>}
          {!coursesLoading && coursesError && (
            <p className="mt-10 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">{coursesError}</p>
          )}

          {!coursesLoading && !coursesError && (
            <>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {courses.map((course) => (
                  <Card key={course.slug} className="group flex flex-col overflow-hidden border-t-4 border-t-sky transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/10">
                    {course.imageUrl && (
                      <img src={course.imageUrl} alt={course.title} className="-mx-6 -mt-6 mb-4 h-40 w-[calc(100%+3rem)] object-cover" />
                    )}
                    <Badge variant={statusBadgeVariant[course.status]}>{statusLabel[course.status]}</Badge>
                    <h3 className="mt-4 font-heading text-xl font-semibold text-ink">{course.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-slate">{course.description}</p>
                    <div className="mt-4 space-y-1 text-sm text-slate">
                      <p><span className="font-medium text-ink">Price:</span> PKR {course.price.toLocaleString()}</p>
                      <p><span className="font-medium text-ink">Duration:</span> {course.duration}</p>
                      {course.mentor && <p><span className="font-medium text-ink">Mentor:</span> {course.mentor}</p>}
                    </div>
                    <Button as={Link} to={`/courses/${course.slug}`} variant="outline" size="sm" className="mt-6 group-hover:border-sky group-hover:text-sky">
                      View programme
                    </Button>
                  </Card>
                ))}

                {courses.length === 0 && (
                  <p className="col-span-full py-10 text-center text-sm text-slate">
                    No featured programs are set yet — an admin can feature courses from the Courses page.
                  </p>
                )}
              </div>

              {courses.length > 0 && (
                <div className="mt-10 text-center">
                  <Button as={Link} to="/courses" variant="outline" size="lg">
                    View more programs
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-heading text-3xl font-bold text-ink">How it works</h2>
        <p className="mt-3 max-w-xl text-slate">
          From browsing to your first project — here's exactly what happens
          when you join AiLysium.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item) => (
            <Card key={item.step}>
              <p className="font-heading text-3xl font-bold text-sky/30">{item.step}</p>
              <p className="mt-3 font-heading text-lg font-semibold text-ink">{item.title}</p>
              <p className="mt-2 text-sm text-slate">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-heading text-3xl font-bold text-ink">What our happy users say</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky/10 font-heading font-semibold text-sky">
                  {testimonial.name.split(" ").map((part) => part[0]).join("")}
                </div>
                <p className="mt-4 font-heading font-semibold text-ink">{testimonial.name}</p>
                <p className="text-sm text-sky">{testimonial.role}</p>
                <p className="mt-3 text-sm text-slate">{testimonial.summary}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Short About — data left, graphic right */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Badge variant="sky">About AiLysium</Badge>
            <h2 className="mt-4 font-heading text-3xl font-bold text-ink">
              Hands-on AI training, built for real skills
            </h2>
            <p className="mt-4 text-slate">
              AiLysium is based in Pakistan, training teen beginners and
              freelancers to actually build with AI — not just talk about
              it. Every program pairs real mentors with weekly, hands-on
              projects, so students leave with a portfolio, not just notes.
            </p>
            <Button as={Link} to="/about" variant="outline" size="md" className="mt-6">
              Learn more about us
            </Button>
          </div>

          {/* Illustrative graphic, not a stock photo — keeps things honest
              about not having real campus/studio photography yet. */}
          <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-ink">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage: "radial-gradient(rgba(96,165,250,0.18) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="pointer-events-none absolute -top-10 right-[-10%] h-56 w-56 rounded-full bg-sky/25 blur-[100px]" />
            <div className="relative grid grid-cols-2 gap-4 px-8">
              <Card variant="dark" padding="sm" className="text-center">
                <p className="font-heading text-2xl font-bold text-white">Pakistan</p>
                <p className="mt-1 text-xs text-white/60">Based & operating</p>
              </Card>
              <Card variant="dark" padding="sm" className="text-center">
                <p className="font-heading text-2xl font-bold text-white">1:1</p>
                <p className="mt-1 text-xs text-white/60">Mentor feedback</p>
              </Card>
              <Card variant="dark" padding="sm" className="text-center">
                <p className="font-heading text-2xl font-bold text-white">Weekly</p>
                <p className="mt-1 text-xs text-white/60">Hands-on builds</p>
              </Card>
              <Card variant="dark" padding="sm" className="text-center">
                <p className="font-heading text-2xl font-bold text-white">Real</p>
                <p className="mt-1 text-xs text-white/60">Portfolio projects</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-heading text-3xl font-bold text-ink">Frequently asked questions</h2>
            <p className="mt-4 text-sm text-slate">
              Can't find what you're looking for? Reach out and we'll get
              back to you.
            </p>
            <Button as={Link} to="/contact" variant="outline" size="sm" className="mt-6">
              Contact us
            </Button>
          </div>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="relative overflow-hidden bg-ink py-20 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/60 to-transparent" />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Still deciding? Let's talk it through.</h2>
          <p className="max-w-md text-white/70">
            A quick chat is the fastest way to find the right program for
            your goals — no pressure, no sales pitch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button as="a" href="https://wa.me/12345678900" target="_blank" rel="noreferrer" variant="primary" size="lg">
              Chat on WhatsApp
            </Button>
            <Button as={Link} to="/contact" variant="outline" size="lg" className="border-white/25 text-white hover:border-sky hover:text-sky-light">
              Book free consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};