import { ReactNode } from "react";
interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}
interface AuthProviderProps {
    children: ReactNode;
}
export declare const AuthProvider: ({ children }: AuthProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare const useAuth: () => AuthContextType;
export {};
