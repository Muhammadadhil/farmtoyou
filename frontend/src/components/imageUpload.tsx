"use client";

import type React from "react";
import { useCallback, useState } from "react";
import { Upload, X, Check, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageUpload, type UploadedImage } from "../hooks/useImageUpload";

interface ImageUploadProps {
    onImagesChange: (urls: string[]) => void;
    maxImages?: number;
    maxSizeInMB?: number;
}

export function ImageUpload({ onImagesChange, maxImages = 5, maxSizeInMB = 5 }: ImageUploadProps) {

    const { images, isUploading, addImages, removeImage, uploadAllImages, getUploadedUrls, clearImages } = useImageUpload();
    const [dragActive, setDragActive] = useState(false);

    const validateFile = (file: File): string | null => {
        if (file.size > maxSizeInMB * 1024 * 1024) {
            return `File size must be less than ${maxSizeInMB}MB`;
        }
        if (!file.type.startsWith("image/")) {
            return "File must be an image";
        }
        return null;
    };

    const handleFiles = useCallback(
        (files: FileList | null) => {
            if (!files) return;

            const fileArray = Array.from(files);
            const validFiles: File[] = [];
            const errors: string[] = [];

            fileArray.forEach((file) => {
                const error = validateFile(file);
                if (error) {
                    errors.push(`${file.name}: ${error}`);
                } else if (images.length + validFiles.length < maxImages) {
                    validFiles.push(file);
                } else {
                    errors.push(`Maximum ${maxImages} images allowed`);
                }
            });

            if (errors.length > 0) {
                alert(errors.join("\n"));
            }

            if (validFiles.length > 0) {
                addImages(validFiles);
            }
        },
        [images.length, maxImages, addImages]
    );

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
        },
        [handleFiles]
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            handleFiles(e.target.files);
        },
        [handleFiles]
    );

    const handleUploadAll = async () => {
        try {
            await uploadAllImages();
            const urls = getUploadedUrls();
            console.log('immage urls::::::::::::::',urls);
            onImagesChange(urls);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const handleRemoveImage = (id: string) => {
        removeImage(id);
        const urls = getUploadedUrls();
        onImagesChange(urls);
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${dragActive ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-green-400"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input type="file" multiple accept="image/*" onChange={handleInputChange} className="hidden" id="image-upload" disabled={images.length >= maxImages} />

                <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">
                        PNG, JPG up to {maxSizeInMB}MB each (max {maxImages} images)
                    </p>
                </label>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((image) => (
                            <ImagePreview key={image.id} image={image} onRemove={() => handleRemoveImage(image.id)} />
                        ))}
                    </div>

                    {/* Upload Button */}
                    <div className="flex gap-3">
                        <Button onClick={handleUploadAll} disabled={isUploading || images.every((img) => img.cloudinaryResult)} className="flex-1 bg-green-600 hover:bg-green-700">
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload All Images
                                </>
                            )}
                        </Button>

                        <Button variant="outline" onClick={clearImages} disabled={isUploading}>
                            Clear All
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

interface ImagePreviewProps {
    image: UploadedImage;
    onRemove: () => void;
}

function ImagePreview({ image, onRemove }: ImagePreviewProps) {
    return (
        <div className="relative group">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img src={image.preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="ghost" size="sm" onClick={onRemove} className="text-white hover:text-red-400">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Status Indicators */}
                <div className="absolute top-2 right-2">
                    {image.isUploading && (
                        <div className="bg-blue-500 text-white p-1 rounded-full">
                            <Loader2 className="w-3 h-3 animate-spin" />
                        </div>
                    )}
                    {image.cloudinaryResult && (
                        <div className="bg-green-500 text-white p-1 rounded-full">
                            <Check className="w-3 h-3" />
                        </div>
                    )}
                    {image.error && (
                        <div className="bg-red-500 text-white p-1 rounded-full">
                            <AlertCircle className="w-3 h-3" />
                        </div>
                    )}
                </div>

                {/* Progress Bar */}
                {image.isUploading && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-200 h-1">
                        <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${image.progress}%` }} />
                    </div>
                )}
            </div>

            {/* File Info */}
            <div className="mt-2 text-xs text-gray-500 truncate">{image.file.name}</div>

            {image.error && <div className="mt-1 text-xs text-red-500">{image.error}</div>}
        </div>
    );
}
