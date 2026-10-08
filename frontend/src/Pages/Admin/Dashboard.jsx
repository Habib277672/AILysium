import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { useAuth } from "../../context/AuthContext";
import {
  useAdminCourses,
  useAdminEnrollments,
  useAdminUsers,
} from "../../hooks/useAdmin";
import { Badge } from "../../Components/UI/Badge";
import { Card } from "../../Components/UI/Card";
import { AdminDashboardSkeleton } from "../../Components/UI/AdminDashboardSkeleton";
import {
  FaArrowRight,
  FaBookOpen,
  FaCheckCircle,
  FaClipboardList,
  FaHourglassHalf,
  FaSort,
  FaSortDown,
  FaSortUp,
  FaUsers,
} from "react-icons/fa";

const tableFeatureSet = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { text: sortFn_text, datetime: sortFn_datetime },
});

const columnHelper = createColumnHelper();

const paymentBadgeVariant = {
  PENDING: "warning",
  CONFIRMED: "success",
  FAILED: "warning",
  FREE: "success",
};

const EMPTY_ENROLLMENTS = [];

const enrollmentColumns = columnHelper.columns([
  columnHelper.accessor("userName", {
    header: "User",
    sortFn: "text",
    cell: ({ row }) => (
      <Link
        to={`/admin/users/${row.original.userId}`}
        className="text-ink hover:text-sky font-medium hover:underline"
      >
        {row.original.userName}
        <span className="text-slate/70 mt-0.5 block text-xs font-normal">
          {row.original.email}
        </span>
      </Link>
    ),
  }),
  columnHelper.accessor("course", {
    header: "Program",
    sortFn: "text",
  }),
  columnHelper.accessor((row) => new Date(row.enrollmentDate), {
    id: "date",
    header: "Date",
    sortFn: "datetime",
    cell: ({ getValue }) => getValue().toLocaleDateString(),
  }),
  columnHelper.accessor("paymentStatus", {
    header: "Status",
    sortFn: "text",
    cell: ({ getValue }) => (
      <Badge variant={paymentBadgeVariant[getValue()] ?? "sky"}>
        {getValue()}
      </Badge>
    ),
  }),
]);

const sectionVariant = {
  hidden: { opacity: 0, y: 24 },
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

const ChartHeader = ({ title, subtitle }) => (
  <div>
    <h3 className="font-heading text-ink text-base font-semibold">{title}</h3>
    <p className="text-muted mt-0.5 text-xs">{subtitle}</p>
  </div>
);

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-slate/10 rounded-xl border bg-white px-3 py-2 shadow-lg">
      <p className="text-ink text-xs font-semibold">
        {label ?? payload[0]?.name}
      </p>
      <p
        className="text-xs font-medium"
        style={{ color: payload[0]?.color ?? "#0085fe" }}
      >
        {payload[0]?.value}
      </p>
    </div>
  );
};

const EmptyChart = ({ message }) => (
  <div className="border-border bg-cloud text-muted flex h-full flex-col items-center justify-center rounded-xl border border-dashed text-sm">
    {message}
  </div>
);

const AnimatedNumber = ({ value }) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest).toLocaleString(),
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [motionValue, value]);

  return <motion.span>{rounded}</motion.span>;
};

export const AdminDashboard = () => {
  const { user } = useAuth();

  // /admin/users and /admin/enrollments return a paginated envelope
  // ({ data, total, page, totalPages }), so the stats below use `total`
  // for the full counts and status-filtered totals for the payment
  // breakdown. The activity chart and table use the latest page of rows.
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
    data: failedData,
    isLoading: failedLoading,
    isError: failedError,
  } = useAdminEnrollments(1, "", "FAILED");
  const {
    data: freeData,
    isLoading: freeLoading,
    isError: freeError,
  } = useAdminEnrollments(1, "", "FREE");
  const {
    data: courses = [],
    isLoading: coursesLoading,
    isError: coursesError,
  } = useAdminCourses();

  const recentEnrollments = enrollmentsData?.data ?? EMPTY_ENROLLMENTS;

  const activityData = useMemo(() => {
    const byDay = new Map();
    recentEnrollments.forEach((enrollment) => {
      const date = new Date(enrollment.enrollmentDate);
      if (Number.isNaN(date.getTime())) return;
      const ts = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ).getTime();
      const existing = byDay.get(ts);
      if (existing) {
        existing.count += 1;
      } else {
        byDay.set(ts, {
          ts,
          label: date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          }),
          count: 1,
        });
      }
    });
    return [...byDay.values()]
      .sort((a, b) => a.ts - b.ts)
      .map(({ label, count }) => ({ label, count }));
  }, [recentEnrollments]);

  const tableData = useMemo(
    () => recentEnrollments.slice(0, 10),
    [recentEnrollments],
  );

  const table = useTable({
    features: tableFeatureSet,
    columns: enrollmentColumns,
    data: tableData,
  });

  const loading =
    usersLoading ||
    enrollmentsLoading ||
    confirmedLoading ||
    pendingLoading ||
    failedLoading ||
    freeLoading ||
    coursesLoading;
  const error =
    usersError ||
    enrollmentsError ||
    confirmedError ||
    pendingError ||
    failedError ||
    freeError ||
    coursesError;

  if (loading) {
    return <AdminDashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm font-medium text-red-600">
          Couldn&apos;t load dashboard data. Please try again.
        </p>
      </div>
    );
  }

  const firstName = (user?.fullName ?? "").split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const stats = [
    {
      label: "Total users",
      value: usersData?.total ?? 0,
      icon: FaUsers,
      tint: "bg-sky/10 text-sky",
      bar: "from-sky to-sky-light",
    },
    {
      label: "Total courses",
      value: courses.length,
      icon: FaBookOpen,
      tint: "bg-violet-500/10 text-violet-600",
      bar: "from-violet-500 to-violet-400",
    },
    {
      label: "Total enrollments",
      value: enrollmentsData?.total ?? 0,
      icon: FaClipboardList,
      tint: "bg-indigo-500/10 text-indigo-600",
      bar: "from-indigo-500 to-indigo-400",
    },
    {
      label: "Confirmed payments",
      value: confirmedData?.total ?? 0,
      icon: FaCheckCircle,
      tint: "bg-emerald-500/10 text-emerald-600",
      bar: "from-emerald-500 to-emerald-400",
    },
    {
      label: "Pending payments",
      value: pendingData?.total ?? 0,
      icon: FaHourglassHalf,
      tint: "bg-amber-500/10 text-amber-600",
      bar: "from-amber-500 to-amber-400",
    },
  ];

  const paymentData = [
    {
      name: "Confirmed",
      value: confirmedData?.total ?? 0,
      color: "#10b981",
    },
    { name: "Pending", value: pendingData?.total ?? 0, color: "#f59e0b" },
    { name: "Failed", value: failedData?.total ?? 0, color: "#ef4444" },
    { name: "Free", value: freeData?.total ?? 0, color: "#0085fe" },
  ].filter((entry) => entry.value > 0);
  const paymentTotal = paymentData.reduce((sum, entry) => sum + entry.value, 0);

  const courseStatusData = [
    {
      label: "Available",
      count: courses.filter((course) => course.status === "AVAILABLE").length,
      color: "#10b981",
    },
    {
      label: "Coming soon",
      count: courses.filter((course) => course.status === "COMING_SOON").length,
      color: "#0085fe",
    },
    {
      label: "Unpublished",
      count: courses.filter((course) => course.status === "UNPUBLISHED").length,
      color: "#94a3b8",
    },
  ];

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer}>
      {/* Greeting banner */}
      <motion.section
        variants={sectionVariant}
        className="bg-ink-soft relative overflow-hidden rounded-2xl p-6 text-white sm:p-8"
      >
        <div className="bg-sky/30 pointer-events-none absolute -top-16 -right-10 h-52 w-52 rounded-full blur-3xl" />
        <div className="bg-sky-light/20 pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-heading  text-3xl font-bold sm:text-4xl">
              {greeting}, {firstName}
            </h1>
            <p className="mt-2 max-w-lg text-sm text-white/70">
              Here&apos;s your AiLysium snapshot — {today}.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/enrollments"
              className="bg-sky hover:bg-sky-light shadow-sky/40 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors"
            >
              View enrollment report
              <FaArrowRight className="text-xs" />
            </Link>
            <Link
              to="/admin/courses"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-white hover:bg-white/10"
            >
              Manage courses
            </Link>
          </div>
        </div>
      </motion.section>

      {/* KPI stats */}
      <motion.div
        variants={sectionVariant}
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        {stats.map((stat) => (
          <Card
            key={stat.label}
            padding="sm"
            className="relative overflow-hidden transition-shadow hover:shadow-md"
          >
            <span
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.bar}`}
            />
            <div className="flex items-center gap-3.5">
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-lg ${stat.tint}`}
              >
                <stat.icon />
              </span>
              <div className="min-w-0">
                <p className="text-muted text-xs font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
                <p className="font-heading text-ink text-2xl font-bold">
                  <AnimatedNumber value={stat.value} />
                </p>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Charts row — payment donut + enrollment activity */}
      <motion.div
        variants={sectionVariant}
        className="mt-6 grid gap-4 lg:grid-cols-3"
      >
        <Card className="lg:col-span-1">
          <ChartHeader
            title="Payments"
            subtitle="Confirmed, pending, failed & free"
          />
          {paymentData.length === 0 ? (
            <div className="mt-4 h-[220px]">
              <EmptyChart message="No payments recorded yet." />
            </div>
          ) : (
            <>
              <div className="relative mt-4 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={62}
                      outerRadius={88}
                      paddingAngle={3}
                      cornerRadius={6}
                      stroke="none"
                      isAnimationActive
                    >
                      {paymentData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <p className="text-muted text-xs">Payments</p>
                    <p className="font-heading text-ink text-2xl font-bold">
                      {paymentTotal}
                    </p>
                  </div>
                </div>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {paymentData.map((entry) => (
                  <li
                    key={entry.name}
                    className="text-slate flex items-center gap-2 text-xs"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span>{entry.name}</span>
                    <span className="text-ink ml-auto font-semibold">
                      {entry.value}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>

        <Card className="lg:col-span-2">
          <ChartHeader
            title="Enrollment activity"
            subtitle="Latest enrollments grouped by day"
          />
          <div className="mt-4 h-[300px]">
            {activityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={activityData}
                  margin={{ top: 8, right: 8, bottom: 0, left: -18 }}
                >
                  <defs>
                    <linearGradient
                      id="dashActivityFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#0085fe"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor="#0085fe"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="#eaf3fb"
                    strokeDasharray="4 4"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    allowDecimals={false}
                    width={40}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ stroke: "#0085fe", strokeOpacity: 0.3 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    name="Enrollments"
                    stroke="#0085fe"
                    strokeWidth={2.5}
                    fill="url(#dashActivityFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart message="No enrollment activity yet." />
            )}
          </div>
        </Card>
      </motion.div>

      {/* Course status bars + latest enrollments table */}
      <motion.div
        variants={sectionVariant}
        className="mt-4 grid gap-4 lg:grid-cols-3"
      >
        <Card>
          <ChartHeader
            title="Course catalog"
            subtitle="Courses by publication status"
          />
          <div className="mt-4 h-[240px]">
            {courses.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseStatusData}
                  layout="vertical"
                  margin={{ top: 4, right: 16, bottom: 0, left: 0 }}
                >
                  <CartesianGrid
                    horizontal={false}
                    stroke="#eaf3fb"
                    strokeDasharray="4 4"
                  />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={96}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ fill: "rgba(0,133,254,0.06)" }}
                  />
                  <Bar
                    dataKey="count"
                    name="Courses"
                    radius={[0, 8, 8, 0]}
                    barSize={22}
                  >
                    {courseStatusData.map((entry) => (
                      <Cell key={entry.label} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart message="No courses yet." />
            )}
          </div>
        </Card>

        <div className="border-slate/10 shadow-ink/5 overflow-hidden rounded-2xl border bg-white shadow-sm lg:col-span-2">
          <div className="border-slate/10 flex flex-wrap items-center justify-between gap-2 border-b px-5 py-4">
            <div>
              <h3 className="font-heading text-ink text-base font-semibold">
                Latest enrollments
              </h3>
              <p className="text-muted mt-0.5 text-xs">
                Newest first — click a column to sort
              </p>
            </div>
            <Link
              to="/admin/enrollments"
              className="text-sky hover:text-sky-hover inline-flex items-center gap-1.5 text-sm font-medium"
            >
              View all
              <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div data-lenis-prevent className="overflow-x-auto">
            <table className="text-slate divide-slate/10 min-w-full divide-y text-sm">
              <thead className="bg-cloud text-slate/60 text-left text-xs tracking-wide uppercase">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const sorted = header.column.getIsSorted();
                      return (
                        <th
                          key={header.id}
                          className="px-5 py-3 font-medium"
                          aria-sort={
                            sorted === "asc"
                              ? "ascending"
                              : sorted === "desc"
                                ? "descending"
                                : undefined
                          }
                        >
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            disabled={!header.column.getCanSort()}
                            className="hover:text-sky inline-flex items-center gap-1.5 tracking-wide uppercase transition-colors disabled:cursor-default"
                          >
                            <table.FlexRender header={header} />
                            {sorted === "asc" ? (
                              <FaSortUp />
                            ) : sorted === "desc" ? (
                              <FaSortDown />
                            ) : (
                              <FaSort className="opacity-40" />
                            )}
                          </button>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-slate/10 divide-y">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-cloud/60 bg-white transition-colors"
                  >
                    {row.getAllCells().map((cell) => (
                      <td key={cell.id} className="px-5 py-3 align-middle">
                        <table.FlexRender cell={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
                {table.getRowModel().rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={enrollmentColumns.length}
                      className="text-muted px-5 py-10 text-center"
                    >
                      No enrollments yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
