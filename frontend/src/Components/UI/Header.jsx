import { useState } from "react";
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

  const isAdmin = user?.role === "ADMIN";
  const accountLink = isAdmin
    ? { to: "/admin", label: "Admin Dashboard" }
    : { to: "/profile", label: "Profile" };

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate/8 bg-white/80 backdrop-blur-xl will-change-transform">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
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
                  ? "bg-sky/8 text-sky"
                  : "text-ink/55 hover:bg-slate/5 hover:text-ink"
                }`
              }
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Button as={Link} to={accountLink.to} variant="primary" size="sm" className="rounded-full px-4 cursor-pointer">
                {accountLink.label}
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full px-4 cursor-pointer">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" variant="ghost" size="sm" className="rounded-xl px-4">
                Log in
              </Button>
              <Button as={Link} to="/signup" variant="primary" size="sm" className="rounded-xl px-5 shadow-sm shadow-sky/25 hover:shadow-md hover:shadow-sky/35">
                Sign up
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink transition-colors hover:bg-slate/5 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <div className="relative h-5 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-ink transition-all duration-300 ${open ? "top-2 rotate-45" : "top-0 rotate-0"
                }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 bg-ink transition-all duration-300 ${open ? "opacity-0" : "opacity-100"
                }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-ink transition-all duration-300 ${open ? "top-2 -rotate-45" : "top-4 rotate-0"
                }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${open ? "max-h-96" : "max-h-0"
          }`}
      >
        <div className="border-t border-slate/8 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-6 py-5">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
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
            <div className="mt-4 flex gap-2.5 border-t border-slate/8 pt-4">
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
                  <Button variant="outline" size="sm" className="flex-1 rounded-full cursor-pointer" onClick={handleLogout}>
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
                    className="flex-1 rounded-xl shadow-sm shadow-sky/25"
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
    </header>
  );
};
