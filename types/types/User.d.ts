export interface User {
    id: number;
    username: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    credit: number;
    status: string;
}
