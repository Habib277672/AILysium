const variants = {
    default: "bg-white border border-slate/10 shadow-sm shadow-ink/5",
    highlight: "bg-sky text-white shadow-md shadow-sky/30",
    dark: "bg-ink-soft text-white",
};

const paddings = {
    sm: "p-5",
    md: "p-6",
    lg: "p-8",
};

export const Card = ({
    children,
    variant = "default",
    padding = "md",
    className = "",
    as: Component = "div",
    ...props
}) => {
    return (
        <Component
            className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};