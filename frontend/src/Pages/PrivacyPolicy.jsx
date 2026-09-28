import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Reveal } from "../Components/UI/Reveal";

const sections = [
  {
    title: "Information we collect",
    body: "We collect information you provide directly when you create an account or use AiLysium:",
    items: [
      "Account details — your full name, email address, and WhatsApp phone number.",
      "Credentials — your password, which is stored only in hashed form and never in plain text.",
      "Enrollment and payment records — the programs you enroll in, payment status, and transaction references.",
      "Communications — messages you send us through the contact form, email, or WhatsApp.",
    ],
  },
  {
    title: "How we use your information",
    body: "We use the information we collect to:",
    items: [
      "Create and manage your account, and verify your email address.",
      "Process enrollments, payments, and send receipts.",
      "Deliver programs you enroll in, including sessions, mentor feedback, and course updates.",
      "Respond to your questions and send service-related notifications (verification, password resets, enrollment updates).",
      "Improve AiLysium — understanding how the platform is used so we can fix issues and improve the experience.",
      "Keep the platform secure and prevent fraud or abuse.",
    ],
  },
  {
    title: "Payment information",
    body: "Payments are handled by third-party payment processors. AiLysium does not store your full card number or bank credentials on its own servers — we only receive confirmation of the transaction (amount, status, and reference) so we can activate your enrollment.",
  },
  {
    title: "How we share your information",
    body: "We do not sell your personal information. We only share it in these situations:",
    items: [
      "Service providers who help us operate — such as hosting, email delivery, and payment processing — bound to use your data only for those services.",
      "Legal requirements — if we are required to disclose information by law, regulation, or legal process.",
      "Business transfers — if AiLysium is involved in a merger or acquisition, your data may transfer under the same protections described here.",
    ],
  },
  {
    title: "Data retention",
    body: "We keep your account information for as long as your account is active. If you delete your account, we remove your personal data within a reasonable period, except records we must keep for legal, accounting, or security reasons (such as payment records required by law).",
  },
  {
    title: "Security",
    body: "We protect your information with industry-standard measures — hashed passwords, encrypted connections (HTTPS), and restricted access to stored data. No method of transmission or storage is 100% secure, but we work to keep your data as safe as possible.",
  },
  {
    title: "Your rights and choices",
    body: "You can:",
    items: [
      "Access and update your profile information at any time from your account page.",
      "Request a copy of the data we hold about you, or ask us to correct or delete it.",
      "Opt out of non-essential communications — service messages (receipts, verification) will still be sent.",
      "Delete your account by contacting us through our contact page.",
    ],
  },
  {
    title: "Cookies and similar technologies",
    body: "AiLysium uses essential storage to keep you logged in and to remember your session. We may also use analytics to understand general usage patterns (such as which pages are visited). You can clear cookies and local storage through your browser settings at any time.",
  },
  {
    title: "Children's privacy",
    body: "AiLysium is designed for teens learning AI skills. If you are under 18, you should use the platform with the knowledge and consent of a parent or guardian. We do not knowingly collect personal information from children who are not permitted to use the service — if you believe a child has provided us data improperly, contact us and we will delete it.",
  },
  {
    title: "Third-party services",
    body: "Our site may link to external websites, AI tool directories, or payment providers. Their privacy practices are governed by their own policies, not ours — we encourage you to review them.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date at the top of this page. Continued use of AiLysium after changes means you accept the updated policy.",
  },
  {
    title: "Contact us",
    body: "If you have questions about this Privacy Policy or how your data is handled, reach out to us through our contact page — we'll respond as soon as we can.",
    link: { to: "/contact", label: "Contact AiLysium" },
  },
];

export const PrivacyPolicy = () => {
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
            Privacy{" "}
            <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-muted mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base md:mt-5">
            How AiLysium collects, uses, and protects your information — in
            plain language, no legalese.
          </p>
          <p className="text-muted/60 mt-3 text-xs font-medium tracking-wider uppercase">
            Last updated: September 2026
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
        <Reveal id="privacy-intro" y={10}>
          <p className="text-slate text-sm leading-relaxed">
            This Privacy Policy explains how AiLysium (“we”, “us”, “our”)
            handles your personal information when you use our website and
            services. By creating an account or using the platform, you agree to
            the practices described below.
          </p>
        </Reveal>

        {sections.map((section, index) => (
          <Reveal
            key={section.title}
            id={`privacy-section-${index}`}
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
