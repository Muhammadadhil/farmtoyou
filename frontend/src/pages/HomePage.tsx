import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/search-bar";
import { PromoCarousel } from "../components/promo-carousal";
import { ProductCard } from "../components/product-card";
import { BottomNav } from "../components/ bottom-nav";
import { promoCards } from "../data/product";
import type { FarmerProduct } from "@/types/farmer";
import { farmerProducts } from "@/data/farmer-data";
import { getProducts } from "@/api/product";

export default function Homepage() {
    const [cart, setCart] = useState<string[]>([]);
    const [products, setProducts] = useState<FarmerProduct[]>(farmerProducts);

    const handleAddToCart = (productId: string) => {
        setCart((prev) => [...prev, productId]);
        console.log(`Added product ${productId} to cart`);
    };

    const getAvailableProducts = async () => {
        const products = await getProducts();
        setProducts(products.data.products);
    };

    useEffect(() => {
        getAvailableProducts();
    }, []);

    console.log("cart items:", cart);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Search Bar */}
            <SearchBar />

            {/* Promo Carousel */}
            <PromoCarousel cards={promoCards} />

            {/* Seasonal Produce Section */}
            <div className="px-4 py-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Seasonal Produce</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {products?.map((product) => (
                            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom spacing for mobile nav */}
            <div className="h-20 lg:h-0" />

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
