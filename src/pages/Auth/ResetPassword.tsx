import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOTP, forgotPassword } from "../../services/auth";
import {
  validateOTP,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validators";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email: string })?.email || "";

  const [formData, setFormData] = useState<{
    otp: string;
    newPassword: string;
    confirmNewPassword: string;
  }>({
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState<{
    otp?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }>({});

  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = () => {
    setCountdown(60);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const validate = () => {
    const newErrors: typeof errors = {};
    const otpError = validateOTP(formData.otp);
    const newPasswordError = validatePassword(formData.newPassword);
    const confirmPasswordError = validateConfirmPassword(
      formData.newPassword,
      formData.confirmNewPassword
    );

    if (otpError) newErrors.otp = otpError;
    if (newPasswordError) newErrors.newPassword = newPasswordError;
    if (confirmPasswordError)
      newErrors.confirmNewPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await forgotPassword(
        email,
        formData.otp,
        formData.newPassword,
        formData.confirmNewPassword
      );
      if (response.status === 200) {
        alert("Đổi mật khẩu thành công. Vui lòng đăng nhập lại.");
        navigate("/login");
      } else {
        alert("Đổi mật khẩu thất bại.");
      }
    } catch (err: unknown) {
      alert(err);
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP(email);
      alert("Đã gửi lại OTP.");
      startCountdown();
    } catch (err: unknown) {
      alert(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mật khẩu mới */}
        <div>
          <input
            name="newPassword"
            type="password"
            placeholder="Mật khẩu mới"
            value={formData.newPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Xác nhận mật khẩu */}
        <div>
          <input
            name="confirmNewPassword"
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmNewPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmNewPassword}
            </p>
          )}
        </div>

        {/* OTP + Gửi lại */}
        <div className="relative">
          <input
            name="otp"
            type="text"
            placeholder="OTP"
            value={formData.otp}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.otp ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:underline disabled:text-gray-400"
          >
            {countdown > 0 ? `${countdown}s` : "Gửi lại"}
          </button>
          {errors.otp && (
            <p className="text-red-600 text-sm mt-1">{errors.otp}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Xác nhận đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
