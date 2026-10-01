import { Link, useParams } from "react-router-dom";
import { useAdminContactMessageDetail } from "../../hooks/useContact";
import { Badge } from "../../Components/UI/Badge";
import { Card } from "../../Components/UI/Card";

export const AdminContactMessageDetail = () => {
    const { id } = useParams();
    const { data: message, isLoading: loading, isError: error } = useAdminContactMessageDetail(id);

    if (loading) return <p className="text-sm text-slate">Loading…</p>;

    if (error || !message) {
        return (
            <div>
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    This message could not be found.
                </p>
                <Link to="/admin/contact-messages" className="mt-4 inline-block text-sm text-sky hover:underline">
                    ← Back to messages
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Link to="/admin/contact-messages" className="text-sm text-slate hover:text-sky">
                ← All messages
            </Link>

            <Badge variant="sky" className="mt-4">{message.program}</Badge>
            <h1 className="mt-3 font-heading text-3xl font-bold text-ink">{message.name}</h1>
            <p className="mt-1 text-sm text-slate">
                Received {new Date(message.createdAt).toLocaleString()}
            </p>

            <Card padding="lg" className="mt-6">
                <dl className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">Email</dt>
                        <dd className="mt-1 text-sm text-ink">
                            {message.email}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">Phone</dt>
                        <dd className="mt-1 text-sm text-ink">{message.phone}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">Student's age</dt>
                        <dd className="mt-1 text-sm text-ink">{message.age}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">Program interested in</dt>
                        <dd className="mt-1 text-sm text-ink">{message.program}</dd>
                    </div>
                </dl>
            </Card>

            <Card padding="lg" className="mt-6">
                <h2 className="font-heading text-lg font-semibold text-ink">Message</h2>
                <p className="mt-3 whitespace-pre-wrap text-sm text-slate">{message.message}</p>
            </Card>
        </div>
    );
};