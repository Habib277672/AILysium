export const Input = ({
    label,
    id,
    as = "input",
    className = "",
    children,
    ...props
}) => {
    const Component = as;
    const isTextarea = as === "textarea";

    return (
        <label htmlFor={id} className="block">
            <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
            <Component
                id={id}
                name={id}
                className={`w-full rounded-xl border border-slate/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate/40 transition-all focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20 focus:shadow-[0_0_0_4px_rgba(0,133,254,0.1)] ${isTextarea ? "min-h-[130px] resize-y" : ""
                    } ${className}`}
                {...props}
            >
                {children}
            </Component>
        </label>
    );
};