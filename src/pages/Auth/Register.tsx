import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validators";
import { register } from "../../services/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const usernameError = validateUsername(formData.username);
    if (usernameError) newErrors.username = usernameError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    if (confirmPasswordError)
      newErrors.confirmPassword = confirmPasswordError;

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
      const response = await register(
        formData.email,
        formData.username,
        formData.password,
        formData.confirmPassword
      );
      if (response.status === 200) {
        navigate("/verify-otp", {
          state: { email: formData.email, from: "register" },
        });
      } else {
        alert("Đăng ký thất bại.");
      }
    } catch (err: unknown) {
      alert(err);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Đăng ký</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <input
            name="username"
            type="text"
            placeholder="Tên đăng nhập"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.username ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.username && (
            <p className="text-red-600 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Đăng ký
        </button>
      </form>

      <div className="mt-4 flex justify-between text-sm">
        <Link to="/login" className="text-blue-600 hover:underline">
          Đã có tài khoản? Đăng nhập
        </Link>
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Quên mật khẩu?
        </Link>
      </div>
    </div>
  );
};

export default Register;
