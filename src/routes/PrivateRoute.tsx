import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "@/utils/auth";

interface PrivateRouteProps {
  children: React.JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = getToken();
  
  // Kiểm tra nếu không có token, thì chuyển hướng về trang login
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
