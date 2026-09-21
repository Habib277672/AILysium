export const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-slate/5 ${className}`}
      {...props}
    />
  );
};
