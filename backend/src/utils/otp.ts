import crypto from "crypto";

const otpStore = new Map<string, string>();

export const generateOtp = (phoneNumber: string): void => {
    
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore.set(phoneNumber, otp);
    console.log(`OTP for ${phoneNumber}: ${otp}`);
};

export const verifyOtp = (phoneNumber: string, otp: string): boolean => {
    return otpStore.get(phoneNumber) === otp;
};
