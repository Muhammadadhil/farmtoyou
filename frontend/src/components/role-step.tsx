import { useState } from "react";
import type { UserRole } from "../types/onboarding";

interface RoleStepProps {
    onSelect: (role: string) => void;
    selectedRole?: string;
}

const roles: UserRole[] = [
    {
        id: "farmer",
        title: "I'm a Farmer",
        description: "Sell your fresh produce directly to customers",
        icon: "👨‍🌾",
    },
    {
        id: "buyer",
        title: "I'm a Buyer",
        description: "Buy fresh produce directly from local farmers",
        icon: "🛒",
    },
];

export function RoleStep({ onSelect, selectedRole }: RoleStepProps) {
    const [selected, setSelected] = useState(selectedRole || "");

    const handleSelect = (roleId: string) => {
        setSelected(roleId);
        onSelect(roleId);
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Choose Your Role</h2>
                <p className="text-gray-600 text-base lg:text-lg">Select your role to get the best experience.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {roles.map((role) => (
                    <button
                        key={role.id}
                        onClick={() => handleSelect(role.id)}
                        className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-200 ${
                            selected === role.id ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-25"
                        }`}
                    >
                        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl mb-4 ${selected === role.id ? "bg-green-200" : "bg-green-100"}`}>{role.icon}</div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{role.title}</h3>
                        <p className="text-sm text-gray-600 text-center">{role.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
