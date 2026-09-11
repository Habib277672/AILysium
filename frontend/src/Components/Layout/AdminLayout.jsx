import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const adminLinks = [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/enrollments", label: "Enrollments" },
    { to: "/admin/courses", label: "Courses" },
];

const linkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-sky/10 text-sky" : "text-slate hover:bg-cloud hover:text-ink"
    }`;

export const AdminLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex min-h-screen bg-cloud">
            <aside className="hidden w-64 shrink-0 border-r border-slate/10 bg-white md:block">
                <div className="flex h-full flex-col p-6">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-sky" />
                        <span className="font-heading text-lg font-bold text-ink">
                            AiLysium
                        </span>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate/50">
                        Admin
                    </p>

                    <nav className="mt-8 flex flex-1 flex-col gap-1">
                        {adminLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="border-t border-slate/10 pt-4">
                        <p className="text-sm font-medium text-ink">{user?.fullName}</p>
                        <p className="text-xs text-slate/60">{user?.email}</p>
                        <button
                            type="button"
                            onClick={logout}
                            className="mt-3 text-sm font-medium text-slate hover:text-sky"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-1">
                {/* Mobile nav — simplified to a horizontal scroll strip rather
            than a hamburger drawer, since admin usage is primarily
            desktop-first, unlike the public site. */}
                <div className="flex gap-2 overflow-x-auto border-b border-slate/10 bg-white px-4 py-3 md:hidden">
                    {adminLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={({ isActive }) =>
                                `shrink-0 rounded-full px-4 py-2 text-sm font-medium ${isActive ? "bg-sky/10 text-sky" : "text-slate"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <main className="p-6 md:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};