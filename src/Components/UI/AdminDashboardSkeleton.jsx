import { Skeleton } from "./Skeleton";

export const AdminDashboardSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-36 w-full" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Skeleton className="h-80 lg:col-span-1" />
        <Skeleton className="h-80 lg:col-span-2" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Skeleton className="h-72 lg:col-span-1" />
        <div className="border-slate/10 shadow-ink/5 overflow-hidden rounded-2xl border bg-white shadow-sm lg:col-span-2">
          <div className="border-slate/10 border-b px-5 py-4">
            <Skeleton className="h-5 w-40" />
          </div>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="border-slate/10 flex items-center gap-4 border-b px-5 py-4 last:border-b-0"
            >
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
