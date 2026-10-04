// import { useMemo } from "react";
import { useAdminUsers } from "../../hooks/useAdmin";
import { useAdminFiltersStore } from "../../store/adminFiltersStore";
import { motion } from "motion/react";
import { Badge } from "../../Components/UI/Badge";
import { Pagination } from "../../Components/UI/Pagination";
import { AdminTableSkeleton } from "../../Components/UI/AdminTableSkeleton";

const roleBadgeVariant = {
    ADMIN: "sky",
    STUDENT: "ink",
};

export const AdminUsers = () => {
    const page = useAdminFiltersStore((state) => state.usersPage);
    const setPage = useAdminFiltersStore((state) => state.setUsersPage);
    const search = useAdminFiltersStore((state) => state.usersSearch);
    const setSearch = useAdminFiltersStore((state) => state.setUsersSearch);

    const { data, isLoading: loading, isError: error } = useAdminUsers(page, search);
    const users = data?.data ?? [];
    const totalPages = data?.totalPages ?? 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <Badge variant="sky">Registered</Badge>
            <h1 className="mt-3 font-heading text-3xl font-bold text-ink">Users</h1>
            <p className="mt-2 text-sm text-slate">
                Every registered account. Click a user to see their full enrollment
                history.
            </p>

            <input
                type="text"
                placeholder="Search by name, email, or phone…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="mt-6 w-full max-w-xs rounded-full border border-slate/20 px-4 py-2 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
            />

            <div data-lenis-prevent className="mt-6 overflow-x-auto rounded-2xl border border-slate/10 bg-white">
                {loading && <AdminTableSkeleton columns={6} />}
                {!loading && error && (
                    <p className="p-6 text-center text-sm text-red-600">{error}</p>
                )}

                {!loading && !error && (
                    <table className="min-w-full divide-y divide-slate/10 text-sm">
                        <thead className="bg-cloud text-left text-xs uppercase tracking-wide text-slate/60">
                            <tr>
                                <th className="px-5 py-3">Name</th>
                                <th className="px-5 py-3">Username</th>
                                <th className="px-5 py-3">Email</th>
                                <th className="px-5 py-3">Phone</th>
                                <th className="px-5 py-3">Role</th>
                                <th className="px-5 py-3">Verified</th>
                                <th className="px-5 py-3">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate/10">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-cloud/50">
                                    <td className="font-medium text-ink whitespace-nowrap px-5 py-3">{user.fullName}</td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate">{user.username ? `@${user.username}` : "—"}</td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate">{user.email}</td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate">
                                        {user.phoneNumber}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3">
                                        <Badge variant={roleBadgeVariant[user.role]}>{user.role}</Badge>
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3">
                                        {user.emailVerifiedAt ? (
                                            <Badge variant="success">Verified</Badge>
                                        ) : (
                                            <Badge variant="warning">Unverified</Badge>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}

                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-5 py-10 text-center text-slate">
                                        No users match this search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </motion.div>
    );
};