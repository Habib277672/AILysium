import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { useCourses } from "../hooks/useCourses";
import { useSubmitContactMessage } from "../hooks/useContact";
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import { PhoneInput } from "../Components/UI/PhoneInput";
import { CustomSelect } from "../Components/UI/CustomSelect";
import { FAQItem } from "../Components/UI/FAQItem";
import { ConsultationSection } from "../Components/UI/ConsultationSection";
import { Reveal } from "../Components/UI/Reveal";
import {
  FaInstagram,
  FaFacebookF,
  // FaYoutube,
  FaLinkedinIn,
  // FaTiktok,
} from "react-icons/fa";
// import { SiX } from "react-icons/si";

const PLACEHOLDER_EMAIL = " ailysiumofficial@gmail.com";
const PLACEHOLDER_PHONE = "+923111390351";
const WHATSAPP_LINK = `https://wa.me/${PLACEHOLDER_PHONE.replace("+", "")}`;

const contactFaqs = [
  {
    question: "Can I speak to the instructor first?",
    answer:
      "Yes. A free consultation is available on WhatsApp at 0311 1390351. You can ask questions, meet the instructor and see exactly what you or your child will learn.",
  },
  {
    question: "Are classes live?",
    answer:
      "Yes. Classes are live online with a trainer present in every session.",
  },
  {
    question: "How long is each class?",
    answer:
      "Each class is one hour. The Kids AI Course has 6 classes per week for 12 weeks, which makes 72 live classes in total.",
  },
  {
    question: "Does my child need any experience?",
    answer: "No. The Kids AI Course starts from zero.",
  },
  {
    question: "Is it safe for children?",
    answer:
      "Yes. We require parent permission, use supervised accounts, share no personal details on AI tools, and keep a live trainer in every class.",
  },
  {
    question: "What does a student finish with?",
    answer:
      "A working project, a portfolio piece and a certificate. Every week also ends with something the student created.",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  program: "",
  age: "",
  message: "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Contact = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const description =
      "Contact AiLysium in Gujranwala for a free consultation about our AI courses, Studio services or partnerships.";
    let meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    document.title = "Contact AiLysium Academy | WhatsApp 0311 1390351";
    meta.setAttribute("content", description);
    return () => {
      document.title = previousTitle;
      if (previousDescription === null) meta.remove();
      else meta.setAttribute("content", previousDescription);
    };
  }, []);

  // Live, AVAILABLE-only course titles — replaces the old hardcoded
  // programOptions array. If admin renames/adds/removes a course, this
  // dropdown reflects it automatically, no code change needed here.
  const OTHER_OPTION = "Other";
  const { data: courses = [], isLoading: coursesLoading } = useCourses();
  const availablePrograms = courses
    .filter((course) => course.status === "AVAILABLE")
    .map((course) => course.title);

  const programOptions = [...availablePrograms, OTHER_OPTION];

  const submitMessage = useSubmitContactMessage();

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.program) {
      setError("Please select which program you're interested in.");
      return;
    }

    try {
      await submitMessage.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        program: form.program,
        age: Number(form.age),
        message: form.message,
      });
      toast.success("Message sent — we'll get back to you soon.");
      setSubmitted(true);
    } catch (err) {
      const message =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-cloud relative overflow-hidden py-16 md:py-45">
        <div className="pointer-events-none absolute top-0 left-0 h-48 w-full bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="bg-sky/15 pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl px-6 text-center"
        >
          <h1 className="font-heading text-ink text-3xl leading-tight font-extrabold sm:text-4xl md:text-5xl">
            Contact AiLysium to{" "}
            <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
              <br />
              Start Learning AI
            </span>
          </h1>
          <div className="text-muted mt-4 flex flex-col items-center gap-3 text-sm sm:mt-5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <span className="flex items-center gap-1.5">
              <svg
                className="text-sky/60 h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2 4.5V12a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0014 12V4.5M8 1.5v9M5 4l3-2.5 3 2.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-ink font-medium">{PLACEHOLDER_EMAIL}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="text-sky/60 h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3.5 1.5h9a1 1 0 011 1v11a1 1 0 01-1 1h-9a1 1 0 01-1-1v-11a1 1 0 011-1zM6 7h4M6 9.5h4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-ink font-medium">{PLACEHOLDER_PHONE}</span>
            </span>
          </div>
        </motion.div>
      </section>

      {/* WhatsApp + Form */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <Reveal id="contact-header" className="text-center">
          <div className="bg-sky/10 text-sky mx-auto flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14">
            <svg
              className="h-6 w-6 sm:h-7 sm:w-7"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="font-heading text-ink mt-4 text-2xl font-bold sm:mt-5 sm:text-3xl">
            Get In{" "}
            <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-muted mx-auto mt-2.5 max-w-lg text-sm sm:mt-3">
            Have questions about our programs? Message us on WhatsApp or fill
            out the form below and we will get back to you shortly.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 md:grid-cols-[1fr_1.4fr]">
          {/* Left column */}
          <div className="flex h-full flex-col justify-between gap-4 sm:gap-5">
            {/* WhatsApp card */}
            <Reveal id="contact-whatsapp" x={-20}>
              <div className="border-slate/10 bg-cloud hover:shadow-sky/8 overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 sm:h-10 sm:w-10">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <h2 className="font-heading text-ink text-base font-bold sm:text-lg">
                      Chat with AiLysium on WhatsApp
                    </h2>
                  </div>
                </div>
                <div className="px-5 py-4 sm:px-6 sm:py-5">
                  <p className="text-muted text-sm leading-relaxed">
                    Ask us anything about the Kids AI Course, Studio services or
                    partnerships. Message us on WhatsApp or use the form and we
                    will help you get started.
                  </p>
                  <Button
                    as="a"
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                    size="md"
                    className="mt-4 w-full cursor-pointer rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 sm:mt-5"
                  >
                    Message us on WhatsApp
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Social media card */}
            <Reveal id="contact-social" x={-20} delay={0.1}>
              <div className="border-slate/10 bg-cloud hover:shadow-sky/8 overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="from-sky/10 to-sky-light/5 bg-gradient-to-r px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-sky/15 text-sky flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                      </svg>
                    </div>
                    <h2 className="font-heading text-ink text-base font-bold sm:text-lg">
                      Follow AiLysium
                    </h2>
                  </div>
                </div>
                <div className="px-5 py-4 sm:px-6 sm:py-5">
                  <p className="text-muted text-sm leading-relaxed">
                    Stay updated with our latest AI tips, student projects and
                    course announcements.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-2.5">
                    {[
                      {
                        icon: FaInstagram,
                        label: "Instagram",
                        href: "https://www.instagram.com/ailysiumofficial2026/?hl=en",
                      },
                      {
                        icon: FaFacebookF,
                        label: "Facebook",
                        href: "https://www.facebook.com/profile.php?id=61592615186779",
                      },
                      // { icon: SiX, label: "X", href: "#" },
                      // { icon: FaYoutube, label: "YouTube", href: "#" },
                      {
                        icon: FaLinkedinIn,
                        label: "LinkedIn",
                        href: "https://www.linkedin.com/company/145248085",
                      },
                      // { icon: FaTiktok, label: "TikTok", href: "#" },
                    ].map(({ icon: Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="border-slate/10 text-muted hover:border-sky/30 hover:text-sky flex h-9 w-9 items-center justify-center rounded-xl border bg-white transition-all duration-200 hover:shadow-sm sm:h-10 sm:w-10"
                        title={label}
                      >
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Contact form */}
          <Reveal id="contact-form" x={20} delay={0.1} className="h-full">
            <div className="border-slate/10 bg-cloud h-full rounded-lg border p-4 shadow-sm sm:p-6">
              {submitted ? (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.05,
                      },
                    },
                  }}
                  className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center"
                >
                  {/* Animated success badge */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.6 },
                      show: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                    className="from-sky to-sky-light shadow-sky/30 relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br shadow-lg"
                  >
                    {/* Pulse ring */}
                    <motion.span
                      aria-hidden="true"
                      className="border-sky absolute inset-0 rounded-full border-2"
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.6 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                    />
                    <svg
                      className="h-8 w-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.45,
                          delay: 0.3,
                          ease: "easeOut",
                        }}
                      />
                    </svg>
                  </motion.div>

                  <motion.p
                    variants={fadeUp}
                    className="font-heading text-ink mt-1 text-xl font-bold"
                  >
                    Message sent
                  </motion.p>
                  <motion.p
                    variants={fadeUp}
                    className="text-muted max-w-sm text-sm"
                  >
                    Thanks for reaching out, we'll get back to you soon.
                  </motion.p>
                  <motion.div variants={fadeUp}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer rounded-full"
                      onClick={() => {
                        setForm(initialForm);
                        setSubmitted(false);
                      }}
                    >
                      Send another message
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <>
                  {error && (
                    <div className="mb-5 flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="grid gap-3 sm:gap-4">
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                      <Input
                        id="name"
                        label="Name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                      <PhoneInput
                        label="Phone"
                        value={form.phone}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, phone: value }))
                        }
                        required
                      />
                      <Input
                        id="age"
                        label="Student's age"
                        type="number"
                        min="1"
                        placeholder="e.g. 17"
                        value={form.age}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <CustomSelect
                      label="Which program are you interested in?"
                      value={form.program}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, program: value }))
                      }
                      options={programOptions}
                      placeholder={
                        coursesLoading
                          ? "Loading programs…"
                          : "Select a program"
                      }
                      disabled={coursesLoading}
                    />

                    <Input
                      id="message"
                      label="Message"
                      as="textarea"
                      placeholder="Tell us a bit about what you're looking for"
                      value={form.message}
                      onChange={handleChange}
                      style={{ minHeight: 100 }}
                      required
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={submitMessage.isPending}
                      className="shadow-sky/20 w-full cursor-pointer justify-self-start rounded-full px-6 shadow-lg"
                    >
                      {submitMessage.isPending ? "Sending..." : "Send message"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact FAQs */}
      <section className="bg-cloud relative overflow-hidden py-20 md:py-24">
        <div className="relative mx-auto max-w-3xl px-6">
          <Reveal id="contact-faq-header" className="text-center">
            <div className="bg-sky/10 text-sky mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="font-heading text-ink mt-5 text-3xl font-bold">
              Common{" "}
              <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-muted mt-3 text-sm">
              Everything you need to know before getting started
            </p>
          </Reveal>
          <Reveal
            id="contact-faq-list"
            delay={0.1}
            className="border-slate/10 mt-8 rounded-3xl border bg-white p-6 shadow-sm"
          >
            {contactFaqs.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === faq.question}
                onToggle={() =>
                  setOpenFaq(openFaq === faq.question ? null : faq.question)
                }
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* Consultation CTA */}
      <Reveal id="contact-consultation">
        <ConsultationSection
          heading={
            <>
              Start Your{" "}
              <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
                AI Journey{" "}
              </span>
              Today
            </>
          }
          description="Book a free consultation, meet the instructor and see exactly what you or your child will learn. Every week ends with something real that you built."
          primaryCta={{
            text: "Chat on WhatsApp",
            href: "https://wa.me/03111390351",
          }}
          secondaryCta={{ text: "Explore programs", to: "/courses" }}
        />
      </Reveal>
    </div>
  );
};
