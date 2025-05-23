export declare const register: (email: string, username: string, password: string, confirmPassword: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const login: (username: string, password: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const forgotPassword: (email: string, otp: string, newPassword: string, confirmNewPassword: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const sendOTP: (email: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const verifyOTP: (email: string, otp: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const resendOTP: (email: string) => Promise<import("axios").AxiosResponse<any, any>>;
