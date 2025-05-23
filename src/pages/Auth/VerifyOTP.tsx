import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOTP, verifyOTP } from "../../services/auth";
import { validateOTP } from "../../utils/validators";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email: string })?.email || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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

  const handleResend = async () => {
    try {
      await resendOTP(email);
      alert("OTP đã được gửi lại.");
      startCountdown();
    } catch (err: unknown) {
      alert(err);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpError = validateOTP(otp);
    if (otpError) {
      setError(otpError);
      return;
    }

    try {
      const response = await verifyOTP(email, otp);
      if (response.status === 200) {
        alert("Xác minh OTP thành công.");
        navigate("/login");
      } else {
        alert("Xác minh thất bại.");
      }
    } catch (err: unknown) {
      alert(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Xác minh OTP</h2>

      <form onSubmit={handleVerify} className="space-y-4">
        <div className="relative">
          <input
            name="otp"
            type="text"
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
            className={`w-full p-2 border rounded ${error ? "border-red-500" : "border-gray-300"
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
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
