import { useState } from "react";
import { Heart, ArrowLeft } from "lucide-react";
import Navbar from "@/Components/Navbar";
import { Product } from "@/types/product";
import { Head, Link } from "@inertiajs/react";
import { SizeSelector } from "@/Components/SizeSelector";

interface Props {
    product: Product;
}

// const defaultColors = [
//     { name: "Shadow Navy", value: "#1a237e" },
//     { name: "Army Green", value: "#4b5320" },
// ];

// Available sizes array
const availableSizes = ["38", "39", "40", "41", "42", "43", "44", "45"];

export default function ProductDetails({ product }: Props) {
    const productImages = [
        product.image,
        product.image,
        product.image,
        product.image,
    ];

    const [selectedImage, setSelectedImage] = useState(0);
    // const [selectedColor, setSelectedColor] = useState(defaultColors[0].value);
    const [selectedSize, setSelectedSize] = useState<string | null>(
        product.size?.toString() ?? null
    );

    // Add handleSizeChange function
    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
    };

    return (
        <div className="min-h-screen bg-[#e7e7e3] pt-24">
            <Head title={product.title} />
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-4">
                    <Link
                        href={route("products.index")}
                        className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="font-medium">Back to Products</span>
                    </Link>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Product Images */}
                        <div className="grid grid-cols-2 gap-4 p-4">
                            {productImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`overflow-hidden cursor-pointer ${
                                        index === 0 ? "rounded-tl-xl" : ""
                                    } ${index === 1 ? "rounded-tr-xl" : ""} ${
                                        index === 2 ? "rounded-bl-xl" : ""
                                    } ${index === 3 ? "rounded-br-xl" : ""} ${
                                        selectedImage === index
                                            ? "ring-2 ring-blue-600"
                                            : ""
                                    }`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.title} view ${
                                            index + 1
                                        }`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Product Info */}
                        <div className="p-8 space-y-6">
                            <h1 className="text-2xl font-bold">
                                {product.title}
                            </h1>
                            <p className="text-2xl font-bold text-blue-600">
                                ${product.price}
                            </p>

                            {/* Stock info */}
                            <p className="text-gray-600">
                                Stock Available: {product.stock}
                            </p>

                            {/* Update SizeSelector props */}
                            <SizeSelector
                                sizes={availableSizes}
                                selectedSize={selectedSize}
                                onChange={handleSizeChange}
                            />

                            {/* Updated buttons section */}
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex gap-2">
                                    <button
                                        className="flex-1 bg-[#2A2A2A] text-white py-3 px-4 rounded-md font-medium hover:bg-[#404040] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        disabled={
                                            product.stock === 0 || !selectedSize
                                        }
                                    >
                                        {product.stock === 0
                                            ? "OUT OF STOCK"
                                            : !selectedSize
                                            ? "SELECT SIZE"
                                            : "ADD TO CART"}
                                    </button>
                                    <button
                                        className="bg-[#2A2A2A] text-white p-3 rounded-md hover:bg-[#404040] transition-colors"
                                        aria-label="Add to wishlist"
                                    >
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>
                                <button
                                    className="w-full bg-[#4263EB] text-white py-3 px-4 rounded-md font-medium hover:bg-[#3653cc] transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                                    disabled={!selectedSize}
                                >
                                    BUY IT NOW
                                </button>
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <h2 className="font-medium">
                                    ABOUT THE PRODUCT
                                </h2>
                                <p className="text-gray-600">
                                    {product.description}
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600 font-open-sans">
                                    <li>Product Ini Punya rafi</li>
                                    <li>Bayar QRIS</li>
                                    <li>
                                        Subhanallah, Walhamdulillah,
                                        Walailahailallah
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
