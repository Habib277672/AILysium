import { motion } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../Components/UI/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const PaymentResult = ({ outcome }) => {
  const [searchParams] = useSearchParams();
  const enrollmentId = searchParams.get("enrollmentId");

  const isSuccess = outcome === "success";

  const badgeClass = isSuccess
    ? "from-emerald-400 to-emerald-600 shadow-emerald-500/30"
    : "from-red-400 to-red-500 shadow-red-500/30";
  const ringClass = isSuccess ? "border-emerald-500" : "border-red-500";

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
          },
        },
      }}
      className="mx-auto max-w-2xl px-6 py-20 text-center sm:py-24"
    >
      {/* Animated result badge */}
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
        className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br shadow-lg sm:h-20 sm:w-20 ${badgeClass}`}
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
          className="h-8 w-8 sm:h-10 sm:w-10"
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

      <motion.h1
        variants={fadeUp}
        className="font-heading text-ink mt-5 text-2xl font-extrabold sm:text-3xl"
      >
        {isSuccess ? "You're enrolled!" : "Your payment didn't go through"}
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="text-muted mx-auto mt-2 max-w-md text-sm leading-relaxed sm:text-base"
      >
        {isSuccess
          ? "Your enrollment is confirmed. You can find it anytime in your profile."
          : "No charge was completed. You can try again from your profile."}
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
      >
        <Button
          as={Link}
          to="/profile"
          variant="primary"
          size="lg"
          className="w-full cursor-pointer rounded-full sm:w-auto"
        >
          Go to profile
        </Button>
        {!isSuccess && enrollmentId && (
          <Button
            as={Link}
            to={`/payment?enrollmentId=${enrollmentId}`}
            variant="outline"
            size="lg"
            className="w-full cursor-pointer rounded-full sm:w-auto"
          >
            Try again
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};
