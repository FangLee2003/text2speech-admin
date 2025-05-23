import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  token: null,
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

interface JwtPayload {
  exp?: number;
  // có thể thêm các trường khác nếu cần
}

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return !!decoded.exp && decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const isAuthenticated = !!token && isTokenValid(token);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTokenValid(localStorage.getItem("token"))) {
        logout();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
