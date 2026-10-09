import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { FaTimes } from "react-icons/fa";

export const Modal = ({
  open,
  onClose,
  children,
  className = "",
  panelClassName = "",
  closeOnBackdrop = true,
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className={`fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4 ${className}`}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnBackdrop ? onClose : undefined}
            className="bg-ink/40 absolute inset-0 backdrop-blur-sm"
          />

          {/* Panel — bottom sheet on mobile, centered dialog on sm+ */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            className={`sm:shadow-ink/15 relative z-10 max-h-[92dvh] w-full overflow-hidden rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl sm:max-h-[85dvh] sm:max-w-xl sm:rounded-2xl lg:max-w-2xl ${panelClassName}`}
          >
            {/* Accent bar */}
            <span className="from-sky/20 via-sky to-sky/20 absolute inset-x-0 top-0 h-1 bg-gradient-to-r" />

            {/* Drag handle — visual bottom-sheet cue on mobile only */}
            <span className="bg-slate/20 mx-auto mt-3 block h-1 w-10 rounded-full sm:hidden" />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-muted hover:text-ink hover:bg-cloud absolute top-3 right-3 z-20 grid h-8 w-8 cursor-pointer place-items-center rounded-full text-sm transition-colors sm:top-4 sm:right-4 sm:h-9 sm:w-9"
            >
              <FaTimes />
            </button>

            <div
              data-lenis-prevent
              className="scrollbar-neutral max-h-[calc(92dvh-1.5rem)] overflow-y-auto overscroll-contain sm:max-h-[calc(85dvh-1rem)]"
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
