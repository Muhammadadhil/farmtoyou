
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
    return (
        <div className="px-4 py-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="relative flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Find fresh, farm-direct produce..."
                            className="pl-10 pr-4 py-3 h-12 bg-gray-50 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-green-500"
                        />
                    </div>
                    <button className="p-3 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-colors">
                        <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}
