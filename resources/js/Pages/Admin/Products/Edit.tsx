import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { Product, Category, Size, ProductFormData } from "@/types/product";
import { Trash2 } from "lucide-react";
import ImageDropzone from "@/Components/ImageDropzone";

interface Props extends PageProps {
    categories: Category[];
    product: Product;
}

export default function Edit({ product, categories }: Props) {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [formData, setFormData] = useState<ProductFormData>({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        images: [] as File[],
        sizes: product.sizes,
        categories: product.categories.map((c: { id: any }) => c.id),
        existingImages: product.images,
    });

    const [newCategory, setNewCategory] = useState("");
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [categoryError, setCategoryError] = useState("");
    const [availableCategories, setAvailableCategories] = useState(categories);
    const [sizeStocks, setSizeStocks] = useState<Size[]>(product.sizes);

    const removeExistingImage = (imageId: number) => {
        setFormData((prev) => ({
            ...prev,
            existingImages: prev.existingImages.filter(
                (img) => img.id !== imageId
            ),
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        console.log("Submitting form data:", {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            existingImages: formData.existingImages,
            newImages: formData.images,
            sizes: sizeStocks,
            categories: formData.categories,
        });

        const submitData = new FormData();
        submitData.append("_method", "PUT");
        submitData.append("name", formData.name);
        submitData.append("description", formData.description);
        submitData.append("price", formData.price);

        submitData.append(
            "existingImages",
            JSON.stringify(formData.existingImages)
        );
        submitData.append("sizes", JSON.stringify(sizeStocks));
        submitData.append("categories", JSON.stringify(formData.categories));

        if (formData.images.length > 0) {
            Array.from(formData.images).forEach((image, index) => {
                submitData.append(`images[${index}]`, image);
            });
        }

        router.post(route("products.update", product.slug), submitData, {
            onSuccess: (page) => {
                console.log("Success response:", page);
                setProcessing(false);
                router.visit(route("products.index"));
            },
            onError: (errors) => {
                console.error("Submission errors:", errors);
                setErrors(errors);
                setProcessing(false);
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    const updateFormData = (key: keyof ProductFormData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const addSizeStock = () => {
        setSizeStocks([...sizeStocks, { size: "", stock: 0 }]);
    };

    const removeSizeStock = (index: number) => {
        const newSizeStocks = sizeStocks.filter((_, i) => i !== index);
        setSizeStocks(newSizeStocks);
    };

    const updateSizeStock = (
        index: number,
        field: keyof Size,
        value: string | number
    ) => {
        const newSizeStocks = [...sizeStocks];
        newSizeStocks[index] = { ...newSizeStocks[index], [field]: value };
        setSizeStocks(newSizeStocks);
        updateFormData("sizes", newSizeStocks);
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            setCategoryError("Category name is required");
            return;
        }

        setIsAddingCategory(true);
        setCategoryError("");

        try {
            const response = await axios.post(
                route("products.categories.store"),
                {
                    name: newCategory,
                }
            );

            const addedCategory = response.data;
            setAvailableCategories([...availableCategories, addedCategory]);
            setNewCategory("");
            updateFormData("categories", [
                ...formData.categories,
                addedCategory.id,
            ]);
        } catch (error: any) {
            setCategoryError(
                error.response?.data?.message || "Failed to add category"
            );
        } finally {
            setIsAddingCategory(false);
        }
    };

    return (
        <AdminLayout>
            <Head title="Edit Product" />
            <div className="max-w-2xl mx-auto py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Edit Product</h1>
                    <Link
                        href={route("products.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Products
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Current Images
                        </label>
                        <div className="grid grid-cols-4 gap-4 mb-4">
                            {formData.existingImages.map((image) => (
                                <div key={image.id} className="relative group">
                                    <img
                                        src={`/storage/${image.image_path}`}
                                        alt="Product"
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeExistingImage(image.id)
                                        }
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium mb-2">
                                Add New Images
                            </label>
                            <ImageDropzone
                                onImagesChange={(files) =>
                                    updateFormData("images", files)
                                }
                                error={errors.images}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                updateFormData("name", e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                updateFormData("description", e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) =>
                                updateFormData("price", e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="block text-sm font-medium">
                                Sizes and Stock
                            </label>
                            <button
                                type="button"
                                onClick={addSizeStock}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                            >
                                Add Size
                            </button>
                        </div>

                        <div className="space-y-4">
                            {sizeStocks.map((sizeStock, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 border rounded-lg"
                                >
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-2">
                                            Size
                                        </label>
                                        <input
                                            type="text"
                                            value={sizeStock.size}
                                            onChange={(e) =>
                                                updateSizeStock(
                                                    index,
                                                    "size",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-3 py-2"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-2">
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            value={sizeStock.stock}
                                            onChange={(e) =>
                                                updateSizeStock(
                                                    index,
                                                    "stock",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="w-full border rounded-lg px-3 py-2"
                                        />
                                    </div>

                                    {sizeStocks.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeSizeStock(index)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Categories
                        </label>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="New category name"
                                className="flex-1 border rounded-lg px-3 py-2"
                            />
                            <button
                                type="button"
                                onClick={handleAddCategory}
                                disabled={isAddingCategory}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                            >
                                {isAddingCategory
                                    ? "Adding..."
                                    : "Add Category"}
                            </button>
                        </div>
                        {categoryError && (
                            <p className="text-red-500 text-sm mb-4">
                                {categoryError}
                            </p>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {availableCategories.map((category) => (
                                <label
                                    key={category.id}
                                    className={`flex items-center p-3 rounded-lg border ${
                                        formData.categories.includes(
                                            category.id
                                        )
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.categories.includes(
                                            category.id
                                        )}
                                        onChange={(e) => {
                                            const categoryId = category.id;
                                            updateFormData(
                                                "categories",
                                                e.target.checked
                                                    ? [
                                                          ...formData.categories,
                                                          categoryId,
                                                      ]
                                                    : formData.categories.filter(
                                                          (id) =>
                                                              id !== categoryId
                                                      )
                                            );
                                        }}
                                        className="mr-2"
                                    />
                                    <span>{category.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
