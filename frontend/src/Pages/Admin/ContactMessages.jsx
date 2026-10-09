import { Link } from "react-router-dom";
import { useAdminContactMessages } from "../../hooks/useContact";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useAdminFiltersStore } from "../../store/adminFiltersStore";
import { motion } from "motion/react";
import { Badge } from "../../Components/UI/Badge";
import { Pagination } from "../../Components/UI/Pagination";
import { AdminTableSkeleton } from "../../Components/UI/AdminTableSkeleton";
import { FaEnvelope, FaSearch } from "react-icons/fa";

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

export const AdminContactMessages = () => {
  const page = useAdminFiltersStore((state) => state.messagesPage);
  const setPage = useAdminFiltersStore((state) => state.setMessagesPage);
  const search = useAdminFiltersStore((state) => state.messagesSearch);
  const setSearch = useAdminFiltersStore((state) => state.setMessagesSearch);

  const debouncedSearch = useDebouncedValue(search);

  const {
    data,
    isLoading: loading,
    isError: error,
  } = useAdminContactMessages(page, debouncedSearch);
  const messages = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? messages.length;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <Badge variant="sky">Inbox</Badge>
        <h1 className="font-heading text-ink mt-3 text-2xl leading-tight font-extrabold sm:text-3xl lg:text-4xl">
          Contact{" "}
          <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
            messages
          </span>
        </h1>
        <p className="text-muted mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
          Every message submitted through the public contact form. Click a name
          to read the full message.
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
            placeholder="Search by name, email, or program…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="border-slate/20 text-ink placeholder:text-slate/40 hover:border-sky/40 focus:border-sky focus:ring-sky/20 w-full rounded-full border bg-white py-2.5 pr-4 pl-10 text-sm transition-colors focus:ring-2 focus:outline-none"
          />
        </div>

        {!loading && !error && (
          <p className="text-muted text-sm">
            {total.toLocaleString()} {total === 1 ? "message" : "messages"}
          </p>
        )}
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeUp}>
        <div
          data-lenis-prevent
          className="border-slate/10 shadow-ink/5 scrollbar-neutral overflow-x-auto rounded-2xl border bg-white shadow-sm"
        >
          {/* Remounts when the debounced search / page changes so new
              results fade in while placeholderData holds the old rows */}
          <motion.div
            key={`${debouncedSearch}-${page}`}
            initial={{ opacity: 0.35, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {loading && <AdminTableSkeleton columns={4} />}

            {!loading && error && (
              <p className="p-6 text-center text-sm text-red-600">
                Couldn&apos;t load messages. Please try again.
              </p>
            )}

            {!loading && !error && (
              <table className="divide-slate/10 min-w-full divide-y text-sm">
                <thead className="bg-cloud text-slate/60 text-left text-xs tracking-wide uppercase">
                  <tr>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Program</th>
                    <th className="px-5 py-3 font-medium">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-slate/10 divide-y">
                  {messages.map((message) => (
                    <tr key={message.id} className="hover:bg-cloud/50">
                      <td className="text-ink px-5 py-3.5 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span className="bg-sky/10 text-sky grid h-9 w-9 shrink-0 place-items-center rounded-xl">
                            <FaEnvelope />
                          </span>
                          <Link
                            to={`/admin/contact-messages/${message.id}`}
                            state={{ from: "/admin/contact-messages" }}
                            className="hover:text-sky hover:underline"
                          >
                            {message.name}
                          </Link>
                        </div>
                      </td>
                      <td className="text-slate px-5 py-3.5 whitespace-nowrap">
                        {message.email}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <Badge size="sm" className="border border-sky">{message.program}</Badge>
                      </td>
                      <td className="text-slate px-5 py-3.5 whitespace-nowrap">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}

                  {messages.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-slate px-5 py-12 text-center"
                      >
                        No messages match this search.
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
