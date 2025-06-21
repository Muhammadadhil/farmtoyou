import { Request, Response } from "express";
import User from "../models/User";
import Farmer from "../models/Farmer";
import Buyer from "../models/Buyer";
import { generateOtp, verifyOtp } from "../utils/otp";
import asyncHandler from "../middlewares/asyncHandler";

// User signup
export const signup = asyncHandler(async (req: Request, res: Response) => {
    const { role, name, phoneNumber, farmDetails, buyerDetails } = req.body;

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, phoneNumber, role });
    await user.save();

    if (role === "farmer" && farmDetails) {
        const farmer = new Farmer({ ...farmDetails, name, phoneNumber });
        await farmer.save();
    } else if (role === "buyer" && buyerDetails) {
        const buyer = new Buyer({ ...buyerDetails, name, phoneNumber });
        await buyer.save();
    }

    generateOtp(phoneNumber);
    res.status(201).json({ message: "User registered. OTP sent." });
});

// OTP verification
export const verifyOtpCode = asyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber, otp } = req.body;

    const isValidOtp = verifyOtp(phoneNumber, otp);
    if (!isValidOtp) return res.status(400).json({ message: "Invalid OTP" });

    await User.findOneAndUpdate({ phoneNumber }, { otpVerified: true });
    res.status(200).json({ message: "OTP verified successfully" });
});
