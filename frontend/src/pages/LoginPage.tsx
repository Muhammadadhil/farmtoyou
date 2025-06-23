import { useState } from "react";
import { LoginForm } from "../components/login-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/api/auth";
import type { loginData } from "@/types/onboarding";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
    const [userType, setUserType] = useState<"buyer" | "farmer">("buyer");
    const navigate = useNavigate();
    const user = useUser();

    const handleLogin = async (phoneNumber: string, password: string) => {
        console.log("Login attempt:");
        const data: loginData = { phoneNumber, password, role: userType };
        const response = await login(data);
        user.login(response.data);

        if (userType === "farmer") {
            navigate("/farmer-dashboard");
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Welcome Back!</h1>
                    <p className="text-white/90 text-lg">Sign in to continue to Farmtoyou</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                    <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
                        <button
                            onClick={() => setUserType("buyer")}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${userType === "buyer" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
                        >
                            I'm a Buyer
                        </button>
                        <button
                            onClick={() => setUserType("farmer")}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${userType === "farmer" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
                        >
                            I'm a Farmer
                        </button>
                    </div>

                    {/* Login Form */}
                    <LoginForm onLogin={handleLogin} />

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <Link to={"/onboarding"}>
                            <p className="text-gray-600">
                                Don't have an account? <button className="text-green-600 hover:text-green-700 font-medium">Sign Up</button>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
