import axios from "axios";

const URL_BASE = import.meta.env.VITE_API_BASE_URL;

// const authHeaders = () => ({
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${localStorage.getItem("token")}`,
// });

export const register = async (
  email: string,
  username: string,
  password: string,
  confirmPassword: string
) => {
  const url = `${URL_BASE}/api/create-user`;
  const payload = { email, username, password, confirmPassword };

  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const login = async (username: string, password: string) => {
  const url = `${URL_BASE}/api/login?username=${encodeURIComponent(
    username
  )}&password=${encodeURIComponent(password)}`;

  const response = await axios.post(url);
  const { data } = response;
  if (data?.token) localStorage.setItem("token", data.token);
  return response;
};

export const forgotPassword = async (
  email: string,
  otp: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  const url = `${URL_BASE}/api/forgot-password`;
  const payload = { email, otp, newPassword, confirmNewPassword };

  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const sendOTP = async (email: string) => {
  const url = `${URL_BASE}/api/send-otp?email=${encodeURIComponent(email)}`;
  const response = await axios.post(url);
  return response;
};

export const verifyOTP = async (email: string, otp: string) => {
  const url = `${URL_BASE}/api/verify-otp?email=${encodeURIComponent(
    email
  )}&otp=${encodeURIComponent(otp)}`;
  const response = await axios.post(url);
  return response;
};

export const resendOTP = async (email: string) => {
  const url = `${URL_BASE}/api/resend-otp?email=${encodeURIComponent(email)}`;
  const response = await axios.post(url);
  return response;
};
