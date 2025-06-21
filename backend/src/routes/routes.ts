import express from "express";
import { signup, verifyOtpCode } from "../controllers/authController";
import { validateSignup, validateOtp } from "../utils/validator";

const router = express.Router();

router.post("/auth/signup", validateSignup, signup);
router.post("/auth/verify-otp", validateOtp, verifyOtpCode);

export default router;
