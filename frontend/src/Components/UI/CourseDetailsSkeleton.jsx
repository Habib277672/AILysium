import { Skeleton } from "./Skeleton";

export const CourseDetailsSkeleton = () => {
  return (
    <div>
      {/* Hero skeleton */}
      <section className="relative min-h-[28rem] overflow-hidden bg-cloud md:min-h-[34rem]">
        <Skeleton className="absolute inset-0 hidden rounded-none sm:block" />
        <div className="absolute inset-0 w-[82%] bg-gradient-to-r from-white via-white/99 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Skeleton className="h-4 w-28 rounded-lg" />

          <div className="mt-5 max-w-xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-lg" />
              <Skeleton className="h-5 w-20 rounded-lg" />
            </div>

            <Skeleton className="mt-4 h-10 w-3/4 rounded-lg" />
            <Skeleton className="mt-3 h-5 w-full rounded-lg" />
            <Skeleton className="mt-2 h-5 w-2/3 rounded-lg" />

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-36 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Details skeleton */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-start gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
            {/* Left content */}
            <div className="space-y-8">
              {/* Benefits */}
              <div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-6 w-36 rounded-lg" />
                </div>
                <div className="mt-3 space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-11 w-full rounded-xl" />
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-6 w-32 rounded-lg" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Format */}
              <div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-6 w-20 rounded-lg" />
                </div>
                <div className="mt-3 space-y-2">
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-4/5 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="rounded-3xl border border-slate/15 bg-white p-7">
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="mt-2 h-8 w-32 rounded-lg" />

                <div className="mt-6 space-y-4 border-t border-slate/10 pt-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-lg" />
                        <Skeleton className="h-4 w-16 rounded-lg" />
                      </div>
                      <Skeleton className="h-4 w-20 rounded-lg" />
                    </div>
                  ))}
                </div>

                <Skeleton className="mt-6 h-11 w-full rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
