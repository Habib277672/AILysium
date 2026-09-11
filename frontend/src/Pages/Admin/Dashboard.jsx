import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { Card } from "../../Components/UI/Card";
import { Badge } from "../../Components/UI/Badge";

export const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // No dedicated /api/admin/stats endpoint exists — this derives simple
        // counts client-side from the existing users/enrollments/courses
        // endpoints rather than adding a new backend route just for a
        // dashboard summary. Fine at current data volume; worth revisiting
        // with a real aggregation endpoint if these lists grow large.
        const loadStats = async () => {
            try {
                const [usersRes, enrollmentsRes, coursesRes] = await Promise.all([
                    api.get("/admin/users"),
                    api.get("/admin/enrollments"),
                    api.get("/admin/courses"),
                ]);

                const confirmedEnrollments = enrollmentsRes.data.filter(
                    (e) => e.paymentStatus === "CONFIRMED"
                ).length;
                const pendingEnrollments = enrollmentsRes.data.filter(
                    (e) => e.paymentStatus === "PENDING"
                ).length;

                setStats({
                    totalUsers: usersRes.data.length,
                    totalCourses: coursesRes.data.length,
                    totalEnrollments: enrollmentsRes.data.length,
                    confirmedEnrollments,
                    pendingEnrollments,
                });
            } catch (err) {
                setError("Couldn't load dashboard stats.");
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) {
        return <p className="text-sm text-slate">Loading dashboard…</p>;
    }

    if (error) {
        return (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
            </p>
        );
    }

    const cards = [
        { label: "Total users", value: stats.totalUsers },
        { label: "Total courses", value: stats.totalCourses },
        { label: "Total enrollments", value: stats.totalEnrollments },
        { label: "Confirmed payments", value: stats.confirmedEnrollments },
        { label: "Pending payments", value: stats.pendingEnrollments },
    ];

    return (
        <div>
            <Badge variant="sky">Overview</Badge>
            <h1 className="mt-3 font-heading text-3xl font-bold text-ink">
                Dashboard
            </h1>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {cards.map((card) => (
                    <Card key={card.label}>
                        <p className="font-heading text-3xl font-bold text-ink">
                            {card.value}
                        </p>
                        <p className="mt-1 text-sm text-slate">{card.label}</p>
                    </Card>
                ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
                <Link
                    to="/admin/enrollments"
                    className="rounded-full border border-sky bg-sky/10 px-5 py-2.5 text-sm font-medium text-sky hover:bg-sky/20"
                >
                    View enrollment report
                </Link>
                <Link
                    to="/admin/courses"
                    className="rounded-full border border-slate/20 px-5 py-2.5 text-sm font-medium text-slate hover:border-sky hover:text-sky"
                >
                    Manage courses
                </Link>
            </div>
        </div>
    );
};