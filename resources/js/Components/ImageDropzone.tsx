import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";

interface ImageDropzoneProps {
    onImagesChange: (files: File[]) => void;
    existingPreviews?: string[];
    error?: string;
}

export default function ImageDropzone({
    onImagesChange,
    existingPreviews = [],
    error,
}: ImageDropzoneProps) {
    const [previews, setPreviews] = useState<string[]>(existingPreviews);
    const [files, setFiles] = useState<File[]>([]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".gif"],
        },
        maxSize: 2 * 1024 * 1024, // 2MB
        onDrop: (acceptedFiles, rejectedFiles) => {
            if (rejectedFiles.length > 0) {
                alert(
                    "Some files were rejected. Please ensure all files are images under 2MB."
                );
            }

            const newFiles = [...files, ...acceptedFiles];
            setFiles(newFiles);
            onImagesChange(newFiles);

            const newPreviews = acceptedFiles.map((file) =>
                URL.createObjectURL(file)
            );
            setPreviews([...previews, ...newPreviews]);
        },
    });

    useEffect(() => {
        return () => {
            previews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, []);

    const removeImage = (index: number) => {
        URL.revokeObjectURL(previews[index]);
        const newPreviews = previews.filter((_, i) => i !== index);
        setPreviews(newPreviews);

        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onImagesChange(newFiles);
    };

    return (
        <div>
            <label className="block text-sm font-medium mb-2">Images</label>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
                    ${
                        isDragActive
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                    }`}
            >
                <input {...getInputProps()} />
                <div className="text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                        {isDragActive
                            ? "Drop the files here..."
                            : "Drag 'n' drop images here, or click to select files"}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, GIF up to 2MB
                    </p>
                </div>
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                    {previews.map((preview, index) => (
                        <div key={preview} className="relative group">
                            <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="h-32 w-32 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeImage(index);
                                }}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
