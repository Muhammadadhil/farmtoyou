import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

interface OtpVerificationStepProps {
    onVerify: (otp: string) => void;
    phoneNumber?: string;
}

export function OtpVerificationStep({ onVerify, phoneNumber }: OtpVerificationStepProps) {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-verify when all digits are entered
        if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 4) {
            onVerify(newOtp.join(""));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResendOtp = () => {
        setTimer(30);
        setCanResend(false);
        setOtp(["", "", "", ""]);
        // Here you would typically call an API to resend OTP
        console.log("Resending OTP to:", phoneNumber);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    <Smartphone className="w-8 h-8 text-gray-600" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">OTP Verification</h2>
                    <p className="text-gray-600 text-base lg:text-lg">
                        You will receive a one-time password on
                        <br />
                        your mobile number.
                    </p>
                </div>
            </div>

            <div className="space-y-6 max-w-md mx-auto">
                {/* OTP Input */}
                <div className="flex justify-center gap-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-14 h-14 text-center text-xl font-semibold border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-green-500 focus:outline-none"
                        />
                    ))}
                </div>

                {/* Timer */}
                <div className="text-center">
                    <div className="text-2xl font-mono text-gray-900 mb-4">{formatTime(timer)}</div>

                    <div className="space-y-2">
                        <p className="text-gray-600">{"Don't receive OTP?"}</p>
                        <Button variant="link" onClick={handleResendOtp} disabled={!canResend} className="text-blue-500 hover:text-blue-600 p-0 h-auto font-normal">
                            Resend OTP
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
