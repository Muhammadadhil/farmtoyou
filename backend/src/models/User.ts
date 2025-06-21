import mongoose, { Schema, Document } from "mongoose";


export interface UserDocument extends Document {
    name: string;
    phoneNumber: string;
    role: 'farmer'| 'buyer'
    otpVerified: boolean;
}

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    otpVerified: { type: Boolean, default: false },
});

export default mongoose.model<UserDocument>("User", UserSchema);
