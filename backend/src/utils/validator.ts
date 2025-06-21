import { Request, Response, NextFunction } from "express";

export const validateSignup = (req: Request, res: Response, next: NextFunction): void => {
    const { role, name, phoneNumber } = req.body;
    if (!role || !name || !phoneNumber) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    next(); 
};

export const validateOtp = (req: Request, res: Response, next: NextFunction): void => {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
        res.status(400).json({ message: "Missing OTP or phone number" });
        return;
    }
    next();
};
