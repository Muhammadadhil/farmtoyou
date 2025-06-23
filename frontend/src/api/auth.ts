import type { loginData, OnboardingData } from "@/types/onboarding";
import instace from "./axiosInstance";

export const signUp = async (data: OnboardingData) => {
    return await instace.post("/auth/signup", data);
};

export const VerifyOtp = async (phoneNumber: string, code: string) => {
    return await instace.post("/auth/verify-otp", { phoneNumber, code });
};

export const login = async (data: loginData) => {
    return await instace.post("/auth/login", data);
};