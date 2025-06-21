
import { Home, ShoppingBag, Tractor, ShoppingCart, User } from "lucide-react";

const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: ShoppingBag, label: "Shop", active: false },
    { icon: Tractor, label: "Farms", active: false },
    { icon: ShoppingCart, label: "Cart", active: false },
    { icon: User, label: "Profile", active: false },
];

export function BottomNav() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 lg:hidden">
            <div className="flex items-center justify-around">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${item.active ? "text-green-600" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
