import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/pages/Dashboard";
import Plans from "@/pages/Plans";
import Users from "@/pages/Users";
import TransactionsIndex from "@/pages/Transactions/Index";  // Trang chính của Transactions
import PendingTransactions from "@/pages/Transactions/Pending";  // Trang Pending
import TransactionHistory from "@/pages/Transactions/History";  // Trang History
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import NotFound from "@/pages/Auth/NotFound";
import MainLayout from "@/layouts/MainLayout";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/404" element={<NotFound />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="plans" element={<Plans />} />
        <Route path="users" element={<Users />} />
        <Route path="transactions">
          <Route path="pending" element={<PendingTransactions />} />
          <Route path="history" element={<TransactionHistory />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;