import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { enrollmentKeys } from "./useEnrollments";

export const useCreateEnrollment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (courseId) => {
            const { data } = await api.post("/enrollments", { courseId });
            return data;
        },
        // Once a new enrollment exists, Profile/AllCourses' cached enrollment
        // list is stale — invalidate it so the next time either page is
        // visited, it refetches instead of showing outdated data.
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: enrollmentKeys.mine });
        },
    });
};

export const useCreatePayment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ enrollmentId, simulateOutcome }) => {
            const { data } = await api.post("/payments", { enrollmentId, simulateOutcome });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: enrollmentKeys.mine });
        },
    });
};