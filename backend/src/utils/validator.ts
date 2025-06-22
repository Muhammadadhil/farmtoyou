import { Request, Response, NextFunction } from "express";


export const validateOtp = (req: Request, res: Response, next: NextFunction): void => {
    console.log('body verify otp:',req.body)
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
        res.status(400).json({ message: "Missing OTP or phone number" });
        return;
    }
    next();
};
