import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

// Centralized query keys — every component fetching courses uses the same
// key, so TanStack Query's cache is shared instead of each page keeping
// its own separate copy of the same data.
export const courseKeys = {
    all: ["courses"],
    detail: (slug) => ["courses", slug],
};

export const useCourses = () => {
    return useQuery({
        queryKey: courseKeys.all,
        queryFn: async () => {
            const { data } = await api.get("/courses");
            return data;
        },
    });
};

export const useCourseDetails = (slug) => {
    return useQuery({
        queryKey: courseKeys.detail(slug),
        queryFn: async () => {
            const { data } = await api.get(`/courses/${slug}`);
            return data;
        },
        enabled: Boolean(slug),
        retry: false, // a 404 (course not found) shouldn't be retried
    });
};