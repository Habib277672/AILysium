import { useEffect, useRef, useState } from "react";

export const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  const [height, setHeight] = useState(isOpen ? "auto" : "0px");
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      setHeight(`${contentRef.current.scrollHeight}px`);
      const timer = setTimeout(() => setHeight("auto"), 300);
      return () => clearTimeout(timer);
    } else {
      setHeight(`${contentRef.current.scrollHeight}px`);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeight("0px");
        });
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-slate/10 py-5 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full cursor-pointer items-center justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <span className={`font-heading text-[15px] font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-sky" : "text-ink group-hover:text-sky"}`}>
          {question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen
              ? "rotate-45 bg-sky text-white shadow-md shadow-sky/30"
              : "bg-sky/10 text-sky group-hover:bg-sky/20 group-hover:shadow-sm group-hover:shadow-sky/10"
          }`}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ maxHeight: height }}
      >
        <p ref={contentRef} className="pt-3 text-sm leading-relaxed text-muted">
          {answer}
        </p>
      </div>
    </div>
  );
};
