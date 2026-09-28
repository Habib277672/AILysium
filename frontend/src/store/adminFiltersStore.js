import { create } from "zustand";

// Genuine global UI state: admin table filters (search text, status
// filter) that should survive navigating away from and back to a page —
// e.g. filter the enrollments report, click into a user's detail page,
// click back, and still see your filter applied instead of it resetting.
// This is NOT server data (that's TanStack Query's job) and NOT purely
// local to one render (that's what makes it worth lifting to Zustand
// rather than useState).
export const useAdminFiltersStore = create((set) => ({
    enrollmentsSearch: "",
    enrollmentsStatusFilter: "All",
    setEnrollmentsSearch: (value) => set({ enrollmentsSearch: value }),
    setEnrollmentsStatusFilter: (value) => set({ enrollmentsStatusFilter: value }),

    usersSearch: "",
    setUsersSearch: (value) => set({ usersSearch: value }),

    coursesStatusFilter: "All",
    setCoursesStatusFilter: (value) => set({ coursesStatusFilter: value }),
}));