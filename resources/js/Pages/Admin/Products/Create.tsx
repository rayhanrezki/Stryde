import { Head, useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { Category, Size, ProductFormData } from "@/types/product";
import ImageDropzone from "@/Components/ImageDropzone";

interface Props extends PageProps {
    categories: Category[];
}

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors } =
        useForm<ProductFormData>({
            name: "",
            description: "",
            price: "",
            images: [] as File[],
            sizes: [] as Size[],
            categories: [] as number[],
            existingImages: [],
        });

    const [newCategory, setNewCategory] = useState("");
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [categoryError, setCategoryError] = useState("");
    const [availableCategories, setAvailableCategories] = useState(categories);
    const [sizeStocks, setSizeStocks] = useState<Size[]>([
        { size: "", stock: 0 },
    ]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);

        if (data.images.length > 0) {
            Array.from(data.images).forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            });
        }

        formData.append("sizes", JSON.stringify(sizeStocks));

        data.categories.forEach((categoryId, index) => {
            formData.append(`categories[${index}]`, categoryId.toString());
        });

        post(route("products.store"));
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
        setData("sizes", newSizeStocks);
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
            setData("categories", [...data.categories, addedCategory.id]);
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
            <Head title="Create Product" />
            <div className="max-w-2xl mx-auto py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Create New Product</h1>
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
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
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
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
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
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    <ImageDropzone
                        onImagesChange={(files) => setData("images", files)}
                        error={errors.images}
                    />

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
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
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
                                        data.categories.includes(category.id)
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.categories.includes(
                                            category.id
                                        )}
                                        onChange={(e) => {
                                            const categoryId = category.id;
                                            setData(
                                                "categories",
                                                e.target.checked
                                                    ? [
                                                          ...data.categories,
                                                          categoryId,
                                                      ]
                                                    : data.categories.filter(
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
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
