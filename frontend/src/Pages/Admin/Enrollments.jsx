import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { Badge } from "../../Components/UI/Badge";

const paymentBadgeVariant = {
    PENDING: "warning",
    CONFIRMED: "success",
    FAILED: "warning",
};

const statusFilters = ["All", "PENDING", "CONFIRMED", "FAILED"];

export const AdminEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const loadEnrollments = async () => {
            try {
                const { data } = await api.get("/admin/enrollments");
                setEnrollments(data);
            } catch (err) {
                setError("Couldn't load the enrollment report.");
            } finally {
                setLoading(false);
            }
        };
        loadEnrollments();
    }, []);

    const filteredEnrollments = useMemo(() => {
        return enrollments.filter((enrollment) => {
            const matchesStatus =
                statusFilter === "All" || enrollment.paymentStatus === statusFilter;

            const query = search.trim().toLowerCase();
            const matchesSearch =
                query === "" ||
                enrollment.userName.toLowerCase().includes(query) ||
                enrollment.email.toLowerCase().includes(query) ||
                enrollment.course.toLowerCase().includes(query);

            return matchesStatus && matchesSearch;
        });
    }, [enrollments, statusFilter, search]);

    return (
        <div>
            <Badge variant="sky">Report</Badge>
            <h1 className="mt-3 font-heading text-3xl font-bold text-ink">
                Enrollments
            </h1>
            <p className="mt-2 text-sm text-slate">
                Every enrollment across every course — who enrolled, in what, and
                whether they've paid.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
                <input
                    type="text"
                    placeholder="Search by name, email, or course…"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full max-w-xs rounded-full border border-slate/20 px-4 py-2 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
                />
                <div className="flex flex-wrap gap-2">
                    {statusFilters.map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => setStatusFilter(status)}
                            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${statusFilter === status
                                ? "border-sky bg-sky/10 text-sky"
                                : "border-slate/20 text-slate hover:border-sky/50"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate/10 bg-white">
                {loading && (
                    <p className="p-6 text-center text-sm text-slate">Loading…</p>
                )}

                {!loading && error && (
                    <p className="p-6 text-center text-sm text-red-600">{error}</p>
                )}

                {!loading && !error && (
                    <table className="min-w-full divide-y divide-slate/10 text-sm">
                        <thead className="bg-cloud text-left text-xs uppercase tracking-wide text-slate/60">
                            <tr>
                                <th className="px-5 py-3">User Name</th>
                                <th className="px-5 py-3">Email</th>
                                <th className="px-5 py-3">Phone Number</th>
                                <th className="px-5 py-3">Course</th>
                                <th className="px-5 py-3">Enrollment Date</th>
                                <th className="px-5 py-3">Payment Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate/10">
                            {filteredEnrollments.map((enrollment) => (
                                <tr key={enrollment.enrollmentId} className="hover:bg-cloud/50">
                                    <td className="whitespace-nowrap px-5 py-3 font-medium text-ink">
                                        <Link
                                            to={`/admin/users/${enrollment.userId}`}
                                            className="hover:text-sky hover:underline"
                                        >
                                            {enrollment.userName}
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate">
                                        {enrollment.email}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate">
                                        {enrollment.phoneNumber}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate">
                                        {enrollment.course}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate">
                                        {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3">
                                        <Badge variant={paymentBadgeVariant[enrollment.paymentStatus]}>
                                            {enrollment.paymentStatus}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}

                            {filteredEnrollments.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-5 py-10 text-center text-slate">
                                        No enrollments match this filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};