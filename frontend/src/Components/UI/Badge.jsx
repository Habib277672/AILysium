const variants = {
    sky: "bg-sky/10 text-sky",
    ink: "bg-ink/5 text-ink",
    success: "bg-emerald-500 text-cloud",
    warning: "bg-amber-400 text-cloud",
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