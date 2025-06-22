import { useState } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, User } from "lucide-react";
import type { BuyerDetails } from "../types/onboarding";

interface BuyerProfileStepProps {
    onUpdate: (details: Partial<BuyerDetails>) => void;
    buyerDetails?: Partial<BuyerDetails>;
}

export function BuyerProfileStep({ onUpdate, buyerDetails = {} }: BuyerProfileStepProps) {
    const [details, setDetails] = useState<Partial<BuyerDetails>>(buyerDetails);

    const handleInputChange = (field: keyof BuyerDetails, value: string) => {
        const updatedDetails = { ...details, [field]: value };
        setDetails(updatedDetails);
        onUpdate(updatedDetails);
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    <User className="w-8 h-8 text-gray-600" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Set Up Your Profile</h2>
                    <p className="text-gray-600 text-base lg:text-lg">
                        Complete your details to start buying fresh
                        <br />
                        produce from local farmers.
                    </p>
                </div>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
                <div className="space-y-2">
                    <Input
                        type="text"
                        placeholder="Enter your name here"
                        value={details.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="h-14 px-4 text-base border-gray-200 rounded-2xl focus:border-green-500 focus:ring-green-500"
                    />
                </div>

                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Select your delivery location"
                        value={details.deliveryLocation || ""}
                        onChange={(e) => handleInputChange("deliveryLocation", e.target.value)}
                        className="h-14 px-4 pr-12 text-base border-gray-200 rounded-2xl focus:border-green-500 focus:ring-green-500"
                    />
                    <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="space-y-2">
                    <Input
                        type="tel"
                        placeholder="Enter your phone number (for OTP verification)"
                        value={details.phoneNumber || ""}
                        onChange={(e) => {
                            let phoneNumber = e.target.value;
                            if (phoneNumber && !phoneNumber.startsWith("+91")) {
                                phoneNumber = `+91${phoneNumber}`;
                            }
                            handleInputChange("phoneNumber", phoneNumber);
                        }}
                        className="h-14 px-4 text-base border-gray-200 rounded-2xl focus:border-green-500 focus:ring-green-500"
                    />
                </div>
            </div>
        </div>
    );
}
