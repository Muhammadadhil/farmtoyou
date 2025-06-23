import { useEffect, useState } from "react";
import { FarmerNavbar } from "../components/farmer-navbar";
import { FarmerProductCard } from "../components/farmer-product-card";
import { CreateProductForm } from "../components/create-product-form";
import { farmerProducts } from "../data/farmer-data";
import type { CreateProductData, FarmerProduct } from "../types/farmer";
import { addProduct, getFarmerProducts } from "@/api/product";
import { useUser } from "../context/UserContext";

export default function FarmerDashboard() {
    const [products, setProducts] = useState<FarmerProduct[]>(farmerProducts);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const userData = useUser();

    const handleCreateProduct = () => {
        setShowCreateForm(true);
    };

    const getAvailableProducts = async () => {
        const products = await getFarmerProducts(userData.user?.id ?? "");
        setProducts(products.data.products);
    };

    useEffect(() => {
        getAvailableProducts();
    }, []);

    const handleSubmitProduct = async (data: CreateProductData) => {
        try {
            const newProduct: CreateProductData = {
                name: data.name,
                description: data.description,
                price: data.price,
                unit: data.unit,
                category: data.category,
                quantity: data.quantity,
                farmerId: userData.user?.id ?? "",
            };
            const response = await addProduct(newProduct);

            setProducts((prev) => [response.data.product, ...prev]);

            setShowCreateForm(false);
            console.log("New product created:", response.data.product);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditProduct = (productId: string) => {
        console.log("Edit product:", productId);
    };

    const handleToggleStatus = (productId: string) => {
        setProducts((prev) => prev.map((product) => (product.id === productId ? { ...product, isActive: !product.isActive } : product)));
    };
    

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <FarmerNavbar onCreateProduct={handleCreateProduct} />

            {/* Main Content */}
            <div className="px-4 py-6">
                <div className="max-w-6xl mx-auto">
                    {/* Stats */}
                    {/* <FarmerStats profile={farmerProfile} /> */}

                    {/* Products Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">My Products</h2>
                            <div className="text-sm text-gray-600">{products.length} products</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products?.map((product) => (
                                <FarmerProductCard key={product.id} product={product} onEdit={handleEditProduct} onToggleStatus={handleToggleStatus} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Product Form Modal */}
            {showCreateForm && <CreateProductForm onSubmit={handleSubmitProduct} onCancel={() => setShowCreateForm(false)} />}
        </div>
    );
}
