import { QueryClient } from "@tanstack/react-query";

// One shared QueryClient for the whole app. Defaults here apply to every
// useQuery call unless overridden per-query.
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Data is considered fresh for 30s — avoids refetching the same
            // course list twice if two components mount it back-to-back.
            staleTime: 30 * 1000,
            // Don't refetch just because the browser tab regained focus — this
            // app's data (courses, enrollments) doesn't change second-to-second,
            // so this avoids surprise loading flickers when switching tabs.
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});