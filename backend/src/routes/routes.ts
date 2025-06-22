import express from "express";
import { signup, verifyOtp } from "../controllers/authController";
import { validateOtp } from "../utils/validator";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/verify-otp", verifyOtp);

export default router;
