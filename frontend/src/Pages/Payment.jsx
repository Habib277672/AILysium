import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { motion } from "motion/react";
import { useMyEnrollments } from "../hooks/useEnrollments";
import { useCreatePayment } from "../hooks/useEnrollmentMutations";
import toast from "react-hot-toast";
import { Button } from "../Components/UI/Button";
import { Skeleton } from "../Components/UI/Skeleton";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineCreditCard,
} from "react-icons/hi";

export const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const enrollmentId = searchParams.get("enrollmentId");

  // Passed directly from the enroll page so this page can render instantly —
  // the enroll flow invalidates the list query right before navigating here,
  // which used to flash a skeleton and then a blank intro frame (the "blink").
  const enrollmentFromState = location.state?.enrollment;

  const {
    data: enrollments = [],
    isLoading: loading,
    error,
  } = useMyEnrollments({ enabled: !enrollmentFromState });
  const enrollment =
    enrollmentFromState ?? enrollments.find((e) => e.id === enrollmentId);

  // Only run the intro animation when content appears without a skeleton gap —
  // replaying a fade from opacity 0 right after a skeleton is what blinked.
  const [hadSkeleton] = useState(() => loading && !enrollmentFromState);

  const createPayment = useCreatePayment();

  const handleSimulatePayment = (outcome) => {
    createPayment.mutate(
      { enrollmentId, simulateOutcome: outcome },
      {
        onSuccess: (data) => {
          if (data.status === "CONFIRMED") {
            navigate(`/payment/success?enrollmentId=${enrollmentId}`, {
              replace: true,
            });
          } else {
            navigate(`/payment/failed?enrollmentId=${enrollmentId}`, {
              replace: true,
            });
          }
        },

        onError: (err) => {
          const message =
            err.response?.data?.error ||
            "Payment could not be processed. Please try again.";

          toast.error(message);
        },
      },
    );
  };

  if (!enrollment && loading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
          <Skeleton className="mt-6 h-12 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center sm:py-24">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 sm:h-14 sm:w-14">
          <HiOutlineExclamationCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <h1 className="font-heading text-ink mt-5 text-xl font-bold sm:text-2xl">
          {error || "This enrollment could not be found."}
        </h1>
        <p className="text-muted mt-2 text-sm">
          It may have been removed or the link is incorrect.
        </p>
        <Button
          as={Link}
          to="/courses"
          variant="primary"
          size="lg"
          className="mt-8 cursor-pointer rounded-full"
        >
          Browse courses
        </Button>
      </div>
    );
  }

  if (enrollment.paymentStatus === "CONFIRMED") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center sm:py-24">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 sm:h-14 sm:w-14">
          <HiOutlineCheckCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <h1 className="font-heading text-ink mt-5 text-xl font-bold sm:text-2xl">
          This enrollment is already confirmed
        </h1>
        <p className="text-muted mt-2 text-sm">
          No payment needed — you're all set.
        </p>
        <Button
          as={Link}
          to="/profile"
          variant="primary"
          size="lg"
          className="mt-8 cursor-pointer rounded-full"
        >
          Go to profile
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={hadSkeleton ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-2xl px-5 py-12 sm:px-6 sm:py-16"
    >
      {/* Header */}
      <div className="text-center">
        <div className="from-sky to-sky-light shadow-sky/25 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg sm:h-16 sm:w-16">
          <HiOutlineCreditCard className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>
        <h1 className="font-heading text-ink mt-4 text-2xl font-extrabold sm:text-3xl">
          Complete your{" "}
          <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
            payment
          </span>
        </h1>
        <p className="text-muted mx-auto mt-2 max-w-md text-sm leading-relaxed">
          {enrollment.course.title}, a real payment gateway isn't connected yet,
          so this uses a simulated payment for now.
        </p>
      </div>

      {/* Card */}
      <div className="border-slate/10 shadow-sky/10 relative mx-auto mt-8 max-w-md overflow-hidden rounded-3xl border bg-white p-6 shadow-2xl sm:p-8">
        {/* Soft decorative glows */}
        <div className="bg-sky/10 pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl" />
        <div className="bg-sky/5 pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full blur-3xl" />

        {/* Top accent line */}
        <div className="from-sky/20 via-sky to-sky/20 absolute inset-x-0 top-0 h-1 bg-gradient-to-r" />

        <div className="relative">
          {/* Heading */}
          <div className="mb-6 text-center">
            <span className="border-sky/20 bg-sky/8 text-sky inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="bg-sky absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                <span className="bg-sky relative inline-flex h-2 w-2 rounded-full" />
              </span>
              Final step
            </span>
            <h2 className="font-heading text-ink mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Complete your payment
            </h2>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              Review your enrollment below, then confirm to secure your spot.
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
              <HiOutlineExclamationCircle className="h-5 w-5 shrink-0 text-red-500" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Summary */}
          <div className="border-sky/15 from-sky/8 via-sky/3 overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent">
            <div className="flex items-center justify-between gap-4 px-4 py-4">
              <span className="text-muted shrink-0 text-sm">Course</span>
              <span className="text-ink truncate text-right font-semibold">
                {enrollment.course.title}
              </span>
            </div>

            <div className="bg-sky/10 h-px" />

            <div className="flex items-center justify-between gap-4 px-4 py-4">
              <span className="text-muted shrink-0 text-sm">Status</span>
              <span className="text-cloud inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold capitalize">
                <span className="bg-cloud/80 h-1.5 w-1.5 rounded-full" />
                {enrollment.paymentStatus}
              </span>
            </div>

            {enrollment.course.price !== undefined && (
              <>
                <div className="bg-sky/10 h-px" />
                <div className="flex items-center justify-between gap-4 px-4 py-4">
                  <span className="text-muted shrink-0 text-sm">Total</span>
                  <span className="font-heading text-ink text-xl font-extrabold tracking-tight">
                    {enrollment.course.isFree ? (
                      <span className="text-sky">Free of Cost</span>
                    ) : (
                      <>
                        <span className="text-sky mr-1 text-sm font-bold">
                          PKR
                        </span>
                        {Number(enrollment.course.price).toLocaleString()}
                      </>
                    )}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* CTA */}
          <Button
            variant="primary"
            size="lg"
            className="shadow-sky/25 hover:shadow-sky/35 mt-6 w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:translate-y-0 disabled:shadow-none"
            onClick={() => handleSimulatePayment("succeed")}
            disabled={createPayment.isPending}
          >
            {createPayment.isPending ? "Processing..." : "Simulate Payment"}
          </Button>

          {/* Reassurance */}
          <p className="text-muted mt-4 text-center text-xs">
            Your spot is confirmed only after the payment is processed.
          </p>

          <button
            type="button"
            onClick={() => handleSimulatePayment("fail")}
            disabled={createPayment.isPending}
            className="text-slate/50 hover:text-slate mt-3 w-full cursor-pointer text-center text-xs underline underline-offset-2 transition-colors"
          >
            (dev only) simulate a failed payment
          </button>
        </div>
      </div>
    </motion.div>
  );
};
