import { create } from "zustand";

// Genuine global UI state: admin table filters (search text, status
// filter) that should survive navigating away from and back to a page —
// e.g. filter the enrollments report, click into a user's detail page,
// click back, and still see your filter applied instead of it resetting.
// This is NOT server data (that's TanStack Query's job) and NOT purely
// local to one render (that's what makes it worth lifting to Zustand
// rather than useState).
export const useAdminFiltersStore = create((set) => ({
    usersPage: 1,
    usersSearch: "",
    setUsersSearch: (value) => set({ usersSearch: value, usersPage: 1 }), // reset to page 1 on new search
    setUsersPage: (page) => set({ usersPage: page }),

    enrollmentsPage: 1,
    enrollmentsSearch: "",
    enrollmentsStatusFilter: "All",
    setEnrollmentsSearch: (value) => set({ enrollmentsSearch: value, enrollmentsPage: 1 }),
    setEnrollmentsStatusFilter: (value) => set({ enrollmentsStatusFilter: value, enrollmentsPage: 1 }),
    setEnrollmentsPage: (page) => set({ enrollmentsPage: page }),

    messagesPage: 1,
    messagesSearch: "",
    setMessagesSearch: (value) => set({ messagesSearch: value, messagesPage: 1 }),
    setMessagesPage: (page) => set({ messagesPage: page }),

    coursesStatusFilter: "All",
    setCoursesStatusFilter: (value) => set({ coursesStatusFilter: value }),
}));