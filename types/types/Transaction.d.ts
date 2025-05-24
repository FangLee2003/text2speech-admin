export interface Order {
    id: number;
    user: string;
    plans: string;
    status: "pending" | "approved" | "rejected";
}
