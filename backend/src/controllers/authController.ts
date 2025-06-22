import { Request, Response } from "express";
import User, { IFarmerDetail, IBuyerDetail } from "../models/User";
import asyncHandler from "../middlewares/asyncHandler";
import client from "../utils/twilio";
import { OnboardingData } from "../types/onboarding";

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

// Sent Otp
export const sendOtp = async (phoneNumber: string) => {
    try {
      if (!phoneNumber) throw new Error("Phone number required");
      const verification = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID!).verifications.create({ to: phoneNumber, channel: "sms" });
      return verification.sid;
    } catch (error) {
      console.log(error)
      throw new Error('Error at generating otp');
    }
};

// Verify OTP
export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber, code } = req.body;
    if (!phoneNumber || !code) return res.status(400).json({ message: "Phone and code required" });

    const check = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID!).verificationChecks.create({ to: phoneNumber, code });

    if (check.status === "approved") {
        return res.json({ message: "OTP verified" });
    }

    res.status(400).json({ message: "Incorrect code" });
});
