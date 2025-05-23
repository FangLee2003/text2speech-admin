import { Plan } from "@/types/Plan";
export declare const getPlans: (page?: number, size?: number) => Promise<Plan[]>;
export declare const createPlan: (plan: Omit<Plan, "id" | "createdDate" | "updatedDate">) => Promise<any>;
export declare const updatePlan: (plan: Plan) => Promise<any>;
export declare const getUsers: () => Promise<any>;
export declare const getTransactions: () => Promise<any>;
