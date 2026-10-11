import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../lib/api";
import { adminKeys } from "./useAdmin";

// Lightweight user search for the enrollment form's user picker. Separate
// from useAdminUsers (which is paginated for the Users table) since this
// just needs "find a user by typing a few letters," not a page of 20.
export const useUserSearch = (search) => {
  return useQuery({
    queryKey: ["admin", "user-search", search],
    queryFn: async () => {
      const { data } = await api.get("/admin/users", {
        params: { page: 1, search },
      });
      return data.data;
    },
    enabled: search.trim().length >= 2, // avoid firing on every single keystroke from 0-1 chars
    placeholderData: keepPreviousData, // keeps last results showing while the debounced one loads
  });
};

export const useCreateManualEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/admin/manual-enrollments", payload);
      return data;
    },
    onSuccess: () => {
      // Manual enrollments should show up immediately in the real
      // enrollment report and dashboard stats.
      queryClient.invalidateQueries({ queryKey: ["admin", "enrollments"] });
      queryClient.invalidateQueries({ queryKey: adminKeys.courses });
    },
  });
};
