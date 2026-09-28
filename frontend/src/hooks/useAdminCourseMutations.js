import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { adminKeys } from "./useAdmin";
import { courseKeys } from "./useCourses";

// Every mutation invalidates BOTH the admin course list and the public
// course list/detail caches — a course edited in the admin panel should
// immediately reflect on the public /courses and /courses/:slug pages
// too, not just in the admin view.
const invalidateAllCourseCaches = (queryClient) => {
    queryClient.invalidateQueries({ queryKey: adminKeys.courses });
    queryClient.invalidateQueries({ queryKey: courseKeys.all });
};

export const useCreateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await api.post("/admin/courses", payload);
            return data;
        },
        onSuccess: () => invalidateAllCourseCaches(queryClient),
    });
};

export const useUpdateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, payload }) => {
            const { data } = await api.patch(`/admin/courses/${id}`, payload);
            return data;
        },
        onSuccess: () => invalidateAllCourseCaches(queryClient),
    });
};

export const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/admin/courses/${id}`);
            return data;
        },
        onSuccess: () => invalidateAllCourseCaches(queryClient),
    });
};