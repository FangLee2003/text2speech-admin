export declare const validateEmail: (email: string) => "" | "Vui lòng nhập email." | "Email không hợp lệ.";
export declare const validateUsername: (username: string) => "" | "Vui lòng nhập tên đăng nhập." | "Tên đăng nhập phải có ít nhất 3 ký tự.";
export declare const validatePassword: (password: string) => "" | "Vui lòng nhập mật khẩu." | "Mật khẩu phải có ít nhất 6 ký tự.";
export declare const validateConfirmPassword: (password: string, confirmPassword: string) => "" | "Vui lòng xác nhận mật khẩu." | "Mật khẩu không khớp.";
export declare const validateOTP: (otp: string) => "" | "Vui lòng nhập mã OTP." | "OTP phải gồm 6 chữ số.";
