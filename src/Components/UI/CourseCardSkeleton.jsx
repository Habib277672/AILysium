import { Skeleton } from "./Skeleton";

export const CourseCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate/10 bg-white shadow-sm shadow-ink/4">
      <div className="relative -mx-6 -mt-13.5 overflow-hidden rounded-t-3xl">
        <Skeleton className="h-52 w-[calc(100%+3rem)] rounded-none" />
      </div>

      <div className="flex flex-1 flex-col px-1">
        <Skeleton className="h-6 w-3/4 rounded-lg" />
        <div className="mt-2.5 space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-2/3 rounded-lg" />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded-lg" />
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate/10 pt-5">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16 rounded-lg" />
            <Skeleton className="h-5 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
};
