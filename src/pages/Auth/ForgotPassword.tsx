import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../../services/auth";
import { validateEmail } from "../../utils/validators";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ email: string }>({ email: "" });
  const [errors, setErrors] = useState<{ email?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await sendOTP(formData.email);
      if (response.status === 200) {
        alert("OTP đã được gửi đến email.");
        navigate("/reset-password", { state: { email: formData.email } });
      } else {
        alert("Gửi OTP thất bại.");
      }
    } catch (err: unknown) {
      alert(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Quên mật khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="email"
            type="email"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Gửi mã OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
