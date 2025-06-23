export interface FarmerProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    unit: string;
    category: string;
    quantity: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductData {
    name: string;
    description: string;
    price: number;
    unit: string;
    category: string;
    quantity: number;
    farmerId: string;
}

export interface FarmerProfile {
    id: string;
    name: string;
    farmName: string;
    location: string;
    phone: string;
    email: string;
    totalProducts: number;
    activeProducts: number;
    totalSales: number;
}
