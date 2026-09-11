import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { Badge } from "../../Components/UI/Badge";
import { Card } from "../../Components/UI/Card";

const paymentBadgeVariant = {
    PENDING: "warning",
    CONFIRMED: "success",
    FAILED: "warning",
};

export const AdminUserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            try {
                const { data } = await api.get(`/admin/users/${id}`);
                setUser(data);
            } catch (err) {
                setError(
                    err.response?.status === 404
                        ? "This user could not be found."
                        : "Couldn't load this user."
                );
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, [id]);

    if (loading) {
        return <p className="text-sm text-slate">Loading…</p>;
    }

    if (error || !user) {
        return (
            <div>
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </p>
                <Link to="/admin/users" className="mt-4 inline-block text-sm text-sky hover:underline">
                    ← Back to users
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Link to="/admin/users" className="text-sm text-slate hover:text-sky">
                ← All users
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <Badge variant={user.role === "ADMIN" ? "sky" : "ink"}>{user.role}</Badge>
                {user.emailVerifiedAt ? (
                    <Badge variant="success">Verified</Badge>
                ) : (
                    <Badge variant="warning">Unverified</Badge>
                )}
            </div>
            <h1 className="mt-3 font-heading text-3xl font-bold text-ink">
                {user.fullName}
            </h1>

            <Card padding="lg" className="mt-6">
                <dl className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">Email</dt>
                        <dd className="mt-1 text-sm text-ink">{user.email}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">Phone</dt>
                        <dd className="mt-1 text-sm text-ink">{user.phoneNumber}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">Joined</dt>
                        <dd className="mt-1 text-sm text-ink">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">
                            Total enrollments
                        </dt>
                        <dd className="mt-1 text-sm text-ink">{user.enrollments.length}</dd>
                    </div>
                </dl>
            </Card>

            <div className="mt-8">
                <h2 className="font-heading text-xl font-bold text-ink">
                    Enrollment history
                </h2>

                {user.enrollments.length === 0 ? (
                    <Card padding="lg" className="mt-4 text-center text-sm text-slate">
                        This user hasn't enrolled in any courses yet.
                    </Card>
                ) : (
                    <div className="mt-4 grid gap-3">
                        {user.enrollments.map((enrollment) => (
                            <Card
                                key={enrollment.id}
                                className="flex flex-wrap items-center justify-between gap-4"
                            >
                                <div>
                                    <p className="font-medium text-ink">{enrollment.course.title}</p>
                                    <p className="mt-1 text-xs text-slate">
                                        Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <Badge variant={paymentBadgeVariant[enrollment.paymentStatus]}>
                                    {enrollment.paymentStatus}
                                </Badge>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};