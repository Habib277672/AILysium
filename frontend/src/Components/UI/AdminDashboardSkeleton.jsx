import { Skeleton } from "./Skeleton";

export const AdminDashboardSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="mt-3 h-8 w-36 rounded-lg" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-2xl border border-slate/10 bg-white p-5 shadow-sm">
            <Skeleton className="h-8 w-16 rounded-lg" />
            <Skeleton className="mt-2 h-4 w-24 rounded-lg" />
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Skeleton className="h-10 w-44 rounded-full" />
        <Skeleton className="h-10 w-36 rounded-full" />
      </div>
    </div>
  );
};
