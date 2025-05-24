import axios from "axios";
import { Plan } from "@/types/Plan";

const URL_BASE = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: URL_BASE,
    headers: {
        "Content-Type": "application/json",
    },
});

// Thêm interceptor để tự động chèn token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ==== PLANS API ====
export const getPlans = async (page = 0, size = 10): Promise<Plan[]> => {
    try {
        const response = await api.get("/admin/plan", {
            params: { page, size },
        });

        if (
            response.data?.code === 200 &&
            Array.isArray(response.data.data?.content)
        ) {
            return response.data.data.content;
        }

        return [];
    } catch (error) {
        console.error("Error fetching plans:", error);
        return [];
    }
};

export const createPlan = async (
    plan: Omit<Plan, "id" | "createdDate" | "updatedDate">
) => {
    const response = await api.post("/admin/plan", plan);
    return response.data.data;
};

export const updatePlan = async (plan: Plan) => {
    const response = await api.put(`/admin/plan`, plan);
    return response.data.data;
};
// END PLANS API ====

// Lấy tất cả users
export const getUsers = async (page = 0, size = 10) => {
    try {
        const response = await api.get("/admin/get-user", {
            params: { page, size },
        });

        if (response.data?.code === 200 && response.data.data) {
            return response.data; // trả về cả object chứa content, totalPages, ...
        }

        return { content: [], totalPages: 0, totalElements: 0 };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { content: [], totalPages: 0, totalElements: 0 };
    }
};

export const createUser = async (user: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}) => {
    try {
        const response = await api.post("/admin/create-user", user);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// Lấy tất cả orders
export const getOrders = async (page = 0, size = 10) => {
    try {
        const response = await api.get("/admin/get-order", {
            params: { page, size },
        });
        if (response.data?.code === 200 && response.data) {
            return response.data; // trả về cả object chứa content, totalPages, ...
        }
        return { content: [], totalPages: 0, totalElements: 0 };

    } catch (error) {
        console.error("Error fetching orders:", error);
        return { content: [], totalPages: 0, totalElements: 0 };
    }
};

// Thêm API xác nhận đơn hàng
export const confirmOrder = async (orderId: number) => {
    try {
        const response = await api.post(`/admin/confirm-order?id=${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error confirming order:", error);
        throw error;
    }
};
