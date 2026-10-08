import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/Images/logo.webp";
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";

export const AdminHeader = ({
  expanded,
  isDesktop,
  rail,
  mobileOpen,
  onToggle,
}) => {
  const { user, logout } = useAuth();

  // Large screens: the brand lives in the sidebar while it's open, and moves
  // into the header only when the sidebar is collapsed to the rail.
  const showHeaderBrand = !isDesktop || rail;

  return (
    <header className="border-slate/10 sticky top-0 z-20 flex items-center justify-between gap-4 border-b bg-white/90 px-4 py-3 backdrop-blur-md md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label="Toggle sidebar"
          aria-expanded={isDesktop ? expanded : mobileOpen}
          className="text-slate hover:text-ink hover:bg-cloud grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors md:hidden"
        >
          {!isDesktop && mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
        {showHeaderBrand && (
          <div className="flex items-end gap-2">
            <img src={logo} alt="AiLysium" className="h-9 w-auto sm:h-10" />
            <span className="bg-sky/10 text-sky rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
              Admin
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right leading-tight sm:block">
          <p className="text-ink text-sm font-medium">{user?.fullName}</p>
          <p className="text-slate/60 text-xs">{user?.email}</p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="border-slate/20 text-slate hover:border-sky hover:text-sky inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors"
        >
          <FaSignOutAlt />
          <span className="">Log out</span>
        </button>
      </div>
    </header>
  );
};
