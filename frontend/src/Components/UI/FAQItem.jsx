import { motion } from "motion/react";

export const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-slate/10 border-b py-5 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full cursor-pointer items-center justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <span
          className={`font-heading text-[15px] leading-snug font-semibold transition-colors duration-200 ${
            isOpen ? "text-sky" : "text-ink group-hover:text-sky"
          }`}
        >
          {question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-sky shadow-sky/30 rotate-45 text-white shadow-md"
              : "bg-sky/10 text-sky group-hover:bg-sky/20 group-hover:shadow-sky/10 group-hover:shadow-sm"
          }`}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1V13M1 7H13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <p className="text-muted pt-3 text-sm leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
};
