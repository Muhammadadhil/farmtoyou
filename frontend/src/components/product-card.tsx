
import { Plus } from "lucide-react";
import type { Product } from "../types/product";

interface ProductCardProps {
    product: Product;
    onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img src={product.image || "/placeholder.svg"} alt={product.name} width={200} height={150} className="w-full h-32 lg:h-40 object-cover" />
                {product.discount && <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{product.discount}% OFF</div>}
                <button
                    onClick={() => onAddToCart(product.id)}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <div className="p-3">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            {product.discount ? (
                                <>
                                    <span className="text-lg font-bold text-green-600">₹{Math.round(product.price * (1 - product.discount / 100))}</span>
                                    <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                                </>
                            ) : (
                                <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                            )}
                        </div>
                        <span className="text-xs text-gray-500">{product.unit}</span>
                    </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                    <div>by {product.farmer}</div>
                    <div>{product.location}</div>
                </div>
            </div>
        </div>
    );
}
