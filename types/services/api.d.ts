import { Plan } from "@/types/Plan";
export declare const getPlans: (page?: number, size?: number) => Promise<Plan[]>;
export declare const createPlan: (plan: Omit<Plan, "id" | "createdDate" | "updatedDate">) => Promise<any>;
export declare const updatePlan: (plan: Plan) => Promise<any>;
export declare const getUsers: (page?: number, size?: number) => Promise<any>;
export declare const createUser: (user: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}) => Promise<any>;
export declare const getOrders: (page?: number, size?: number) => Promise<any>;
export declare const confirmOrder: (orderId: number) => Promise<any>;
