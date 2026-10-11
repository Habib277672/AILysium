import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HiArrowUp } from "react-icons/hi";
import { getLenis } from "../../lib/smoothScroll";

const SHOW_AFTER = 400;

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1, force: true, lock: false });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={handleScrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="bg-sky hover:bg-sky-hover shadow-sky/30 hover:shadow-sky/40 fixed right-2 bottom-5 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition-colors duration-200 hover:shadow-xl md:right-5 md:bottom-8"
        >
          <HiArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
