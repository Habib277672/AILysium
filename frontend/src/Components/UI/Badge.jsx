const variants = {
    sky: "bg-sky/10 text-sky",
    ink: "bg-ink/5 text-ink",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
};

export const Badge = ({ children, variant = "sky", className = "" }) => {
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
};