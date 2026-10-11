import { motion } from "motion/react";

// The animated gradient badge from PaymentResult — scale-in circle, pulse
// ring, and an SVG check/cross that draws itself. Reused on Signup and
// VerifyEmail success/error states.
export const ResultBadge = ({ variant = "success", className = "" }) => {
  const isSuccess = variant === "success";

  const badgeClass = isSuccess
    ? "from-emerald-400 to-emerald-600 shadow-emerald-500/30"
    : "from-red-400 to-red-500 shadow-red-500/30";
  const ringClass = isSuccess ? "border-emerald-500" : "border-red-500";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.6 },
        show: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={`relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br shadow-lg sm:h-16 sm:w-16 ${badgeClass} ${className}`}
    >
      {/* Pulse ring */}
      <motion.span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full border-2 ${ringClass}`}
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: 0, scale: 1.6 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      />
      <svg
        className="h-7 w-7 sm:h-8 sm:w-8"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {isSuccess ? (
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.45,
              delay: 0.3,
              ease: "easeOut",
            }}
          />
        ) : (
          <>
            <motion.path
              d="M7 7l10 10"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.35,
                delay: 0.3,
                ease: "easeOut",
              }}
            />
            <motion.path
              d="M17 7L7 17"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.35,
                delay: 0.45,
                ease: "easeOut",
              }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};
