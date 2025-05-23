export const validateEmail = (email: string) => {
    if (!email) return "Vui lòng nhập email.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Email không hợp lệ.";
};

export const validateUsername = (username: string) => {
    if (!username) return "Vui lòng nhập tên đăng nhập.";
    if (username.length < 3) return "Tên đăng nhập phải có ít nhất 3 ký tự.";
    return "";
};

export const validatePassword = (password: string) => {
    if (!password) return "Vui lòng nhập mật khẩu.";
    if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
    return "";
};

export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
) => {
    if (!confirmPassword) return "Vui lòng xác nhận mật khẩu.";
    if (password !== confirmPassword) return "Mật khẩu không khớp.";
    return "";
};

export const validateOTP = (otp: string) => {
    if (!otp) return "Vui lòng nhập mã OTP.";
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) return "OTP phải gồm 6 chữ số.";
    return "";
};
