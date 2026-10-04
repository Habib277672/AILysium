import { useState } from "react";
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
  // Freeze the revealed flag at mount. Reading it on every render made this
  // component switch element types (motion.div → div) once the section had
  // been revealed, which remounted the whole subtree on the next state
  // update — blowing away input focus and replaying layoutId animations.
  const [already] = useState(() => hasRevealed(id));

  const mobile = isMobile();
  const safeY = mobile ? Math.min(y, 12) : y;
  const safeX = mobile ? 0 : x;
  const safeDelay = mobile ? Math.min(delay, 0.08) : delay;
  const duration = mobile ? 0.45 : 0.9;

  return (
    <motion.div
      className={className}
      initial={already ? false : { opacity: 0, y: safeY, x: safeX }}
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
      style={already ? undefined : { willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};
