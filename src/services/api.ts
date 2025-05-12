import axios from "axios";
import { Plan } from "@/types/Plan";

const api = axios.create({
    baseURL: "http://178.128.119.242:8080/tts-api",
    headers: {
        "Content-Type": "application/json",
    },
});

// ==== PLANS API ====
export const getPlans = async (page = 0, size = 10): Promise<Plan[]> => {
    try {
        const response = await api.get("/plan", {
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

export const createPlan = async (plan: Omit<Plan, "id" | "createdDate" | "updatedDate">) => {
    const response = await api.post("/plan", plan);
    return response.data.data;
}

export const updatePlan = async (plan: Plan) => {
    const response = await api.put(`/plan`, plan);
    return response.data.data;
}
// END PLANS API ====

// Lấy tất cả users
export const getUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

// Lấy tất cả transactions
export const getTransactions = async () => {
    try {
        const response = await api.get("/transactions");
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
};
