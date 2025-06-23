import instace from "./axiosInstance";
import type { CreateProductData } from "@/types/farmer";

export const addProduct = async (data: CreateProductData) => {
    return await instace.post("/products/create", data);
};

export const getProducts = async () => {
    return await instace.get("/products/");
};


export const getFarmerProducts = async () => {
    return await instace.get("/products/");
};