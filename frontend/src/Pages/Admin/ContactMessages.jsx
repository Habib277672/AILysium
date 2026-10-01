import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminContactMessages } from "../../hooks/useContact";
import { Badge } from "../../Components/UI/Badge";

export const AdminContactMessages = () => {
    const { data: messages = [], isLoading: loading, isError: error } = useAdminContactMessages();
    const [search, setSearch] = useState("");

    const filtered = messages.filter((m) => {
        const query = search.trim().toLowerCase();
        if (!query) return true;
        return (
            m.name.toLowerCase().includes(query) ||
            m.email.toLowerCase().includes(query) ||
            m.program.toLowerCase().includes(query)
        );
    });

    return (
        <div>
            <Badge variant="sky">Inbox</Badge>
            <h1 className="mt-3 font-heading text-3xl font-bold text-ink">Contact Messages</h1>
            <p className="mt-2 text-sm text-slate">
                Every message submitted through the public contact form.
            </p>

            <input
                type="text"
                placeholder="Search by name, email, or program…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="mt-6 w-full max-w-xs rounded-full border border-slate/20 px-4 py-2 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
            />

            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate/10 bg-white">
                {loading && <p className="p-6 text-center text-sm text-slate">Loading…</p>}
                {!loading && error && (
                    <p className="p-6 text-center text-sm text-red-600">Couldn't load messages.</p>
                )}

                {!loading && !error && (
                    <table className="min-w-full divide-y divide-slate/10 text-sm">
                        <thead className="bg-cloud text-left text-xs uppercase tracking-wide text-slate/60">
                            <tr>
                                <th className="px-5 py-3">Name</th>
                                <th className="px-5 py-3">Email</th>
                                <th className="px-5 py-3">Program</th>
                                <th className="px-5 py-3">Received</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate/10">
                            {filtered.map((message) => (
                                <tr key={message.id} className="hover:bg-cloud/50">
                                    <td className="whitespace-nowrap px-5 py-3 font-medium text-ink">
                                        <Link
                                            to={`/admin/contact-messages/${message.id}`}
                                            className="hover:text-sky hover:underline"
                                        >
                                            {message.name}
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate">{message.email}</td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate">{message.program}</td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate">
                                        {new Date(message.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-5 py-10 text-center text-slate">
                                        No messages match this search.
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