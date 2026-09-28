import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

export const adminKeys = {
    users: ["admin", "users"],
    userDetail: (id) => ["admin", "users", id],
    enrollments: ["admin", "enrollments"],
    courses: ["admin", "courses"],
};

export const useAdminUsers = () => {
    return useQuery({
        queryKey: adminKeys.users,
        queryFn: async () => {
            const { data } = await api.get("/admin/users");
            return data;
        },
    });
};

export const useAdminUserDetail = (id) => {
    return useQuery({
        queryKey: adminKeys.userDetail(id),
        queryFn: async () => {
            const { data } = await api.get(`/admin/users/${id}`);
            return data;
        },
        enabled: Boolean(id),
        retry: false,
    });
};

export const useAdminEnrollments = () => {
    return useQuery({
        queryKey: adminKeys.enrollments,
        queryFn: async () => {
            const { data } = await api.get("/admin/enrollments");
            return data;
        },
    });
};

export const useAdminCourses = () => {
    return useQuery({
        queryKey: adminKeys.courses,
        queryFn: async () => {
            const { data } = await api.get("/admin/courses");
            return data;
        },
    });
};

// Used by the Dashboard's derived stats — exposed so it can invalidate
// everything at once after a course/enrollment mutation elsewhere, if
// ever needed.
export const useInvalidateAdminData = () => {
    const queryClient = useQueryClient();
    return () => {
        queryClient.invalidateQueries({ queryKey: ["admin"] });
    };
};