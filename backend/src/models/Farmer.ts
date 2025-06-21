import mongoose, { Schema, Document } from "mongoose";

export interface FarmerDocument extends Document {
    name: string;
    farmName: string;
    farmLocation: string;
    phoneNumber: string;
    produceType: string;
}

const FarmerSchema = new Schema<FarmerDocument>({
    name: { type: String, required: true },
    farmName: { type: String, required: true },
    farmLocation: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    produceType: { type: String, required: true },
});

export default mongoose.model<FarmerDocument>("Farmer", FarmerSchema);
