import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validateUsername, validatePassword } from "../../utils/validators";
import { login as loginAPI } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    if (usernameError) newErrors.username = usernameError;
    if (passwordError) newErrors.password = passwordError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await loginAPI(formData.username, formData.password);
      const token = response?.data?.token;
      if (token) {
        login(token);
        navigate("/");
      } else {
        alert("Đăng nhập thất bại: Không nhận được token.");
      }
    } catch (err: unknown) {
      alert(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Đăng nhập</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </form>

      <div className="mt-4 flex justify-between text-sm">
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Quên mật khẩu?
        </Link>

        <div>
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
