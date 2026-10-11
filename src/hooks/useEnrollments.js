import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

export const enrollmentKeys = {
    mine: ["me", "enrollments"],
};

export const useMyEnrollments = (options = {}) => {
    return useQuery({
        queryKey: enrollmentKeys.mine,
        queryFn: async () => {
            const { data } = await api.get("/me/enrollments");
            return data;
        },
        ...options,
    });
};

// Exposed so mutation hooks (Enroll, Payment) can invalidate this cache
// after creating an enrollment or completing a payment — without this,
// Profile/AllCourses would keep showing stale enrollment data until a
// full page refresh.
export const useInvalidateEnrollments = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: enrollmentKeys.mine });
};