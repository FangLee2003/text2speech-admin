import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",  // Đảm bảo trỏ đúng tới server json-server
    headers: {
        "Content-Type": "application/json",
    },
});

// Lấy tất cả plans
export const getPlans = async () => {
    try {
        const response = await api.get("/plans");
        return response.data;
    } catch (error) {
        console.error("Error fetching plans:", error);
    }
};

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
