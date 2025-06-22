import type React from "react";
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CreateProductData } from "../types/farmer";
import toast from "react-hot-toast";

interface CreateProductFormProps {
    onSubmit: (data: CreateProductData) => void;
    onCancel: () => void;
}

export function CreateProductForm({ onSubmit, onCancel }: CreateProductFormProps) {
    const [formData, setFormData] = useState<Partial<CreateProductData>>({
        name: "",
        description: "",
        price: 0,
        unit: "",
        category: "",
        quantity: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ["Vegetables", "Fruits", "Leafy Greens", "Grains & Cereals", "Herbs & Spices", "Dairy Products", "Organic Produce"];
    const units = ["per kg", "per piece", "per bunch", "per liter", "per dozen", "per packet"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.price || !formData.unit || !formData.category || !formData.quantity) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit(formData as CreateProductData);
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: keyof CreateProductData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const isFormValid = formData.name && formData.price && formData.unit && formData.category && formData.quantity;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                        <Button variant="ghost" size="sm" onClick={onCancel} className="h-8 w-8 p-0">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">


                    {/* Product Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Product Name *</label>
                        <Input
                            type="text"
                            placeholder="Enter product name"
                            value={formData.name || ""}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <Textarea
                            placeholder="Describe your product..."
                            value={formData.description || ""}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className="min-h-[100px] rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                    </div>

                    {/* Price and Unit */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Price (₹) *</label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={formData.price || ""}
                                onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value))}
                                className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Unit *</label>
                            <Select value={formData.unit || ""} onValueChange={(value) => handleInputChange("unit", value)}>
                                <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500">
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {units.map((unit) => (
                                        <SelectItem key={unit} value={unit}>
                                            {unit}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Category and Quantity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category *</label>
                            <Select value={formData.category || ""} onValueChange={(value) => handleInputChange("category", value)}>
                                <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Quantity *</label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={formData.quantity || ""}
                                onChange={(e) => handleInputChange("quantity", Number.parseInt(e.target.value))}
                                className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 h-12 rounded-xl border-gray-300" disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 h-12 rounded-xl bg-green-600 hover:bg-green-700" disabled={!isFormValid || isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Product
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
