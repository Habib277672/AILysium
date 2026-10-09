import { Link, useLocation, useParams } from "react-router-dom";
import { useAdminUserDetail } from "../../hooks/useAdmin";
import { motion } from "motion/react";
import { Badge } from "../../Components/UI/Badge";
import { Card } from "../../Components/UI/Card";
import { Skeleton } from "../../Components/UI/Skeleton";
import { FaGraduationCap, FaArrowLeft } from "react-icons/fa";

const paymentBadgeVariant = {
  PENDING: "warning",
  CONFIRMED: "success",
  FAILED: "danger",
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const AdminUserDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const {
    data: user,
    isLoading: loading,
    isError: error,
  } = useAdminUserDetail(id);

  // Where the user came from — Enrollments, Users, or Dashboard.
  // Falls back to Users if accessed directly (no state).
  const backTo = location.state?.from || "/admin/users";

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-32 rounded-full" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-7 w-48 max-w-full rounded-lg" />
            <Skeleton className="h-4 w-full max-w-64 rounded-lg" />
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border-slate/10 rounded-2xl border bg-white p-5 shadow-sm"
            >
              <Skeleton className="h-3 w-20 rounded-lg" />
              <Skeleton className="mt-2 h-5 w-36 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div>
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Couldn&apos;t load this user. Please try again.
        </p>
        <Link
          to={backTo}
          className="text-sky mt-4 inline-block text-sm hover:underline"
        >
          ← Back
        </Link>
      </div>
    );
  }

  const details = [
    { label: "Username", value: user.username ? `@${user.username}` : "—" },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phoneNumber || "—" },
    { label: "Joined", value: new Date(user.createdAt).toLocaleDateString() },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="space-y-6 sm:space-y-8"
    >
      {/* Back */}
      <motion.div variants={fadeUp}>
        <Link
          to={backTo}
          className="border-slate/20 text-slate hover:border-sky/50 hover:text-sky inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm font-medium shadow-sm transition-colors"
        >
          <FaArrowLeft className="text-xs" />
          Go back
        </Link>
      </motion.div>

      {/* Profile hero */}
      <motion.div variants={fadeUp}>
        <Card padding="sm" className="sm:p-6 lg:p-8">
          {/* Mobile: centered vertical hero (avatar, badges, name, meta, stat).
              sm+: side-by-side row with the stat pushed to the right */}
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-5 sm:text-left">
            <span className="from-sky to-sky-light grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br text-2xl font-bold text-white">
              {getInitials(user.fullName)}
            </span>

            <div className="min-w-0 sm:flex-1">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Badge className="border-sky border" variant={"sky"}>
                  {user.role}
                </Badge>
                {user.emailVerifiedAt ? (
                  <Badge variant="success">Verified</Badge>
                ) : (
                  <Badge variant="warning">Unverified</Badge>
                )}
              </div>

              <h1 className="font-heading text-ink mt-2 text-2xl leading-tight font-extrabold break-words sm:text-3xl">
                {user.fullName}
              </h1>

              <div className="text-muted mt-1.5 space-y-0.5 text-sm">
                <p className="break-all">{user.email}</p>
              </div>
            </div>

            <div className="bg-sky/5 border-sky/10 shrink-0 rounded-2xl border px-5 py-3 text-center sm:ml-auto">
              <p className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                {user.enrollments.length}
              </p>
              <p className="text-muted text-xs font-medium tracking-wide uppercase">
                Enrollments
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Details */}
      <motion.div variants={fadeUp}>
        <h2 className="font-heading text-ink text-xl font-bold sm:text-2xl">
          Account details
        </h2>

        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="border-slate/10 shadow-ink/5 rounded-2xl border bg-white px-4 py-3 shadow-sm"
            >
              <dt className="text-muted text-xs tracking-wide uppercase">
                {detail.label}
              </dt>
              <dd className="text-ink mt-1 text-sm font-medium break-all">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>

      {/* Enrollment history */}
      <motion.div variants={fadeUp}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-heading text-ink text-xl font-bold sm:text-2xl">
            Enrollment history
          </h2>
          {user.enrollments.length > 0 && (
            <p className="text-muted text-sm">
              {user.enrollments.length}{" "}
              {user.enrollments.length === 1 ? "course" : "courses"}
            </p>
          )}
        </div>

        {user.enrollments.length === 0 ? (
          <Card padding="sm" className="mt-4 text-center sm:p-6 lg:p-8">
            <span className="bg-slate/10 text-slate mx-auto grid h-12 w-12 place-items-center rounded-full">
              <FaGraduationCap className="text-xl" />
            </span>
            <p className="text-slate mt-3 text-sm">
              This user hasn&apos;t enrolled in any courses yet.
            </p>
          </Card>
        ) : (
          <div className="mt-4 grid gap-3">
            {user.enrollments.map((enrollment) => (
              <Card
                key={enrollment.id}
                padding="sm"
                className="hover:border-sky/20 hover:shadow-sky/5 flex flex-wrap items-center justify-between gap-4 transition-all sm:p-6"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="bg-sky/10 text-sky grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                    <FaGraduationCap />
                  </span>
                  <div className="min-w-0">
                    <p className="text-ink truncate font-medium">
                      {enrollment.course.title}
                    </p>
                    <p className="text-slate mt-0.5 text-xs">
                      Enrolled{" "}
                      {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Badge
                  className="ml-auto shrink-0"
                  variant={
                    paymentBadgeVariant[enrollment.paymentStatus] ?? "sky"
                  }
                >
                  {enrollment.paymentStatus}
                </Badge>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
