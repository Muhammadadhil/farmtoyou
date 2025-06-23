import { Request, Response } from "express";
import Product, { ProductDocument } from "../models/Product";
import asyncHandler from "../middlewares/asyncHandler";

// Create a new product
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const productData: ProductDocument = req.body;
    console.log(productData);
    // Validate required fields
    if (!productData.name || !productData.price || !productData.unit ) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

    const product = new Product(productData);
    const savedProduct = await product.save();
    return res.status(201).json({ message: "Product created successfully", product: savedProduct });
});

// Get all products
export const getAllProducts = asyncHandler(async (_req: Request, res: Response) => {
    const products = await Product.find();
    return res.status(200).json({ message: "Products retrieved successfully", products });
});

// Get products of a specific farmer
export const getProductsByFarmer = asyncHandler(async (req: Request, res: Response) => {
    const { farmerId } = req.params;

    if (!farmerId) {
        return res.status(400).json({ message: "Farmer ID is required" });
    }

    const farmerProducts = await Product.find({ farmer: farmerId });
    return res.status(200).json({ message: "Farmer's products retrieved successfully", products: farmerProducts });
});
