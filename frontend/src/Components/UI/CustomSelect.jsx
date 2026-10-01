import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HiOutlineCheck, HiOutlineChevronDown } from "react-icons/hi";

export const CustomSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selected = options.includes(value) ? value : "";

  return (
    <div ref={containerRef} className="relative">
      <span className="text-ink mb-2 block text-sm font-medium">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-sm transition-all focus:outline-none ${open
            ? "border-sky ring-sky/20 ring-2"
            : "border-slate/20 hover:border-sky/40"
          } ${selected ? "text-ink" : "text-slate/60"}`}
      >
        <span className="truncate">{selected || placeholder}</span>
        <HiOutlineChevronDown
          className={`text-slate/50 h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-30 mt-2 w-full overflow-hidden"
          >
            <div
              data-lenis-prevent
              className="border-slate/10 shadow-ink/10 max-h-60 overflow-y-auto rounded-xl border bg-white py-1 shadow-lg"
            >
              {options.map((option) => {
                const active = option === selected;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${active
                        ? "bg-sky/5 text-sky font-medium"
                        : "text-ink hover:bg-cloud"
                      }`}
                  >
                    <span>{option}</span>
                    {active && <HiOutlineCheck className="h-4 w-4 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
