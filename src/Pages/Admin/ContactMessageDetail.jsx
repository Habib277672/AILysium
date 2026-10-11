import { Link, useLocation, useParams } from "react-router-dom";
import { useAdminContactMessageDetail } from "../../hooks/useContact";
import { Badge } from "../../Components/UI/Badge";
import { Card } from "../../Components/UI/Card";
import { Skeleton } from "../../Components/UI/Skeleton";
import { motion } from "motion/react";
import { FaArrowLeft, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

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

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "?";

const BackPill = ({ to, label }) => (
  <Link
    to={to}
    className="group border-slate/20 text-slate hover:border-sky/40 hover:text-sky inline-flex cursor-pointer items-center gap-2 rounded-full border bg-white py-2 pr-4 pl-3 text-sm font-medium shadow-sm transition-colors"
  >
    <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-0.5" />
    {label}
  </Link>
);

const DetailTile = ({ icon: Icon, label, value }) => (
  <div className="bg-cloud border-slate/10 rounded-xl border p-4">
    <p className="text-slate/60 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
      <Icon className="text-sky" />
      {label}
    </p>
    <p className="text-ink mt-2 text-sm font-medium break-all">
      {value || "—"}
    </p>
  </div>
);

export const AdminContactMessageDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const backTo = location.state?.from || "/admin/contact-messages";
  const {
    data: message,
    isLoading: loading,
    isError: error,
  } = useAdminContactMessageDetail(id);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-32 rounded-full" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div>
            <Skeleton className="h-8 w-40 rounded-lg" />
            <Skeleton className="mt-2 h-4 w-28 rounded-lg" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    );
  }

  if (error || !message) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-red-50 text-2xl text-red-600">
          <FaEnvelope />
        </span>
        <p className="text-ink text-lg font-semibold">
          This message could not be found.
        </p>
        <BackPill to="/admin/contact-messages" label="All messages" />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="space-y-6 sm:space-y-8"
    >
      <motion.div variants={fadeUp}>
        <BackPill to={backTo} label="All messages" />
      </motion.div>

      {/* Hero */}
      <motion.div
        variants={fadeUp}
        className="border-slate/10 flex flex-col items-center gap-4 rounded-2xl border bg-white p-6 text-center shadow-sm sm:flex-row sm:gap-5 sm:p-8 sm:text-left"
      >
        <span className="from-sky to-sky-light font-heading grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br text-2xl font-bold text-white">
          {getInitials(message.name)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <Badge variant="sky" className="border border-sky" size="sm">
              {message.program}
            </Badge>
            <Badge variant="successSoft" className="border border-emerald-500" size="sm">
              {new Date(message.createdAt).toLocaleDateString()}
            </Badge>
          </div>
          <h1 className="text-ink mt-2 text-2xl leading-tight font-extrabold break-words sm:text-3xl">
            {message.name}
          </h1>
          <p className="text-muted mt-1 text-sm break-all">{message.email}</p>
        </div>
      </motion.div>

      {/* Details */}
      <motion.div variants={fadeUp}>
        <Card padding="sm" className="sm:p-6 lg:p-8">
          <h2 className="font-heading text-ink text-lg font-semibold">
            Contact details
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <DetailTile icon={FaEnvelope} label="Email" value={message.email} />
            <DetailTile icon={FaPhone} label="Phone" value={message.phone} />
            <DetailTile
              icon={FaUser}
              label="Student's age"
              value={message.age}
            />
            <DetailTile
              icon={FaUser}
              label="Program interested in"
              value={message.program}
            />
          </div>
        </Card>
      </motion.div>

      {/* Message */}
      <motion.div variants={fadeUp}>
        <Card padding="sm" className="sm:p-6 lg:p-8">
          <h2 className="font-heading text-ink text-lg font-semibold">
            Message
          </h2>
          <div className="bg-cloud border-slate/10 mt-4 rounded-xl border p-4">
            <p className="text-slate text-sm leading-relaxed whitespace-pre-wrap">
              {message.message}
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
