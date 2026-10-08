import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/Images/logo.webp";
import {
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
  FaClipboardList,
  FaEnvelope,
  FaTachometerAlt,
  FaTimes,
  FaUsers,
  FaWrench,
} from "react-icons/fa";

const adminLinks = [
  { to: "/admin", label: "Dashboard", end: true, icon: FaTachometerAlt },
  {
    to: "/admin/secondary-dashboard",
    label: "Secondary Dashboard",
    icon: FaWrench,
  },
  { to: "/admin/users", label: "Users", icon: FaUsers },
  { to: "/admin/enrollments", label: "Enrollments", icon: FaClipboardList },
  { to: "/admin/courses", label: "Courses", icon: FaBookOpen },
  { to: "/admin/contact-messages", label: "Messages", icon: FaEnvelope },
];

const buildLinkClass =
  (isRail) =>
    ({ isActive }) =>
      [
        "group flex items-center gap-3 rounded-xl py-2 text-sm transition-all duration-200",
        isRail ? "justify-center px-0" : "px-3",
        isActive
          ? "bg-sky/10 text-sky"
          : "text-slate hover:bg-white hover:shadow-sm hover:shadow-ink/5",
      ].join(" ");

const chevronStyle = (rotate) => ({
  rotate,
  transition: "rotate 300ms cubic-bezier(0.22, 1, 0.36, 1)",
});

export const AdminSidebar = ({ rail, mobileOpen, onToggle, onClose }) => {
  const { user } = useAuth();

  const initials = (user?.fullName ?? "A")
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const renderNav = (isRail) => (
    <nav aria-label="Admin" className="flex flex-1 flex-col gap-1.5">
      {adminLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          title={link.label}
          className={buildLinkClass(isRail)}
          onClick={onClose}
        >
          {({ isActive }) => (
            <>
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg text-[13px] shadow-sm transition-all duration-200 ${isActive
                  ? "bg-sky shadow-sky/40 text-white shadow-md"
                  : "bg-cloud text-slate/70 group-hover:bg-sky/10 group-hover:text-sky"
                  }`}
              >
                <link.icon className="size-5" />
              </span>
              {!isRail && (
                <span className={isActive ? "font-semibold" : "font-medium"}>
                  {link.label}
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="bg-ink/40 fixed inset-0 z-30 backdrop-blur-[2px] md:hidden"
        />
      )}

      <aside
        aria-label="Admin navigation"
        className={`border-slate/10 fixed inset-y-0 left-0 z-40 w-64 shrink-0 overflow-hidden border-r bg-white md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          } ${rail ? "md:w-[5rem]" : "md:w-64"}`}
        style={{
          transition:
            "width 300ms cubic-bezier(0.22, 1, 0.36, 1), transform 300ms cubic-bezier(0.22, 1, 0.36, 1), translate 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Both views stay mounted (logo included) and cross-fade while the
            width animates — nothing remounts or pops mid-transition. */}
        <div className="relative h-full">
          {/* Expanded view */}
          <div
            inert={rail}
            className={`absolute inset-0 flex flex-col p-5 transition-opacity delay-100 duration-200 ${rail ? "pointer-events-none opacity-0" : "opacity-100"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-end gap-2">
                <img src={logo} alt="AiLysium" className="h-9 w-auto sm:h-10" />
                <span className="bg-sky/10 text-sky rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
                  Admin
                </span>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={onToggle}
                  aria-label="Collapse sidebar"
                  title="Collapse sidebar"
                  className="bg-sky/10 text-sky hover:bg-sky/10 hidden h-8 w-8 cursor-pointer place-items-center rounded-lg transition-colors md:grid"
                >
                  <FaChevronLeft
                    style={chevronStyle(rail ? "-90deg" : "0deg")}
                  />
                </button>
                <button
                  type="button"
                  aria-label="Close sidebar"
                  onClick={onClose}
                  className="text-slate hover:text-ink hover:bg-cloud grid rounded-lg p-1.5 transition-colors md:hidden"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <p className="text-slate/40 mt-8 mb-2 px-3 text-[11px] font-semibold tracking-widest uppercase">
              Menu
            </p>

            {renderNav(false)}

            <div className="border-slate/10 bg-cloud/70 rounded-xl border p-3">
              <div className="flex items-center gap-2.5">
                <span className="bg-sky/10 text-sky grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold">
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="text-ink truncate text-xs font-semibold">
                    {user?.fullName}
                  </p>
                  <p className="text-slate/60 truncate text-[11px]">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Collapsed rail view */}
          <div
            inert={!rail}
            className={`absolute inset-0 flex flex-col px-3 py-6 transition-opacity duration-150 ${rail ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onToggle}
                aria-label="Expand sidebar"
                title="Expand sidebar"
                className="bg-sky/10 text-sky hover:bg-sky/10 mb-4 grid h-9 w-9 place-items-center rounded-xl transition-colors"
              >
                <FaChevronRight style={chevronStyle(rail ? "0deg" : "90deg")} />
              </button>
            </div>
            {renderNav(true)}
          </div>
        </div>
      </aside>
    </>
  );
};
