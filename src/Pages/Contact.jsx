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
  FaRegQuestionCircle,
  FaWhatsapp,
  // FaTiktok,
} from "react-icons/fa";
// import { SiX } from "react-icons/si";
import { LuMessageCircleMore } from "react-icons/lu";
import { FiBell } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";



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
      <section className="bg-cloud relative overflow-hidden py-16 md:py-45 2xl:py-60">
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
              <MdOutlineEmail className="text-sky/60 h-5 w-5" />
              <span className="text-ink font-medium">{PLACEHOLDER_EMAIL}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FaWhatsapp className="text-sky/60 h-5 w-5" />
              <span className="text-ink font-medium">{PLACEHOLDER_PHONE}</span>
            </span>
          </div>
        </motion.div>
      </section>

      {/* WhatsApp + Form */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <Reveal id="contact-header" className="text-center">
          <div className="bg-sky text-cloud mx-auto flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14">
            <LuMessageCircleMore className="w-7 h-7" />
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
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-cloud sm:h-10 sm:w-10">
                      <FaWhatsapp className="w-5 h-5" />
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
                    <div className="bg-sky text-cloud flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10">
                      <FiBell className="w-5 h-5" />
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
            <div className="bg-sky text-cloud mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
              <FaRegQuestionCircle className="h-7 w-7" />

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
