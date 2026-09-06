import { Link } from "react-router-dom";

const programLinks = [
    { to: "/courses/kids-ai", label: "Kids AI" },
    { to: "/courses/vip-mentorship", label: "VIP One-on-One Mentorship" },
    { to: "/courses/freelancer-ai", label: "Freelancer AI" },
];

const companyLinks = [
    { to: "/about", label: "About" },
    { to: "/courses", label: "Courses" },
    { to: "/ai-tools", label: "AI Tools" },
    { to: "/contact", label: "Contact" },
];

const accountLinks = [
    { to: "/login", label: "Log in" },
    { to: "/signup", label: "Sign up" },
    { to: "/profile", label: "Profile" },
];

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-ink text-white">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-sky" />
                            <span className="font-heading text-lg font-bold">AiLysium</span>
                        </div>
                        <p className="mt-4 max-w-xs text-sm text-white/60">
                            Hands-on AI training for teen beginners and freelancers. We are
                            located in Pakistan, providing accessible AI education and
                            training to students across the country.
                        </p>
                        <div className="mt-4 space-y-1 text-sm text-white/60">
                            <p>
                                Email:{" "}
                                <span className="text-white/80">
                                    email@mybusiness.com
                                </span>{" "}
                                <span className="text-amber-400/80">
                                    (placeholder — replace before production)
                                </span>
                            </p>
                            <p>
                                Phone/WhatsApp:{" "}
                                <span className="text-white/80">+12345678900</span>{" "}
                                <span className="text-amber-400/80">
                                    (placeholder — replace before production)
                                </span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
                            Programs
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {programLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-white/70 hover:text-sky-light"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-white/70 hover:text-sky-light"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
                            Account
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {accountLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-white/70 hover:text-sky-light"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
                    <p>© {year} AiLysium. All rights reserved.</p>
                    <p>Course discovery, enrollment & payment platform — not an LMS.</p>
                </div>
            </div>
        </footer>
    );
};