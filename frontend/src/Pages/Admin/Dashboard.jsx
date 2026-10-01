import { Link } from "react-router-dom";
import {
  useAdminUsers,
  useAdminEnrollments,
  useAdminCourses,
} from "../../hooks/useAdmin";
import { motion } from "motion/react";
import { Card } from "../../Components/UI/Card";
import { Badge } from "../../Components/UI/Badge";
import { AdminDashboardSkeleton } from "../../Components/UI/AdminDashboardSkeleton";

export const AdminDashboard = () => {
  // /admin/users and /admin/enrollments return a paginated envelope
  // ({ data, total, page, totalPages }), so the stats below use `total`
  // for the full counts and status-filtered totals for payment counts.
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useAdminUsers(1, "");
  const {
    data: enrollmentsData,
    isLoading: enrollmentsLoading,
    isError: enrollmentsError,
  } = useAdminEnrollments(1, "", "All");
  const {
    data: confirmedData,
    isLoading: confirmedLoading,
    isError: confirmedError,
  } = useAdminEnrollments(1, "", "CONFIRMED");
  const {
    data: pendingData,
    isLoading: pendingLoading,
    isError: pendingError,
  } = useAdminEnrollments(1, "", "PENDING");
  const {
    data: courses = [],
    isLoading: coursesLoading,
    isError: coursesError,
  } = useAdminCourses();

  const loading =
    usersLoading ||
    enrollmentsLoading ||
    confirmedLoading ||
    pendingLoading ||
    coursesLoading;
  const error =
    usersError ||
    enrollmentsError ||
    confirmedError ||
    pendingError ||
    coursesError;

  if (loading) {
    return <AdminDashboardSkeleton />;
  }

  if (error) {
    return (
      <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        Couldn&apos;t load dashboard data. Please try again.
      </p>
    );
  }

  const cards = [
    { label: "Total users", value: usersData?.total ?? 0 },
    { label: "Total courses", value: courses.length },
    { label: "Total enrollments", value: enrollmentsData?.total ?? 0 },
    { label: "Confirmed payments", value: confirmedData?.total ?? 0 },
    { label: "Pending payments", value: pendingData?.total ?? 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Badge variant="sky">Overview</Badge>
      <h1 className="font-heading text-ink mt-3 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <Card key={card.label}>
            <p className="font-heading text-ink text-3xl font-bold">
              {card.value}
            </p>
            <p className="text-slate mt-1 text-sm">{card.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          to="/admin/enrollments"
          className="border-sky bg-sky/10 text-sky hover:bg-sky/20 rounded-full border px-5 py-2.5 text-sm font-medium"
        >
          View enrollment report
        </Link>
        <Link
          to="/admin/courses"
          className="border-slate/20 text-slate hover:border-sky hover:text-sky rounded-full border px-5 py-2.5 text-sm font-medium"
        >
          Manage courses
        </Link>
      </div>
    </motion.div>
  );
};
