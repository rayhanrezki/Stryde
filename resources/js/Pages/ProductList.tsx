import Navbar from "@/Components/Navbar";
import { Product } from "@/types/product";
import { Link } from "@inertiajs/react";
import { useState, useMemo } from "react";

interface Props {
    products: Product[];
    totalItems: number;
    availableSizes: number[];
}

export default function ProductList({
    products,
    totalItems,
    availableSizes,
}: Props) {
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    // Filter products based on selected size
    const filteredProducts = useMemo(() => {
        if (!selectedSize) return products;
        return products.filter((product) => product.size === selectedSize);
    }, [products, selectedSize]);

    // Handle size selection
    const handleSizeClick = (size: number) => {
        setSelectedSize(selectedSize === size ? null : size);
    };

    return (
        <div className="min-h-screen bg-[#e7e7e3] pt-24">
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
                            <h3 className="font-semibold mb-4">REFINE BY</h3>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">
                                    Mens
                                </button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">
                                    Casual
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-4">SIZE</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => handleSizeClick(size)}
                                        className={`p-2 text-sm border rounded-md ${
                                            selectedSize === size
                                                ? "bg-black text-white"
                                                : "hover:bg-gray-50"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-4">COLOR</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {[
                                    "blue",
                                    "orange",
                                    "black",
                                    "green",
                                    "gray",
                                    "coral",
                                    "silver",
                                    "navy",
                                    "brown",
                                    "tan",
                                ].map((color) => (
                                    <button
                                        key={color}
                                        className={`w-8 h-8 rounded-md border ${
                                            color === "blue"
                                                ? "ring-2 ring-blue-500"
                                                : ""
                                        }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">TYPE</h3>
                            <div className="space-y-2">
                                {[
                                    "Casual shoes",
                                    "Runners",
                                    "Hiking",
                                    "Sneaker",
                                    "Basketball",
                                    "Golf",
                                ].map((type) => (
                                    <label
                                        key={type}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                        />
                                        <span className="text-sm">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="space-y-4">
                                    {/* Card with image */}
                                    <div className="bg-white rounded-[20px] p-2 relative">
                                        <div className="aspect-square relative bg-neutral-50 rounded-[16px] overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="absolute inset-0 w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>

                                    {/* Product Info Below Card */}
                                    <div className="space-y-3">
                                        <h3 className="font-medium text-base line-clamp-2">
                                            {product.title}
                                        </h3>
                                        <Link
                                            href={route(
                                                "products.show",
                                                product.Slug
                                            )}
                                            className="block"
                                        >
                                            <button className="w-full bg-zinc-900 text-white py-2.5 px-4 rounded-md hover:bg-zinc-900/90 text-sm font-medium transition-colors">
                                                VIEW PRODUCT - Rp{" "}
                                                {product.Price}
                                            </button>
                                        </Link>
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
