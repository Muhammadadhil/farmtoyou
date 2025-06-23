import { Request, Response } from "express";
import User, { IFarmerDetail, IBuyerDetail } from "../models/User";
import asyncHandler from "../middlewares/asyncHandler";
import { OnboardingData } from "../types/onboarding";
import Otp from "../models/Otp";
import axios from "axios";
import { userInfo } from "os";

// Signup
export const signup = asyncHandler(async (req: Request, res: Response) => {
    const { language, role, farmDetails, buyerDetails }: OnboardingData = req.body;

    // Validate role
    if (!["farmer", "buyer"].includes(role)) {
        return res.status(400).json({ message: "Invalid role. Role must be 'farmer' or 'buyer'." });
    }

    // Validate required fields based on role
    if (role === "farmer" && (!farmDetails || !farmDetails.name || !farmDetails.phoneNumber)) {
        return res.status(400).json({ message: "Farmer details are incomplete or missing." });
    }

    if (role === "buyer" && (!buyerDetails || !buyerDetails.name || !buyerDetails.phoneNumber)) {
        return res.status(400).json({ message: "Buyer details are incomplete or missing." });
    }

    const phoneNumber = role === "farmer" ? farmDetails!.phoneNumber : buyerDetails!.phoneNumber;

    // Check if the user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
        return res.status(400).json({ message: "User with this phone number already exists." });
    }

    // Create the new user
    const newUser = new User({
        language,
        role,
        name: role === "farmer" ? farmDetails!.name : buyerDetails!.name,
        phoneNumber,
        otpVerified: false,
        farmerDetail:
            role === "farmer"
                ? {
                      farmName: farmDetails!.farmName,
                      farmLocation: farmDetails!.farmLocation,
                      produceType: farmDetails!.produceType,
                  }
                : undefined,
        buyerDetail:
            role === "buyer"
                ? {
                      deliveryLocation: buyerDetails!.deliveryLocation,
                  }
                : undefined,
    });

    await newUser.save();

    try {
        await sendOtp(phoneNumber);
        res.status(201).json({ message: "User registered successfully. OTP sent." });
    } catch (err) {
        await User.deleteOne({ phoneNumber });
        res.status(500).json({ message: "User created, but failed to send OTP. Please try again." });
    }
});

// Sent Otp
export const sendOtp = async (phoneNumber: string) => {
    if (!phoneNumber) throw new Error("Phone number is required");

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Remove any existing OTPs for this phone number
    await Otp.deleteMany({ phoneNumber });

    const otpRecord = new Otp({
        phoneNumber,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
    });
    await otpRecord.save();
    console.log("generated otp:", otp);

    await sendSms(phoneNumber, otp);
};

export const sendSms = async (phoneNumber: string, otp: string) => {
    try {
        const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
            "route": "q",
            "message": `Your farmtoyou code:${otp}`,
            "flash": 0,
            "numbers": `${phoneNumber}`,
        }, {
            headers: {
                "authorization": `${process.env.FAST2SMS_API_KEY}`,
                "Content-Type": "application/json"
            }
        })
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
};

// Verify OTP
export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber, code } = req.body;
    if (!phoneNumber || !code) {
        return res.status(400).json({ message: "Phone number and OTP are required" });
    }

    // Find the OTP record in MongoDB
    const otpRecord = await Otp.findOne({ phoneNumber });
    if (!otpRecord) {
        return res.status(400).json({ message: "OTP expired or invalid" });
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < new Date()) {
        await Otp.deleteOne({ phoneNumber });
        return res.status(400).json({ message: "OTP expired" });
    }

    if (otpRecord.otp !== code) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ phoneNumber });

    // OTP is valid; delete the record
    await Otp.deleteOne({ phoneNumber });

    res.status(200).json({ message: "OTP verified successfully", id: user?._id, role: user?.role, userName: user?.name });
});

export const login = asyncHandler(async (req: Request, res: Response) => {

    const { phoneNumber, role, password } = req.body;
    if (!phoneNumber ) {
        return res.status(400).json({ message: "phoneNumber is required" });
    }
    console.log('phone:',phoneNumber)
    const user = await User.findOne({ phoneNumber });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
        id: user._id,
        role: user.role,
        name: user.name,
    });
});


