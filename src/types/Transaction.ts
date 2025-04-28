export interface Transaction{
    id:number;
    user: string;
    plans: string;
    status: "pending" | "approved" | "rejected"; 
}