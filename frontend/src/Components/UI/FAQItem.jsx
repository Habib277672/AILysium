import { useState } from "react";

export const FAQItem = ({ question, answer, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-slate/10 py-5">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={open}
            >
                <span className="font-heading text-base font-semibold text-ink">
                    {question}
                </span>
                <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky/10 text-sky transition-transform ${open ? "rotate-45" : ""
                        }`}
                    aria-hidden="true"
                >
                    +
                </span>
            </button>
            {open && <p className="mt-3 text-sm text-slate">{answer}</p>}
        </div>
    );
};