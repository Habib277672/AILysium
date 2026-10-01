import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export const contactKeys = {
    admin: (page, search) => ["admin", "contact-messages", page, search],
    adminDetail: (id) => ["admin", "contact-messages", id],
};

// Public — used by Contact.jsx to submit the form. No queryKey needed
// since this never needs caching/invalidation on the submitter's side.
export const useSubmitContactMessage = () => {
    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await api.post("/contact", payload);
            return data;
        },
    });
};

export const useAdminContactMessages = (page, search) => {
    return useQuery({
        queryKey: contactKeys.admin(page, search),
        queryFn: async () => {
            const { data } = await api.get("/admin/contact-messages", { params: { page, search } });
            return data;
        },
        keepPreviousData: true,
    });
};

export const useAdminContactMessageDetail = (id) => {
    return useQuery({
        queryKey: contactKeys.adminDetail(id),
        queryFn: async () => {
            const { data } = await api.get(`/admin/contact-messages/${id}`);
            return data;
        },
        enabled: Boolean(id),
        retry: false,
    });
};