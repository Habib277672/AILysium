import { Skeleton } from "./Skeleton";

export const AdminTableSkeleton = ({ columns = 6 }) => {
  return (
    <div>
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="mt-3 h-8 w-32 rounded-lg" />
      <Skeleton className="mt-2 h-4 w-64 rounded-lg" />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Skeleton className="h-10 w-full max-w-xs rounded-full" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate/10 bg-white">
        <table className="min-w-full divide-y divide-slate/10 text-sm">
          <thead className="bg-cloud">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-5 py-3 text-left">
                  <Skeleton className="h-4 w-20 rounded-lg" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate/10">
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row}>
                {Array.from({ length: columns }).map((_, i) => (
                  <td key={i} className="px-5 py-3">
                    <Skeleton className="h-4 w-24 rounded-lg" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
