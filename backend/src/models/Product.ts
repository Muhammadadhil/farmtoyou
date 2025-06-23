import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocument extends Document {
    name: string;
    price: number;
    unit: string;
    location: string;
    inStock: boolean;
    discount?: number;
}

const ProductSchema = new Schema<ProductDocument>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        unit: { type: String, required: true },
        inStock: { type: Boolean, required: true, default: true },
        discount: { type: Number },
    },
    { timestamps: true }
);

export default mongoose.model<ProductDocument>("Product", ProductSchema);
