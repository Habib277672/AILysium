import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/Images/logo.webp";
import adminLogo from "../../assets/Images/admin_logo.webp";
import { FaBars, FaChevronDown, FaSignOutAlt, FaTimes } from "react-icons/fa";

export const AdminHeader = ({
  expanded,
  isDesktop,
  rail,
  mobileOpen,
  onToggle,
}) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

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

      {/* Profile dropdown */}
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="group border-sky/40 hover:border-sky hover:shadow-sky/15 cursor-pointer flex items-center md:gap-2 rounded-full border bg-white py-1.5 pr-3 pl-1.5 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <img
            src={adminLogo}
            alt={user?.fullName ?? "Admin"}
            draggable="false"
            className="border-sky/30  h-9 w-9 shrink-0 rounded-full border-2 object-cover transition-colors duration-200"
          />
          <span className="hidden max-w-36 text-left leading-tight sm:block">
            <p className="text-ink truncate text-sm font-semibold">
              {user?.fullName}
            </p>
            <p className="text-slate/60 truncate text-xs">{user?.email}</p>
          </span>
          <span className="bg-cloud group-hover:bg-sky/10 text-slate/60 group-hover:text-sky grid h-6 w-6 place-items-center rounded-full transition-colors duration-200">
            <FaChevronDown
              className={`text-[10px] transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="shadow-ink/10 ring-slate/10 absolute top-full right-0 z-30 mt-2.5 w-72 origin-top-right overflow-hidden rounded-2xl bg-white shadow-2xl ring-1"
            >
              {/* Account header */}
              <div className="from-sky/8 to-sky/2 flex items-center gap-3 bg-gradient-to-br px-4 py-4">
                <img
                  src={adminLogo}
                  alt={user?.fullName ?? "Admin"}
                  className="border-sky/20 h-11 w-11 shrink-0 rounded-full border-2 object-cover"
                />
                <div className="min-w-0">
                  <p className="text-ink truncate text-sm font-semibold">
                    {user?.fullName}
                  </p>
                  <p className="text-slate/60 truncate text-xs">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="bg-slate/10 h-px" />

              {/* Actions */}
              <div className="p-2">
                <button
                  type="button"
                  onClick={logout}
                  className="group flex w-full items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-red-600 transition-colors group-hover:bg-red-100">
                    <FaSignOutAlt className="text-sm" />
                  </span>
                  Log out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
