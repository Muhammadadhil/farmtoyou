import { Request, Response } from "express";
import User, { IFarmerDetail, IBuyerDetail } from "../models/User";
import asyncHandler from "../middlewares/asyncHandler";
import client from "../utils/twilio";
import { OnboardingData } from "../types/onboarding";
import axios from "axios";

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

    // Generate and send OTP
    sendOtp(phoneNumber);

    res.status(201).json({ message: "User registered successfully. OTP sent." });
});

// Send OTP using MSG91
export const sendOtp = async (phoneNumber: string) => {
    try {
        if (!phoneNumber) throw new Error("Phone number is required");

        // Construct the request to MSG91
        const response = await axios.post(
            "https://api.msg91.com/api/v5/otp",
            {
                template_id: process.env.MSG91_TEMPLATE_ID, // MSG91 template ID
                mobile: phoneNumber,
                authkey: process.env.MSG91_API_KEY, // MSG91 API key
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data.type === "success") {
            console.log("OTP sent successfully:", response.data);
            return response.data.otp;
        }

        throw new Error(response.data.message || "Failed to send OTP");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error sending OTP:", error.message);
        } else {
            console.error("Error sending OTP:", error);
        }
        throw new Error("Error while sending OTP");
    }
};

// Verify OTP using MSG91
export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
        return res.status(400).json({ message: "Phone number and OTP code are required" });
    }

    try {
        // Construct the request to MSG91
        const response = await axios.post(
            "https://api.msg91.com/api/v5/otp/verify",
            {
                mobile: phoneNumber,
                otp: code,
                authkey: process.env.MSG91_API_KEY,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data.type === "success") {
            return res.json({ message: "OTP verified successfully" });
        }

        return res.status(400).json({ message: response.data.message || "OTP verification failed" });
    } catch (error) {
        console.error("Error verifying OTP:", error.message || error);
        return res.status(500).json({ message: "Internal server error" });
    }
});