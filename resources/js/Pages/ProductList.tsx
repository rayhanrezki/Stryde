import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { Product, Category } from "@/types/product";
import { useState, useMemo } from "react";

interface Props {
    products: Product[];
    totalItems: number;
}

export default function ProductList({ products }: Props) {
    const [filters, setFilters] = useState({
        size: "",
        categories: [] as number[],
    });

    // Get unique sizes and categories
    const availableSizes = useMemo(() => {
        return Array.from(
            new Set(
                products.flatMap((product) =>
                    product.sizes.map((size) => size.size)
                )
            )
        ).sort();
    }, [products]);

    const availableCategories = useMemo(() => {
        return Array.from(
            new Set(products.flatMap((product) => product.categories))
        ).reduce((unique, category) => {
            if (!unique.some((item) => item.id === category.id)) {
                unique.push(category);
            }
            return unique;
        }, [] as Category[]);
    }, [products]);

    // Filtering logic
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const sizeMatch =
                !filters.size ||
                product.sizes.some((s) => s.size === filters.size);
            const categoryMatch =
                filters.categories.length === 0 ||
                product.categories.some((c) =>
                    filters.categories.includes(c.id)
                );
            return sizeMatch && categoryMatch;
        });
    }, [products, filters]);

    // Filter handlers
    const handleFilter = (
        type: "size" | "categories",
        value: string | number
    ) => {
        if (type === "size") {
            setFilters((prev) => ({
                ...prev,
                size: prev.size === value ? "" : (value as string),
            }));
        } else {
            setFilters((prev) => ({
                ...prev,
                categories: prev.categories.includes(value as number)
                    ? prev.categories.filter((id) => id !== value)
                    : [...prev.categories, value as number],
            }));
        }
    };

    const clearFilters = (type?: "size" | "categories") => {
        if (!type) {
            setFilters({ size: "", categories: [] });
        } else {
            setFilters((prev) => ({
                ...prev,
                [type]: type === "size" ? "" : [],
            }));
        }
    };

    return (
        <div className="min-h-screen bg-[#e7e7e3] pt-24">
            <Head title="Products" />
            <Navbar />

            {/* Hero Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden bg-black text-white rounded-lg mb-8">
                    <div className="container mx-auto px-6 py-16 relative z-10">
                        <p className="text-sm mb-2">Sneaker Of The Year</p>
                        <h1 className="text-5xl font-bold mb-4">Get 30% off</h1>
                        <p className="max-w-md">
                            Sneakers made with your comfort in mind so you can
                            put all of your focus into your next session
                        </p>
                    </div>
                    <img
                        src="/images/NIKE_AIR_MAX.png"
                        alt=""
                        className="absolute right-0 top-0 h-full w-1/2 object-cover object-center"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">Life Style Shoes</h2>
                        <p className="text-gray-600">
                            {filteredProducts.length} items
                            {(filters.size ||
                                filters.categories.length > 0) && (
                                <span className="ml-2">
                                    {filters.size && `(Size: ${filters.size})`}
                                    {filters.categories.length > 0 &&
                                        ` (${filters.categories.length} categories selected)`}
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="relative">
                        <select
                            className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8"
                            defaultValue="trending"
                        >
                            <option value="trending">TRENDING</option>
                            <option value="newest">NEWEST</option>
                            <option value="price-asc">
                                PRICE: LOW TO HIGH
                            </option>
                            <option value="price-desc">
                                PRICE: HIGH TO LOW
                            </option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold">SIZE</h3>
                                {filters.size && (
                                    <button
                                        onClick={() => clearFilters("size")}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Clear filter
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() =>
                                            handleFilter("size", size)
                                        }
                                        className={`p-2 text-sm border rounded-md ${
                                            filters.size === size
                                                ? "bg-black text-white"
                                                : "hover:bg-gray-50"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold">CATEGORIES</h3>
                                {filters.categories.length > 0 && (
                                    <button
                                        onClick={() =>
                                            clearFilters("categories")
                                        }
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>
                            <div className="space-y-2">
                                {availableCategories.map((category) => (
                                    <label
                                        key={category.id}
                                        className="flex items-center cursor-pointer group"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.categories.includes(
                                                category.id
                                            )}
                                            onChange={() =>
                                                handleFilter(
                                                    "categories",
                                                    category.id
                                                )
                                            }
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                                            {category.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg shadow-sm border"
                                >
                                    <img
                                        src={
                                            product.images[0]?.image_path
                                                ? `/storage/${product.images[0].image_path}`
                                                : "/placeholder.jpg"
                                        }
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-medium text-base sm:text-lg lg:text-xl line-clamp-2 font-rubik mb-4">
                                            {product.name}
                                        </h3>
                                        <div className="mt-2">
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {product.categories.map(
                                                    (category) => (
                                                        <span
                                                            key={category.id}
                                                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                                                        >
                                                            {category.name}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Link
                                                href={route(
                                                    "products.show",
                                                    product.slug
                                                )}
                                                className="block"
                                            >
                                                <button className="w-full bg-zinc-900 text-white hover:bg-zinc-900/90 text-lg sm:text-base lg:text-lg font-rubik py-6 rounded-md">
                                                    VIEW PRODUCT - Rp{" "}
                                                    {product.price}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
