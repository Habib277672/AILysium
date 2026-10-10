import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/Images/logo.webp";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/ai-tools", label: "AI Tools" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event) => {
      const inMenu = menuRef.current?.contains(event.target);
      const inButton = buttonRef.current?.contains(event.target);
      if (!inMenu && !inButton) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick);
  }, [open]);

  const isAdmin = user?.role === "ADMIN";
  const accountLink = isAdmin
    ? { to: "/admin", label: "Admin Dashboard" }
    : { to: "/profile", label: "Profile" };

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="border-slate/8 sticky top-0 z-50 border-b bg-white will-change-transform md:bg-white/80 md:backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="group flex items-center">
          <img src={logo} alt="AiLysium" className="h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
                  ? " text-sky"
                  : "text-ink/55 hover:bg-slate/5 hover:text-ink"
                }`
              }
              end={link.to === "/"}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`bg-sky absolute bottom-1 left-1/2 h-0.5 w-1/2 -translate-x-1/2 rounded-full transition-transform duration-300 ease-out ${isActive ? "scale-x-100" : "scale-x-0"}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Button
                as={Link}
                to={accountLink.to}
                variant="primary"
                size="sm"
                className="cursor-pointer rounded-full px-4"
              >
                {accountLink.label}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="cursor-pointer rounded-full px-4"
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                variant="ghost"
                size="sm"
                className="rounded-xl px-4"
              >
                Log in
              </Button>
              <Button
                as={Link}
                to="/signup"
                variant="primary"
                size="sm"
                className="shadow-sky/25 hover:shadow-sky/35 rounded-full px-5 shadow-sm hover:shadow-md"
              >
                Sign up
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          ref={buttonRef}
          type="button"
          className="text-ink hover:bg-slate/5 relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <div className="relative h-5 w-5">
            <span
              className={`bg-ink absolute top-0 left-0 h-0.5 w-5 transition-transform duration-200 ease-out ${open ? "translate-y-[8px] rotate-45" : "translate-y-0 rotate-0"}`}
            />
            <span
              className={`bg-ink absolute top-2 left-0 h-0.5 w-5 transition-opacity duration-150 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`bg-ink absolute top-4 left-0 h-0.5 w-5 transition-transform duration-200 ease-out ${open ? "-translate-y-[8px] -rotate-45" : "translate-y-0 rotate-0"}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu — absolute overlay under the bar so opening it never
          reflows the page below (in-flow height animation reflowed heavy
          pages like AI Tools every frame and caused visible lag) */}
      <div
        ref={menuRef}
        className={`absolute inset-x-0 top-full z-50 transition-[grid-template-rows] duration-300 shadow-xs ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${open ? "grid grid-rows-[1fr]" : "pointer-events-none grid grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-slate/8 shadow-ink/10 border-t bg-white shadow-lg">
            <div className="mx-auto max-w-6xl px-6 py-5">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `relative rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                        ? "bg-sky/8 text-sky"
                        : "text-ink/55 hover:bg-slate/5 hover:text-ink"
                      }`
                    }
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Full-width divider, aligned with the menu's top border */}
            <div className="border-slate/8 border-t" />

            <div className="mx-auto max-w-6xl px-6 py-4">
              <div className="flex gap-2.5">
                {user ? (
                  <>
                    <Button
                      as={Link}
                      to={accountLink.to}
                      variant="ghost"
                      size="sm"
                      className="flex-1 rounded-xl"
                      onClick={() => setOpen(false)}
                    >
                      {accountLink.label}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 cursor-pointer rounded-full"
                      onClick={handleLogout}
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      as={Link}
                      to="/login"
                      variant="ghost"
                      size="sm"
                      className="flex-1 rounded-xl"
                      onClick={() => setOpen(false)}
                    >
                      Log in
                    </Button>
                    <Button
                      as={Link}
                      to="/signup"
                      variant="primary"
                      size="sm"
                      className="shadow-sky/25 flex-1 rounded-xl shadow-sm"
                      onClick={() => setOpen(false)}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
