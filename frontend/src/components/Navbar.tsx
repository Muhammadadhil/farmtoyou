
import { Bell, MapPin, Home, ShoppingBag, Tractor, ShoppingCart, User } from "lucide-react";

const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: ShoppingBag, label: "Shop", active: false },
    { icon: Tractor, label: "Farms", active: false },
    { icon: ShoppingCart, label: "Cart", active: false },
    { icon: User, label: "Profile", active: false },
];

export function Navbar() {
    return (
        <div className="bg-white border-b border-gray-100">
            <div className="px-4 py-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h1 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">Fresh from Farmers, Straight to You!</h1>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>Delivering to kozhikode, Mankavu</span>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8 mx-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.label}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                        item.active ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <Bell className="w-6 h-6 text-gray-600" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
