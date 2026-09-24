import { motion } from "motion/react";
import { hasRevealed, markRevealed } from "../../lib/revealStore";

const isMobile = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

export const Reveal = ({
  id,
  children,
  y = 16,
  x = 0,
  delay = 0,
  className = "",
}) => {
  const already = hasRevealed(id);

  if (already) {
    return <div className={className}>{children}</div>;
  }

  const mobile = isMobile();
  const safeY = mobile ? Math.min(y, 12) : y;
  const safeX = mobile ? 0 : x;
  const safeDelay = mobile ? Math.min(delay, 0.08) : delay;
  const duration = mobile ? 0.45 : 0.9;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: safeY, x: safeX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{
        once: true,
        amount: mobile ? 0.2 : 0.15,
        margin: mobile ? "0px" : "-80px",
      }}
      transition={{
        duration,
        delay: safeDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      onViewportEnter={() => markRevealed(id)}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};
