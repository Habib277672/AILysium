const variants = {
  sky: "bg-sky/10 text-sky",
  ink: "bg-ink/5 text-ink",
  success: "bg-emerald-500/10 text-emerald-600 border border-emerald-500",
  warning: "bg-amber-500/10 text-amber-600 border border-amber-500",
  danger: "bg-red-500/10 text-red-600 border border-red-500",
  successSoft: "bg-emerald-500/10 text-emerald-600",
  warningSoft: "bg-amber-500/10 text-amber-600",
};

const sizes = {
  md: "px-3 py-1 text-sm",
  sm: "px-2 py-0.5 text-[11px] font-semibold tracking-wide",
};

export const Badge = ({
  children,
  variant = "sky",
  size = "md",
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center rounded-full ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
