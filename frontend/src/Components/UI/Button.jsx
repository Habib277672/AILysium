const variants = {
    primary: "bg-sky text-white hover:bg-sky-light shadow-sm shadow-sky/30",
    secondary: "bg-ink-soft text-white hover:bg-ink",
    outline: "border border-slate/30 text-ink hover:border-sky hover:text-sky",
    ghost: "text-ink hover:bg-cloud",
};

const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-base",
};

export const Button = ({
    children,
    variant = "primary",
    size = "md",
    as: Component = "button",
    className = "",
    ...props
}) => {
    return (
        <Component
            className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};