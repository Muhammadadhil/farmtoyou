import mongoose, { Schema, Document } from "mongoose";

export interface IFarmerDetail {
    farmName: string;
    farmLocation: string;
    produceType: string;
}

export interface IBuyerDetail {
    deliveryLocation: string;
}

export interface IUser extends Document {
    name: string;
    phoneNumber: string;
    role: "farmer" | "buyer";
    otpVerified: boolean;
    farmerDetail?: IFarmerDetail; // Farmer-specific fields
    buyerDetail?: IBuyerDetail; // Buyer-specific fields
}

const UserSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ["farmer", "buyer"], required: true },
    otpVerified: { type: Boolean, default: false },
    farmerDetail: {
        farmName: { type: String },
        farmLocation: { type: String },
        produceType: { type: String },
    },
    buyerDetail: {
        deliveryLocation: { type: String },
    },
});

export default mongoose.model<IUser>("User", UserSchema);
