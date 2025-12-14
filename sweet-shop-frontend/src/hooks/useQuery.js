import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../api/api";

// Fetch all sweets
export const useFetchSweets = (token, onError) => {
    return useQuery("sweets",
        async () => {
            return await api.get("/api/sweets", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
        },
        {
            select: (data) => {
                return data.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
            },
            onError,
            staleTime: 5000
        }
    );
};

// Search sweets
export const useSearchSweets = (token, searchParams, onError) => {
    const queryString = new URLSearchParams(
        Object.fromEntries(
            Object.entries(searchParams).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
        )
    ).toString();

    return useQuery(
        ["sweets-search", searchParams],
        async () => {
            return await api.get(`/api/sweets/search?${queryString}`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
        },
        {
            select: (data) => data.data,
            onError,
            staleTime: 5000,
            enabled: queryString.length > 0
        }
    );
};

// Create sweet
export const useCreateSweet = (token) => {
    const queryClient = useQueryClient();
    
    return useMutation(
        async (sweetData) => {
            return await api.post("/api/sweets", sweetData, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("sweets");
            },
        }
    );
};

// Update sweet
export const useUpdateSweet = (token) => {
    const queryClient = useQueryClient();
    
    return useMutation(
        async ({ id, sweetData }) => {
            return await api.put(`/api/sweets/${id}`, sweetData, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("sweets");
            },
        }
    );
};

// Delete sweet (Admin only)
export const useDeleteSweet = (token) => {
    const queryClient = useQueryClient();
    
    return useMutation(
        async (id) => {
            return await api.delete(`/api/sweets/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("sweets");
            },
        }
    );
};

// Purchase sweet
export const usePurchaseSweet = (token) => {
    const queryClient = useQueryClient();
    
    return useMutation(
        async ({ id, quantity = 1 }) => {
            return await api.post(`/api/sweets/${id}/purchase`, { quantity }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("sweets");
            },
        }
    );
};

// Restock sweet (Admin only)
export const useRestockSweet = (token) => {
    const queryClient = useQueryClient();
    
    return useMutation(
        async ({ id, quantity }) => {
            return await api.post(`/api/sweets/${id}/restock`, { quantity }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("sweets");
            },
        }
    );
};