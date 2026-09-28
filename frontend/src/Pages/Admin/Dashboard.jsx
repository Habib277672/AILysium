import { Link } from "react-router-dom";
import { useAdminUsers, useAdminEnrollments, useAdminCourses } from "../../hooks/useAdmin";
import { motion } from "motion/react";
import { Card } from "../../Components/UI/Card";
import { Badge } from "../../Components/UI/Badge";
import { AdminDashboardSkeleton } from "../../Components/UI/AdminDashboardSkeleton";

export const AdminDashboard = () => {

    const { data: users = [], isLoading: usersLoading, isError: usersError } = useAdminUsers();
    const { data: enrollments = [], isLoading: enrollmentsLoading, isError: enrollmentsError } =
        useAdminEnrollments();
    const { data: courses = [], isLoading: coursesLoading, isError: coursesError } = useAdminCourses();

    const loading = usersLoading || enrollmentsLoading || coursesLoading;
    const error = usersError || enrollmentsError || coursesError;

    if (loading) {
        return <AdminDashboardSkeleton />;
    }

    if (error) {
        return (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
            </p>
        );
    }

    const confirmedEnrollments = enrollments.filter((e) => e.paymentStatus === "CONFIRMED").length;
    const pendingEnrollments = enrollments.filter((e) => e.paymentStatus === "PENDING").length;

    const cards = [
        { label: "Total users", value: users.length },
        { label: "Total courses", value: courses.length },
        { label: "Total enrollments", value: enrollments.length },
        { label: "Confirmed payments", value: confirmedEnrollments },
        { label: "Pending payments", value: pendingEnrollments },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>
    );
};