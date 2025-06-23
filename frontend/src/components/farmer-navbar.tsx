import { Bell, LogOut, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

interface FarmerNavbarProps {
    onCreateProduct: () => void;
}

export function FarmerNavbar({ onCreateProduct }: FarmerNavbarProps) {
    const user = useUser();

    const handleLogout = () => {
        user.logout();
    };

    return (
        <div className="bg-white border-b border-gray-100">
            <div className="px-4 py-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h1 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">Farmer Dashboard</h1>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>Green Valley Farm, Ooty</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button onClick={onCreateProduct} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">Add Product</span>
                            </Button>
                            <div className="relative">
                                <Bell className="w-6 h-6 text-gray-600" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                        </div>
                        {/* Logout Button */}
                        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 px-4 py-2 ml-4 text-gray-600 hover:text-red-600 hover:bg-red-50 border-red-200">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
