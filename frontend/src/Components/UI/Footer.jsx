import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo.webp";

const socialLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "Facebook" },
  { href: "#", label: "X" },
  { href: "#", label: "YouTube" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "TikTok" },
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

      <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-12">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block">
              <div className="inline-flex items-center gap-2.5 rounded-2xl bg-white/40 px-3 py-2.5 backdrop-blur-sm sm:px-4 sm:py-3">
                <img src={logo} alt="AiLysium" className="h-12 w-auto sm:h-16 md:h-20" />
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
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

          {/* Social Media */}
          <div className="col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">
              Social Media
            </h3>
            <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
              {socialLinks.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/50 transition-all duration-200 hover:pl-1 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">
              Company
            </h3>
            <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
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

          {/* Account */}
          <div className="col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">
              Account
            </h3>
            <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
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
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-xs text-white/30 sm:flex-row sm:justify-between md:mt-14">
          <p>&copy; {year} AiLysium. All rights reserved.</p>
          <p>Course discovery, enrollment & payment platform.</p>
        </div>
      </div>
    </footer>
  );
};
