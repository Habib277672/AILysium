import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({ adminOnly = false, studentOnly = false }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <p className="text-sm text-slate">Loading…</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    if (adminOnly && user.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    // Blocks admin accounts from student-only flows (enroll, payment,
    // all-courses purchasing view). Sent to /admin rather than / — an admin
    // landing on a bare homepage after clicking a course link would be
    // confusing; redirecting to their actual dashboard is more useful.
    if (studentOnly && user.role === "ADMIN") {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};