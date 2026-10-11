import { Link } from "react-router-dom";

export const ConsultationSection = ({
  heading = <>Still deciding? Let's <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">talk</span> it through.</>,
  description = "Book a free consultation to ask your questions, meet the instructor and see exactly what you or your child will learn. No pressure and no commitment.",
  primaryCta = { text: "Chat on WhatsApp", href: "https://wa.me/+923111390351" },
  secondaryCta = { text: "Book free consultation", to: "/contact" },
}) => {
  return (
    <section className="relative overflow-hidden bg-cloud py-14 md:py-28">
      <div className="pointer-events-none absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />
      <div className="bg-sky/10 pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center sm:gap-5">
        <h2 className="font-heading text-[21px] font-bold leading-snug text-ink tracking-tight sm:text-3xl md:text-[2.75rem] md:leading-tight">
          {heading}
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
        <div className="mt-2 flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          {primaryCta.to ? (
            <Link
              to={primaryCta.to}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky/25 transition-all duration-200 hover:bg-sky-light hover:shadow-sky/40 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              {primaryCta.text}
            </Link>
          ) : (
            <a
              href={primaryCta.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky/25 transition-all duration-200 hover:bg-sky-light hover:shadow-sky/40 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              {primaryCta.text}
            </a>
          )}
          <Link
            to={secondaryCta.to}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-sky/30 px-6 py-3 text-sm font-semibold text-sky transition-all duration-200 hover:border-sky hover:bg-sky/5 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
          >
            {secondaryCta.text}
          </Link>
        </div>
      </div>
    </section>
  );
};
