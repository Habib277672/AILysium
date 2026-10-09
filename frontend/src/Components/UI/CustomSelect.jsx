import { useCallback, useEffect, useRef, useState } from "react";
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
  const [placement, setPlacement] = useState({
    direction: "down",
    maxHeight: 240,
  });
  const containerRef = useRef(null);

  // Measure the space around the trigger and flip the panel upward when the
  // viewport ends below it — also cap the panel height to what fits.
  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const below = window.innerHeight - rect.bottom - 20;
    const above = rect.top - 20;
    const direction = below >= 200 || below >= above ? "down" : "up";
    const available = direction === "down" ? below : above;
    const maxHeight = Math.max(140, Math.min(240, available));
    setPlacement((prev) =>
      prev.direction === direction && prev.maxHeight === maxHeight
        ? prev
        : { direction, maxHeight },
    );
  }, []);

  // Keep the placement honest while the panel is open (scroll / resize).
  useEffect(() => {
    if (!open) return;
    const handleMove = () => measure();
    window.addEventListener("resize", handleMove);
    window.addEventListener("scroll", handleMove, true);
    return () => {
      window.removeEventListener("resize", handleMove);
      window.removeEventListener("scroll", handleMove, true);
    };
  }, [open, measure]);

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

  // Accepts plain strings ("Open") or { value, label } objects so callers can
  // use a display label that differs from the stored value.
  const items = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option,
  );
  const selectedItem = items.find((item) => item.value === value);

  return (
    <div ref={containerRef} className="relative">
      <span className="text-ink mb-2 block text-sm font-medium">{label}</span>
      <button
        type="button"
        onClick={() => {
          if (!open) measure();
          setOpen((prev) => !prev);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-sm transition-all focus:outline-none ${open
          ? "border-sky ring-sky/20 ring-2"
          : "border-slate/20 hover:border-sky/40"
          } ${selectedItem ? "text-ink" : "text-slate/60"}`}
      >
        <span className="truncate">{selectedItem?.label || placeholder}</span>
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
            className={`absolute z-30 w-full overflow-hidden ${placement.direction === "up"
              ? "bottom-full mb-2"
              : "top-full mt-2"
              }`}
          >
            <div
              data-lenis-prevent
              style={{ maxHeight: placement.maxHeight }}
              className="border-slate/10 shadow-ink/10 overflow-y-auto rounded-xl border bg-white py-1 shadow-lg"
            >
              {items.map((option) => {
                const active = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${active
                      ? "bg-sky/5 text-sky font-medium"
                      : "text-ink hover:bg-cloud"
                      }`}
                  >
                    <span className="min-w-0 truncate">{option.label}</span>
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
