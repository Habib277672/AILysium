import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";
import { Button } from "../Components/UI/Button";

const paymentBadgeVariant = {
    PENDING: "warning",
    CONFIRMED: "success",
    FAILED: "warning",
};

export const Profile = () => {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEnrollments = async () => {
            try {
                const { data } = await api.get("/me/enrollments");
                setEnrollments(data);
            } catch (err) {
                setError("Couldn't load your enrollments. Please try refreshing.");
            } finally {
                setLoading(false);
            }
        };
        loadEnrollments();
    }, []);

    // `user` comes from AuthContext, already populated by the time this page
    // renders (ProtectedRoute waits for `loading` before allowing access) —
    // no separate /api/me call needed here.
    if (!user) return null;

    return (
        <div className="mx-auto max-w-4xl px-6 py-16">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <Badge variant="sky">Account</Badge>
                    <h1 className="mt-4 font-heading text-3xl font-bold text-ink">
                        {user.fullName}
                    </h1>
                    <p className="mt-1 text-sm text-slate">{user.email}</p>
                </div>

                {!user.emailVerifiedAt && (
                    <Card
                        padding="sm"
                        className="border border-amber-200 bg-amber-50 text-sm text-amber-700"
                    >
                        Your email isn't verified yet. Check your inbox for a
                        verification link.
                    </Card>
                )}
            </div>

            {/* Account details */}
            <Card padding="lg" className="mt-8">
                <h2 className="font-heading text-lg font-semibold text-ink">
                    Account details
                </h2>
                <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">
                            Full name
                        </dt>
                        <dd className="mt-1 text-sm text-ink">{user.fullName}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">
                            Email
                        </dt>
                        <dd className="mt-1 text-sm text-ink">{user.email}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">
                            Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-ink">{user.phoneNumber}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-wide text-slate/60">
                            Member since
                        </dt>
                        <dd className="mt-1 text-sm text-ink">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </dd>
                    </div>
                </dl>
            </Card>

            {/* Enrollments */}
            <div className="mt-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="font-heading text-2xl font-bold text-ink">
                        My enrollments
                    </h2>
                    <Button as={Link} to="/all-courses" variant="outline" size="sm">
                        Browse all courses
                    </Button>
                </div>

                {loading && (
                    <p className="mt-6 text-sm text-slate">Loading your courses…</p>
                )}

                {!loading && error && (
                    <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                {!loading && !error && enrollments.length === 0 && (
                    <Card padding="lg" className="mt-6 text-center">
                        <p className="text-sm text-slate">
                            You haven't enrolled in any programs yet.
                        </p>
                        <Button as={Link} to="/courses" variant="primary" size="md" className="mt-4">
                            Explore programs
                        </Button>
                    </Card>
                )}

                {!loading && !error && enrollments.length > 0 && (
                    <div className="mt-6 grid gap-4">
                        {enrollments.map((enrollment) => (
                            <Card
                                key={enrollment.id}
                                className="flex flex-wrap items-center justify-between gap-4"
                            >
                                <div>
                                    <p className="font-heading font-semibold text-ink">
                                        {enrollment.course.title}
                                    </p>
                                    <p className="mt-1 text-xs text-slate">
                                        Enrolled{" "}
                                        {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={paymentBadgeVariant[enrollment.paymentStatus]}>
                                        {enrollment.paymentStatus}
                                    </Badge>
                                    {enrollment.paymentStatus === "PENDING" && (
                                        <Button
                                            as={Link}
                                            to={`/payment?enrollmentId=${enrollment.id}`}
                                            variant="primary"
                                            size="sm"
                                        >
                                            Complete payment
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};