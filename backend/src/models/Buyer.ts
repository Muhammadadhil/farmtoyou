import mongoose, { Schema, Document } from "mongoose";

export interface BuyerDocument extends Document {
    name: string;
    deliveryLocation: string;
    phoneNumber: string;
}

const BuyerSchema = new Schema<BuyerDocument>({
    name: { type: String, required: true },
    deliveryLocation: { type: String, required: true },
    phoneNumber: { type: String, required: true },
});

export default mongoose.model<BuyerDocument>("Buyer", BuyerSchema);
