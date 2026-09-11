import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { Badge } from "../../Components/UI/Badge";
import { Card } from "../../Components/UI/Card";

const roleBadgeVariant = {
    ADMIN: "sky",
    STUDENT: "ink",
};

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const { data } = await api.get("/admin/users");
                setUsers(data);
            } catch (err) {
                setError("Couldn't load users.");
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return users;
        return users.filter(
            (user) =>
                user.fullName.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phoneNumber.includes(query)
        );
    }, [users, search]);

    return (
        <div>
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

            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate/10 bg-white">
                {loading && <p className="p-6 text-center text-sm text-slate">Loading…</p>}
                {!loading && error && (
                    <p className="p-6 text-center text-sm text-red-600">{error}</p>
                )}

                {!loading && !error && (
                    <table className="min-w-full divide-y divide-slate/10 text-sm">
                        <thead className="bg-cloud text-left text-xs uppercase tracking-wide text-slate/60">
                            <tr>
                                <th className="px-5 py-3">Name</th>
                                <th className="px-5 py-3">Email</th>
                                <th className="px-5 py-3">Phone</th>
                                <th className="px-5 py-3">Role</th>
                                <th className="px-5 py-3">Verified</th>
                                <th className="px-5 py-3">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate/10">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-cloud/50">
                                    <td className="whitespace-nowrap px-5 py-3">
                                        <Link
                                            to={`/admin/users/${user.id}`}
                                            className="font-medium text-ink hover:text-sky hover:underline"
                                        >
                                            {user.fullName}
                                        </Link>
                                    </td>
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

                            {filteredUsers.length === 0 && (
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
        </div>
    );
};