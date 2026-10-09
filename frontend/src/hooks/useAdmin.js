import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../lib/api";

export const adminKeys = {
  users: (page, search) => ["admin", "users", page, search],
  userDetail: (id) => ["admin", "users", id],
  enrollments: (page, search, status) => [
    "admin",
    "enrollments",
    page,
    search,
    status,
  ],
  courses: ["admin", "courses"],
};

export const useAdminUsers = (page, search) => {
  return useQuery({
    queryKey: adminKeys.users(page, search),
    queryFn: async () => {
      const { data } = await api.get("/admin/users", {
        params: { page, search },
      });
      return data; // { data, total, page, totalPages }
    },
    placeholderData: keepPreviousData, // keeps old rows visible while new ones load
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

export const useAdminEnrollments = (page, search, status) => {
  return useQuery({
    queryKey: adminKeys.enrollments(page, search, status),
    queryFn: async () => {
      const { data } = await api.get("/admin/enrollments", {
        params: { page, search, status },
      });
      return data;
    },
    placeholderData: keepPreviousData,
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
