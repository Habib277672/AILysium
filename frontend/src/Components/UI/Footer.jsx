import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo.png";

const programLinks = [
  { to: "/courses/kids-ai", label: "Kids AI" },
  { to: "/courses/vip-mentorship", label: "VIP Mentorship" },
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
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/50 to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-sky/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <div className="inline-flex items-center gap-2.5 rounded-2xl bg-white/20 px-4 py-3 backdrop-blur-sm">
                <img src={logo} alt="AiLysium" className="h-16 w-auto md:h-20" />
              </div>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              Hands-on AI training for teen beginners and freelancers. Based in
              Pakistan, providing accessible AI education to students across the
              country.
            </p>
            <div className="mt-5 space-y-2.5 text-sm">
              <a
                href="mailto:email@mybusiness.com"
                className="flex items-center gap-2.5 text-white/50 transition-colors duration-200 hover:text-white"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                    <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M1.5 5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </span>
                email@mybusiness.com
              </a>
              <a
                href="https://wa.me/12345678900"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-white/50 transition-colors duration-200 hover:text-white"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5a6.5 6.5 0 00-5.8 9.5L1.5 14.5l3.6-.9A6.5 6.5 0 108 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                +12345678900
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">
              Programs
            </h3>
            <ul className="mt-5 space-y-3.5">
              {programLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 transition-all duration-200 hover:pl-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">
              Company
            </h3>
            <ul className="mt-5 space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 transition-all duration-200 hover:pl-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">
              Account
            </h3>
            <ul className="mt-5 space-y-3.5">
              {accountLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 transition-all duration-200 hover:pl-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-xs text-white/30 sm:flex-row sm:justify-between">
          <p>&copy; {year} AiLysium. All rights reserved.</p>
          <p>Course discovery, enrollment & payment platform.</p>
        </div>
      </div>
    </footer>
  );
};
