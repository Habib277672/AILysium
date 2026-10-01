export const Pagination = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-6 flex items-center justify-center gap-3">
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="rounded-full border border-slate/20 px-4 py-2 text-sm font-medium text-slate transition-colors hover:border-sky hover:text-sky disabled:opacity-40 disabled:hover:border-slate/20 disabled:hover:text-slate"
            >
                ← Previous
            </button>
            <span className="text-sm text-slate">
                Page {page} of {totalPages}
            </span>
            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="rounded-full border border-slate/20 px-4 py-2 text-sm font-medium text-slate transition-colors hover:border-sky hover:text-sky disabled:opacity-40 disabled:hover:border-slate/20 disabled:hover:text-slate"
            >
                Next →
            </button>
        </div>
    );
};