import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Reveal } from "../Components/UI/Reveal";

const sections = [
  {
    title: "Acceptance of terms",
    body: "By accessing AiLysium, creating an account, or enrolling in a program, you agree to these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use the platform.",
  },
  {
    title: "Eligibility",
    body: "AiLysium offers AI training programs, with a focus on teen beginners and freelancers. If you are under 18, you may only use the platform with the consent of a parent or guardian. By registering, you confirm that the information you provide is accurate and that you meet these eligibility requirements.",
  },
  {
    title: "Your account",
    body: "You are responsible for keeping your login credentials confidential and for all activity that happens under your account. Notify us immediately if you suspect unauthorized access. Accounts are personal — you may not share, sell, or transfer them.",
  },
  {
    title: "Programs, enrollment, and payment",
    body: "Course descriptions, schedules, and prices may change before you enroll. A spot in a program is confirmed only after your payment is successfully processed. We reserve the right to cancel or reschedule sessions; if we cancel a program you paid for, you will be offered a replacement session or a refund.",
  },
  {
    title: "Refunds and cancellations",
    body: "Refund eligibility depends on the program and how far it has progressed at the time of your request. To request a cancellation or refund, contact us through our contact page and we will review your case. Approved refunds are returned through the original payment method.",
  },
  {
    title: "Communications",
    body: "By registering, you agree to receive service-related messages from us — verification emails, enrollment updates, and program notices — via email and WhatsApp. You can opt out of promotional messages at any time, but we will still send essential account and service messages.",
  },
  {
    title: "Acceptable use",
    body: "You agree not to:",
    items: [
      "Share your account or access another user's account.",
      "Copy, resell, or redistribute program materials outside your enrolled cohort.",
      "Use the platform for any unlawful, harmful, or fraudulent purpose.",
      "Interfere with the site's operation — including attempting to breach security or overload our systems.",
      "Post or transmit content that infringes the rights of others.",
    ],
  },
  {
    title: "Intellectual property",
    body: "All AiLysium content — course materials, videos, slides, platform design, and branding — belongs to AiLysium or its licensors and is protected by copyright. We grant you a limited, personal license to use these materials for your own learning during your enrollment. Projects you create during a program belong to you.",
  },
  {
    title: "Third-party tools and links",
    body: "Our AI tools directory and programs reference third-party services. Those tools are governed by their own terms and policies — we are not responsible for their content, availability, or practices. Using a third-party tool is at your own discretion.",
  },
  {
    title: "Disclaimers",
    body: "AiLysium is provided “as is” and “as available”. While we aim to deliver high-quality training, we do not guarantee any specific learning outcome, income, certification, or employment result from completing a program. Technical interruptions may occasionally occur.",
  },
  {
    title: "Limitation of liability",
    body: "To the maximum extent permitted by law, AiLysium shall not be liable for indirect, incidental, or consequential damages arising from your use of the platform. Our total liability for any claim related to the service is limited to the amount you paid us for the program in question.",
  },
  {
    title: "Termination",
    body: "We may suspend or terminate your access if you violate these terms, or if required to protect the platform or other users. You may stop using AiLysium and request account deletion at any time through our contact page.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these Terms & Conditions from time to time. The “Last updated” date at the top of this page will reflect the latest version. Continued use of the platform after changes means you accept the revised terms.",
  },
  {
    title: "Contact us",
    body: "Questions about these Terms & Conditions? Reach out through our contact page and we'll get back to you.",
    link: { to: "/contact", label: "Contact AiLysium" },
  },
];

export const TermsConditions = () => {
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
            Legal
          </span>
          <h1 className="font-heading text-ink mt-4 text-3xl leading-tight font-extrabold sm:text-4xl md:mt-5 md:text-5xl">
            Terms &{" "}
            <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
              Conditions
            </span>
          </h1>
          <p className="text-muted mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base md:mt-5">
            The ground rules for using AiLysium — your rights, our commitments,
            and what we expect from each other.
          </p>
          <p className="text-muted/60 mt-3 text-xs font-medium tracking-wider uppercase">
            Last updated: September 2026
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
        <Reveal id="terms-intro" y={10}>
          <p className="text-slate text-sm leading-relaxed">
            These Terms & Conditions govern your use of the AiLysium platform,
            website, and programs. Please read them carefully — they form a
            binding agreement between you and AiLysium.
          </p>
        </Reveal>

        {sections.map((section, index) => (
          <Reveal
            key={section.title}
            id={`terms-section-${index}`}
            y={10}
            delay={0.03}
            className="mt-8 sm:mt-10"
          >
            <h2 className="font-heading text-ink text-lg font-bold sm:text-xl">
              <span className="text-sky mr-2 text-sm font-extrabold">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </h2>
            <p className="text-muted mt-2.5 text-sm leading-relaxed">
              {section.body}
            </p>
            {section.items && (
              <ul className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="text-muted flex gap-2.5 text-sm leading-relaxed"
                  >
                    <span className="bg-sky/40 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.link && (
              <Link
                to={section.link.to}
                className="text-sky hover:text-sky-light mt-3 inline-block text-sm font-semibold transition-colors hover:underline"
              >
                {section.link.label} →
              </Link>
            )}
          </Reveal>
        ))}
      </section>
    </div>
  );
};
