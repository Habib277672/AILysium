import { Link } from "react-router-dom";
import { useAdminUsers } from "../../hooks/useAdmin";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useAdminFiltersStore } from "../../store/adminFiltersStore";
import { motion } from "motion/react";
import { Badge } from "../../Components/UI/Badge";
import { Pagination } from "../../Components/UI/Pagination";
import { AdminTableSkeleton } from "../../Components/UI/AdminTableSkeleton";
import { FaSearch } from "react-icons/fa";

const roleBadgeVariant = {
  ADMIN: "sky",
  STUDENT: "sky",
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

const Avatar = ({ name }) => (
  <span className="from-sky to-sky-light grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-bold text-white">
    {getInitials(name)}
  </span>
);

export const AdminUsers = () => {
  const page = useAdminFiltersStore((state) => state.usersPage);
  const setPage = useAdminFiltersStore((state) => state.setUsersPage);
  const search = useAdminFiltersStore((state) => state.usersSearch);
  const setSearch = useAdminFiltersStore((state) => state.setUsersSearch);

  // Debounced so typing doesn't fire a request on every keystroke.
  const debouncedSearch = useDebouncedValue(search);

  const {
    data,
    isLoading: loading,
    isError: error,
  } = useAdminUsers(page, debouncedSearch);
  const users = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? users.length;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="font-heading text-ink mt-3 text-2xl leading-tight font-extrabold sm:text-3xl lg:text-4xl">
          All{" "}
          <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
            users
          </span>
        </h1>
        <p className="text-muted mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
          Every registered account. Click a user to see their full enrollment
          history.
        </p>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="relative w-full sm:max-w-xs">
          <FaSearch className="text-slate/40 pointer-events-none absolute top-1/2 left-4 h-3.5 w-3.5 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, or phone…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="border-slate/20 text-ink placeholder:text-slate/40 hover:border-sky/40 focus:border-sky focus:ring-sky/20 w-full rounded-full border bg-white py-2.5 pr-4 pl-10 text-sm transition-colors focus:ring-2 focus:outline-none"
          />
        </div>

        {!loading && !error && (
          <p className="text-muted text-sm">
            {total.toLocaleString()} {total === 1 ? "result" : "results"}
          </p>
        )}
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeUp}>
        <div
          data-lenis-prevent
          className="border-slate/10 shadow-ink/5 scrollbar-neutral max-h-[65vh] overflow-auto rounded-2xl border bg-white shadow-sm"
        >
          {/* Remounts when the debounced search / page changes so new
              results fade in while keepPreviousData holds the old rows */}
          <motion.div
            key={`${debouncedSearch}-${page}`}
            initial={{ opacity: 0.35, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {loading && <AdminTableSkeleton columns={6} />}

            {!loading && error && (
              <p className="p-6 text-center text-sm text-red-600">
                Couldn&apos;t load users. Please try again.
              </p>
            )}

            {!loading && !error && (
              <table className="divide-slate/10 min-w-full divide-y text-sm">
                <thead className="bg-cloud text-slate/60 sticky top-0 z-10 text-left text-xs tracking-wide uppercase">
                  <tr>
                    <th className="bg-cloud px-5 py-3 font-medium">User</th>
                    <th className="bg-cloud px-5 py-3 font-medium">Email</th>
                    <th className="bg-cloud px-5 py-3 font-medium">Phone</th>
                    <th className="bg-cloud px-5 py-3 font-medium">Role</th>
                    <th className="bg-cloud px-5 py-3 font-medium">Verified</th>
                    <th className="bg-cloud px-5 py-3 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-slate/10 divide-y">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-cloud/50">
                      <td className="text-ink px-5 py-3.5 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Avatar name={user.fullName} />
                          <div className="min-w-0">
                            <Link
                              to={`/admin/users/${user.id}`}
                              state={{ from: "/admin/users" }}
                              className="text-ink hover:text-sky block hover:underline"
                            >
                              {user.fullName}
                            </Link>
                            <p className="text-slate text-xs">
                              {user.username ? `@${user.username}` : "—"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-slate px-5 py-3.5 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="text-slate px-5 py-3.5 whitespace-nowrap">
                        {user.phoneNumber}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <Badge
                          size="xs"
                          className="border-sky border"
                          variant={roleBadgeVariant[user.role]}
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {user.emailVerifiedAt ? (
                          <Badge size="xs" variant="success">
                            Verified
                          </Badge>
                        ) : (
                          <Badge size="xs" variant="warning">
                            Unverified
                          </Badge>
                        )}
                      </td>
                      <td className="text-slate px-5 py-3.5 whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}

                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-slate px-5 py-12 text-center"
                      >
                        No users match this search.
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
