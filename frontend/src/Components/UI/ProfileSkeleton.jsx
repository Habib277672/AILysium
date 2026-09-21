import { Skeleton } from "./Skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* Account card */}
      <div className="rounded-3xl border border-slate/10 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <Skeleton className="h-16 w-16 shrink-0 rounded-2xl sm:h-20 sm:w-20" />
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <Skeleton className="mx-auto h-6 w-40 rounded-lg sm:mx-0" />
            <Skeleton className="mx-auto mt-2 h-4 w-48 rounded-lg sm:mx-0" />
            <div className="mt-2.5 flex justify-center gap-2 sm:justify-start">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-10 w-24 shrink-0 rounded-full" />
        </div>

        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-slate/10 px-3.5 py-3 sm:px-4 sm:py-3.5">
              <Skeleton className="h-8 w-8 shrink-0 rounded-lg sm:h-9 sm:w-9" />
              <div className="min-w-0 space-y-1.5">
                <Skeleton className="h-3 w-16 rounded-lg" />
                <Skeleton className="h-4 w-28 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrollments */}
      <div className="mt-8">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-6 w-32 rounded-lg" />
        </div>

        <div className="mt-6 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3.5 rounded-2xl border border-slate/10 bg-white px-5 py-4 shadow-sm">
              <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1">
                <Skeleton className="h-4 w-40 rounded-lg" />
                <Skeleton className="mt-1.5 h-3 w-28 rounded-lg" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
