import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
    onLogin: (phoneNumber: string, password: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {

    const [formData, setFormData] = useState({
        phoneNumber: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.phoneNumber || !formData.password) {
            alert("Please fill in all fields");
            return;
        }

        if (formData.phoneNumber.length !== 10) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }

        setIsLoading(true);

        try {
            const fullPhoneNumber = `+91${formData.phoneNumber}`;
            await onLogin(fullPhoneNumber, formData.password);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Phone Number Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <div className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">+91 </div>
                        <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                                if (value.length > 10) {
                                    value = value.slice(0, 10); // Limit to 10 digits
                                }
                                handleInputChange("phoneNumber", value);
                            }}
                            className="pl-16 h-14 text-base border-gray-200 rounded-2xl focus:border-green-500 focus:ring-green-500"
                            maxLength={10}
                            required
                        />
                    </div>
                    <p className="text-xs text-gray-500">Enter 10-digit mobile number without country code</p>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="pl-10 pr-12 h-14 text-base border-gray-200 rounded-2xl focus:border-green-500 focus:ring-green-500"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                    <button type="button" className="text-sm text-green-600 hover:text-green-700 font-medium">
                        Forgot Password?
                    </button>
                </div>

                {/* Login Button */}
                <Button
                    type="submit"
                    disabled={isLoading || !formData.phoneNumber || !formData.password}
                    className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg rounded-2xl"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            Signing In...
                        </div>
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </form>
        </div>
    );
}
