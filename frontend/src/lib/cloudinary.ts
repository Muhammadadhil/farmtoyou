// import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
// cloudinary.config({
//     cloud_name: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     api_key: import.meta.env.CLOUDINARY_API_KEY,
//     api_secret: import.meta.env.CLOUDINARY_API_SECRET,
// });

export interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
}

export const uploadToCloudinary = async (file: File): Promise<CloudinaryUploadResult> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "farm_products");
    formData.append("folder", "farm-products");

    const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to upload image");
    }

    return response.json();
};

// export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
//     try {
//         await cloudinary.uploader.destroy(publicId);
//     } catch (error) {
//         console.error("Error deleting image from Cloudinary:", error);
//         throw error;
//     }
// };

// export default cloudinary;
