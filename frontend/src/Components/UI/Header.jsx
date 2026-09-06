import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./Button";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/courses", label: "Courses" },
    { to: "/ai-tools", label: "AI Tools" },
    { to: "/contact", label: "Contact" },
];

const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? "text-sky" : "text-ink/70 hover:text-ink"
    }`;

export const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate/10 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link to="/" className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky" />
                    <span className="font-heading text-lg font-bold text-ink">
                        AiLysium
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className={navLinkClass} end={link.to === "/"}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <Button as={Link} to="/login" variant="ghost" size="sm">
                        Log in
                    </Button>
                    <Button as={Link} to="/signup" variant="primary" size="sm">
                        Sign up
                    </Button>
                </div>

                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-ink md:hidden"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        {open ? (
                            <path
                                d="M5 5L15 15M15 5L5 15"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        ) : (
                            <path
                                d="M3 5H17M3 10H17M3 15H17"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {open && (
                <div className="border-t border-slate/10 bg-white px-6 py-4 md:hidden">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={navLinkClass}
                                end={link.to === "/"}
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="mt-4 flex gap-3">
                        <Button as={Link} to="/login" variant="ghost" size="sm" className="flex-1">
                            Log in
                        </Button>
                        <Button as={Link} to="/signup" variant="primary" size="sm" className="flex-1">
                            Sign up
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
};