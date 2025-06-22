import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocument extends Document {
    name: string;
    price: number;
    unit: string;
    // image: string;
    farmer: mongoose.Schema.Types.ObjectId; // Reference to the User
    location: string;
    inStock: boolean;
    discount?: number;
}

const ProductSchema = new Schema<ProductDocument>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        unit: { type: String, required: true },
        // image: { type: String, required: true },
        farmer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        location: { type: String, required: true },
        inStock: { type: Boolean, required: true },
        discount: { type: Number },
    },
    { timestamps: true }
);

export default mongoose.model<ProductDocument>("Product", ProductSchema);
