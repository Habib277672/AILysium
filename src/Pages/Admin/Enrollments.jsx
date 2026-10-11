import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAdminEnrollments, useAdminCourses } from "../../hooks/useAdmin";
import { useAdminFiltersStore } from "../../store/adminFiltersStore";
import { motion } from "motion/react";
import { Badge } from "../../Components/UI/Badge";
import { Pagination } from "../../Components/UI/Pagination";
import { AdminTableSkeleton } from "../../Components/UI/AdminTableSkeleton";
import {
  useUserSearch,
  useCreateManualEnrollment,
} from "../../hooks/useAdminManualEnrollment";
import { Card } from "../../Components/UI/Card";
import { Button } from "../../Components/UI/Button";
import { CustomSelect } from "../../Components/UI/CustomSelect";
import { Modal } from "../../Components/UI/Modal";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { FaUserPlus, FaSearch } from "react-icons/fa";

const paymentBadgeVariant = {
  PENDING: "warning",
  CONFIRMED: "success",
  FAILED: "danger",
  FREE: "success",
};

const statusFilters = ["All", "PENDING", "CONFIRMED", "FAILED", "FREE"];

const statusFilterLabels = {
  All: "All",
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  FAILED: "Failed",
  FREE: "Free",
};

const statusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed (paid)" },
  { value: "FAILED", label: "Failed" },
  { value: "FREE", label: "Free" },
];

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

const Avatar = ({ name, size = "h-9 w-9 text-xs" }) => (
  <span
    className={`from-sky to-sky-light grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-bold text-white ${size}`}
  >
    {getInitials(name)}
  </span>
);

export const AdminEnrollments = () => {
  const page = useAdminFiltersStore((state) => state.enrollmentsPage);
  const setPage = useAdminFiltersStore((state) => state.setEnrollmentsPage);
  const statusFilter = useAdminFiltersStore(
    (state) => state.enrollmentsStatusFilter,
  );
  const setStatusFilter = useAdminFiltersStore(
    (state) => state.setEnrollmentsStatusFilter,
  );
  const search = useAdminFiltersStore((state) => state.enrollmentsSearch);
  const setSearch = useAdminFiltersStore((state) => state.setEnrollmentsSearch);

  // UI only: show or hide the manual enrollment panel
  const [showForm, setShowForm] = useState(false);

  // Manual enrollment form
  const [userQuery, setUserQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("CONFIRMED");

  // Debounce both search inputs so the API isn't hit on every keystroke.
  const debouncedSearch = useDebouncedValue(search);
  const debouncedUserQuery = useDebouncedValue(userQuery);

  const { data: matchingUsers = [] } = useUserSearch(debouncedUserQuery);
  const { data: courses = [] } = useAdminCourses();
  const createEnrollment = useCreateManualEnrollment();

  const {
    data,
    isLoading: loading,
    isError: error,
  } = useAdminEnrollments(page, debouncedSearch, statusFilter);
  const enrollments = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? enrollments.length;

  const selectedCourse = courses.find((c) => c.id === courseId);

  const courseOptions = courses.map((course) => ({
    value: course.id,
    label: `${course.title} ${course.isFree ? "(Free)" : `PKR ${course.price.toLocaleString()}`
      }`,
  }));

  const matching = matchingUsers.filter((u) => u.role !== "ADMIN");

  const resetForm = () => {
    setUserQuery("");
    setSelectedUser(null);
    setCourseId("");
    setPaymentStatus("CONFIRMED");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedUser) {
      toast.error("Please select a user first.");
      return;
    }
    if (!courseId) {
      toast.error("Please select a course.");
      return;
    }

    try {
      await createEnrollment.mutateAsync({
        userId: selectedUser.id,
        courseId,
        paymentStatus,
      });
      toast.success(
        `Enrolled ${selectedUser.fullName} — status set to ${paymentStatus}.`,
      );
      resetForm();
      setShowForm(false);
    } catch (err) {
      const message =
        err.response?.data?.error || "Couldn't create this enrollment.";
      toast.error(message);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="mx-auto w-full max-w-[1400px] space-y-6 sm:space-y-8"
    >
      {/* 1. Page header: title on the left, primary action on the right */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="min-w-0">
          <h1 className="font-heading text-ink text-2xl leading-tight font-extrabold sm:text-3xl lg:text-4xl">
            Manage{" "}
            <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
              enrollments
            </span>
          </h1>
          <p className="text-muted mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
            Every enrollment across every course: who enrolled, in what, and
            whether they&apos;ve paid.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => setShowForm(true)}
          className="w-full cursor-pointer sm:w-auto"
          aria-haspopup="dialog"
        >
          <FaUserPlus className="text-sm" />
          Add enrollment
        </Button>
      </motion.div>

      {/* 2. Manual enrollment modal */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        panelClassName="sm:max-w-xl lg:max-w-2xl"
      >
        <Card padding="sm" className="border-0 shadow-none sm:p-6 lg:p-8">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="bg-sky/10 text-sky grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11">
              <FaUserPlus />
            </span>
            <div className="min-w-0">
              <h2 className="font-heading text-ink pr-8 text-base font-bold sm:text-lg">
                Manual enrollment
              </h2>
              <p className="text-muted mt-1 max-w-xl text-sm leading-relaxed">
                Enroll any user into any course and set their payment status
                directly. Useful for offline payments, special cases or
                corrections.
              </p>
            </div>
          </div>

          <div className="border-slate/10 mt-6 h-px border-t" />

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-5 sm:grid-cols-2"
          >
            {/* Step 1: user */}
            <div className="min-w-0 sm:col-span-2">
              <span className="text-ink mb-2 block text-sm font-medium">
                User
              </span>
              {selectedUser ? (
                <div className="border-sky/30 bg-sky/5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-xl border px-4 py-3">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Avatar name={selectedUser.fullName} />
                    <div className="min-w-0">
                      <p className="text-ink truncate text-sm font-medium">
                        {selectedUser.fullName}
                      </p>
                      <p className="text-slate truncate text-xs">
                        {selectedUser.email}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="border-sky/30 text-sky hover:bg-sky/10 shrink-0 cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="min-w-0">
                  <div className="relative">
                    <FaSearch className="text-slate/40 pointer-events-none absolute top-1/2 left-4 h-3.5 w-3.5 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by name, username or email (min 2 characters)"
                      value={userQuery}
                      onChange={(event) =>
                        setUserQuery(event.target.value.replace(/^@/, ""))
                      }
                      className="border-slate/20 text-ink placeholder:text-slate/40 hover:border-sky/40 focus:border-sky focus:ring-sky/20 w-full rounded-xl border py-3 pr-4 pl-10 text-sm transition-colors focus:ring-2 focus:outline-none"
                    />
                  </div>
                  {/* Inline listbox (not absolute) so it never clips inside the modal */}
                  {userQuery.trim().length >= 2 && (
                    <div className="border-slate/10 shadow-ink/10 mt-2 max-h-56 overflow-y-auto rounded-xl border bg-white py-1">
                      {matching.length === 0 ? (
                        <p className="text-slate px-4 py-3 text-sm">
                          No matching users.
                        </p>
                      ) : (
                        matching.map((user) => (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => {
                              setSelectedUser(user);
                              setUserQuery("");
                            }}
                            className="hover:bg-cloud flex w-full min-w-0 cursor-pointer items-center gap-3 px-4 py-2.5 text-left transition-colors"
                          >
                            <Avatar
                              name={user.fullName}
                              size="h-8 w-8 text-[10px]"
                            />
                            <span className="min-w-0">
                              <span className="text-ink block truncate text-sm font-medium">
                                {user.fullName}
                              </span>
                              <span className="text-slate block truncate text-xs">
                                {user.email}
                              </span>
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Step 2: course */}
            <CustomSelect
              label="Course"
              value={courseId}
              onChange={setCourseId}
              options={courseOptions}
              placeholder="Select a course"
            />

            {/* Step 3: payment status */}
            <CustomSelect
              label="Payment status"
              value={paymentStatus}
              onChange={setPaymentStatus}
              options={statusOptions}
            />

            {selectedCourse?.isFree && paymentStatus !== "FREE" && (
              <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700 sm:col-span-2">
                This course is marked free. Consider setting the status to
                &quot;Free&quot; instead of {paymentStatus.toLowerCase()}.
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:items-center">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={createEnrollment.isPending}
                className="w-full cursor-pointer sm:w-auto"
              >
                <FaUserPlus className="text-sm" />
                {createEnrollment.isPending ? "Enrolling..." : "Enroll user"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={resetForm}
                className="hover:shadow-sky/10 w-full cursor-pointer bg-white transition-all hover:shadow-sm sm:w-auto"
              >
                Clear form
              </Button>
            </div>
          </form>
        </Card>
      </Modal>

      {/* 3. Enrollment list */}
      <motion.div variants={fadeUp}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-heading text-ink text-xl font-bold sm:text-2xl">
            Enrollment list
          </h2>
          {!loading && !error && (
            <p className="text-muted text-sm">
              {total.toLocaleString()} {total === 1 ? "result" : "results"}
            </p>
          )}
        </div>

        {/* Toolbar */}
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <FaSearch className="text-slate/40 pointer-events-none absolute top-1/2 left-4 h-3.5 w-3.5 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email or course"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="border-slate/20 text-ink placeholder:text-slate/40 hover:border-sky/40 focus:border-sky focus:ring-sky/20 w-full rounded-full border bg-white py-2.5 pr-4 pl-10 text-sm transition-colors focus:ring-2 focus:outline-none"
            />
          </div>

          {/* Filters scroll sideways on small screens instead of wrapping */}
          <div
            data-lenis-prevent
            className="scrollbar-neutral -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:overflow-visible lg:pb-0"
          >
            {statusFilters.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`relative inline-flex shrink-0 cursor-pointer items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 sm:px-3.5 sm:py-1.5 ${statusFilter === status
                  ? "border-sky text-white"
                  : "border-slate/15 text-muted hover:border-sky/40 hover:text-sky shadow-ink/3 bg-white shadow-sm"
                  }`}
              >
                {statusFilter === status && (
                  <motion.span
                    layoutId="enrollments-tab-active"
                    className="bg-sky shadow-sky/25 absolute inset-0 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">
                  {statusFilterLabels[status]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* List container — capped height so the table scrolls internally
            instead of the whole page */}
        <div
          data-lenis-prevent
          className="border-slate/10 shadow-ink/5 scrollbar-neutral mt-4 max-h-[65vh] overflow-auto rounded-2xl border bg-white shadow-sm"
        >
          {/* Remounts on tab / debounced search / page change so the data
              fades in smoothly while placeholderData keeps old rows visible */}
          <motion.div
            key={`${statusFilter}-${debouncedSearch}-${page}`}
            initial={{ opacity: 0.35, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {loading && <AdminTableSkeleton columns={5} />}

            {!loading && error && (
              <p className="p-6 text-center text-sm text-red-600">
                Couldn&apos;t load enrollments. Please try again.
              </p>
            )}

            {!loading && !error && (
              <table className="divide-slate/10 min-w-full divide-y text-sm">
                <thead className="bg-cloud text-slate/60 sticky top-0 z-10 text-left text-xs tracking-wide uppercase">
                  <tr>
                    <th className="bg-cloud px-5 py-3 font-medium">User</th>
                    <th className="bg-cloud px-5 py-3 font-medium">Phone</th>
                    <th className="bg-cloud px-5 py-3 font-medium">Course</th>
                    <th className="bg-cloud px-5 py-3 font-medium">Enrolled</th>
                    <th className="bg-cloud px-5 py-3 font-medium">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-slate/10 divide-y">
                  {enrollments.map((enrollment) => (
                    <tr
                      key={enrollment.enrollmentId}
                      className="hover:bg-cloud/50"
                    >
                      <td className="text-ink px-5 py-3.5 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Avatar name={enrollment.userName} />
                          <div className="min-w-0">
                            <Link
                              to={`/admin/users/${enrollment.userId}`}
                              state={{ from: "/admin/enrollments" }}
                              className="text-ink hover:text-sky block hover:underline"
                            >
                              {enrollment.userName}
                            </Link>
                            <p className="text-slate text-xs">
                              {enrollment.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-slate px-5 py-3.5 whitespace-nowrap">
                        {enrollment.phoneNumber}
                      </td>
                      <td className="text-ink px-5 py-3.5 font-medium whitespace-nowrap">
                        {enrollment.course}
                      </td>
                      <td className="text-slate px-5 py-3.5 whitespace-nowrap">
                        {new Date(
                          enrollment.enrollmentDate,
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <Badge
                          size="xs"
                          variant={
                            paymentBadgeVariant[enrollment.paymentStatus] ??
                            "sky"
                          }
                        >
                          {enrollment.paymentStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}

                  {enrollments.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-slate px-5 py-12 text-center"
                      >
                        No enrollments match this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </motion.div>
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </motion.div>
    </motion.div>
  );
};
