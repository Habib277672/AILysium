import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ScrollToTop } from "../UI/ScrollToTop";
import { Skeleton } from "../UI/Skeleton";

export const GuestOnlyRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <Skeleton className="h-5 w-24 rounded-lg" />
            </div>
        );
    }

    if (user) {
        // Same admin-vs-student destination logic as Login.jsx — an already
        // logged-in admin hitting /login directly (e.g. via browser back
        // button, bookmark, or reload) must land on /admin, not /profile.
        return <Navigate to={user.role === "ADMIN" ? "/admin" : "/profile"} replace />;
    }

    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    );
};