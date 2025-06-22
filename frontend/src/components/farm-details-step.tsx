import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import type { FarmDetails } from "../types/onboarding";

interface FarmDetailsStepProps {
    onUpdate: (details: Partial<FarmDetails>) => void;
    farmDetails?: Partial<FarmDetails>;
}

export function FarmDetailsStep({ onUpdate, farmDetails = {} }: FarmDetailsStepProps) {
    const [details, setDetails] = useState<Partial<FarmDetails>>(farmDetails);

    const handleInputChange = (field: keyof FarmDetails, value: string) => {
        const updatedDetails = { ...details, [field]: value };
        setDetails(updatedDetails);
        onUpdate(updatedDetails);
    };

    const produceTypes = ["Vegetables", "Fruits", "Grains & Cereals", "Herbs & Spices", "Dairy Products", "Organic Produce", "Mixed Farming"];

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Tell Us About Your Farm</h2>
                <p className="text-gray-600 text-base lg:text-lg">
                    Provide your details to connect with consumers and
                    <br />
                    sell your fresh produce effortlessly.
                </p>
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

                <div className="space-y-2">
                    <Input
                        type="text"
                        placeholder="Enter your farm name"
                        value={details.farmName || ""}
                        onChange={(e) => handleInputChange("farmName", e.target.value)}
                        className="h-14 px-4 text-base border-gray-200 rounded-2xl focus:border-green-500 focus:ring-green-500"
                    />
                </div>

                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Select your farm location"
                        value={details.farmLocation || ""}
                        onChange={(e) => handleInputChange("farmLocation", e.target.value)}
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

                            // Add +91 prefix if not already present
                            if (phoneNumber && !phoneNumber.startsWith("+91")) {
                                phoneNumber = `+91${phoneNumber}`;
                            }

                            handleInputChange("phoneNumber", phoneNumber);
                        }}
                        className="h-14 px-4 text-base border-gray-200 rounded-2xl focus:border-green-500 focus:ring-green-500"
                    />
                </div>

                <div className="space-y-2">
                    <Select value={details.produceType || ""} onValueChange={(value) => handleInputChange("produceType", value)}>
                        <SelectTrigger className="h-14 px-4 text-base border-gray-200 rounded-2xl focus:border-green-500 focus:ring-green-500">
                            <SelectValue placeholder="Type of Produce" />
                        </SelectTrigger>
                        <SelectContent>
                            {produceTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
