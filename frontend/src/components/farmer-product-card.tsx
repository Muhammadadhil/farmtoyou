
import { Edit, Eye, EyeOff, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { FarmerProduct } from "../types/farmer";

interface FarmerProductCardProps {
    product: FarmerProduct;
    onEdit: (productId: string) => void;
    onToggleStatus: (productId: string) => void;
}

export function FarmerProductCard({ product, onEdit, onToggleStatus }: FarmerProductCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img src={"/placeholder.svg"} alt={product.name} width={200} height={150} className="w-full h-32 lg:h-40 object-cover" />
                <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {product.isActive ? "Active" : "Inactive"}
                    </span>
                </div>
                <div className="absolute top-2 right-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(product.id)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onToggleStatus(product.id)}>
                                {product.isActive ? (
                                    <>
                                        <EyeOff className="w-4 h-4 mr-2" />
                                        Deactivate
                                    </>
                                ) : (
                                    <>
                                        <Eye className="w-4 h-4 mr-2" />
                                        Activate
                                    </>
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mb-3">
                    <div>
                        <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                        <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{product.quantity} units</div>
                        <div className="text-xs text-gray-500">in stock</div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{product.category}</span>
                    <span>Updated {new Date(product.updatedAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}
