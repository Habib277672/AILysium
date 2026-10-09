export const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const btn =
    "bg-sky text-cloud hover:bg-sky-light shadow-sky/25 hover:shadow-sky/35 cursor-pointer rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all disabled:opacity-40 disabled:pointer-events-none";

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-end">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={btn}
      >
        ← Previous
      </button>
      <span className="bg-cloud text-slate rounded-full px-3.5 py-1.5 text-sm">
        Page <span className="text-ink font-semibold">{page}</span> of{" "}
        <span className="text-ink font-semibold">{totalPages}</span>
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={btn}
      >
        Next →
      </button>
    </div>
  );
};
