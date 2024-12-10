import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { FormEvent, useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Trash2 } from "lucide-react";

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface SizeStock {
    size: string;
    stock: number;
}

interface Product {
    id: number;
    Title: string;
    Description: string;
    Price: number;
    category_id: number;
    image: string;
    size_stock: {
        size_stock: SizeStock[];
    };
}

interface Props {
    categories: Category[];
    product: Product;
}

export default function Edit({ categories, product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        Title: product.Title,
        Description: product.Description,
        Price: product.Price.toString(),
        category_id: product.category_id.toString(),
        image: product.image,
        size_stock: product.size_stock.size_stock || [{ size: "", stock: 0 }],
    });

    const [sizeStocks, setSizeStocks] = useState<SizeStock[]>(
        product.size_stock.size_stock || [{ size: "", stock: 0 }]
    );

    const addSizeStock = () => {
        setSizeStocks([...sizeStocks, { size: "", stock: 0 }]);
    };

    const removeSizeStock = (index: number) => {
        const newSizeStocks = sizeStocks.filter((_, i) => i !== index);
        setSizeStocks(newSizeStocks);
        setData("size_stock", newSizeStocks);
    };

    const updateSizeStock = (
        index: number,
        field: keyof SizeStock,
        value: string | number
    ) => {
        const newSizeStocks = [...sizeStocks];
        newSizeStocks[index] = { ...newSizeStocks[index], [field]: value };
        setSizeStocks(newSizeStocks);
        setData("size_stock", newSizeStocks);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route("products.update", product.id));
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
                            Category
                        </label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.category_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={data.Title}
                            onChange={(e) => setData("Title", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.Title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.Title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            value={data.Description}
                            onChange={(e) =>
                                setData("Description", e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                            rows={4}
                        />
                        {errors.Description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.Description}
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
                            value={data.Price}
                            onChange={(e) => setData("Price", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.Price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.Price}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            value={data.image}
                            onChange={(e) => setData("image", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="block text-sm font-medium">
                                Sizes and Stock
                            </label>
                            <Button
                                type="button"
                                onClick={addSizeStock}
                                variant="outline"
                            >
                                Add Size
                            </Button>
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
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                removeSizeStock(index)
                                            }
                                            variant="ghost"
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-zinc-900 text-white hover:bg-blue-500"
                        >
                            Update Product
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
