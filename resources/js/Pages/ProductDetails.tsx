import { useState, useMemo } from "react";
import { Heart, ArrowLeft } from "lucide-react";
import Navbar from "@/Components/Navbar";
import { Product } from "@/types/product";
import { Head, Link } from "@inertiajs/react";
import { SizeSelector } from "@/Components/SizeSelector";

interface Props {
    product: Product;
}

export default function ProductDetails({ product }: Props) {
    console.log("Product data:", product);
    console.log("Size stock data:", product.sizeStock);

    const productImages = [
        product.Image,
        product.Image,
        product.Image,
        product.Image,
    ];

    const sizeStockMap = useMemo(() => {
        return product.sizeStock?.size_stock || {};
    }, [product.sizeStock]);

    const availableSizes = useMemo(() => {
        console.log("Available sizes:", Object.keys(sizeStockMap));
        return Object.keys(sizeStockMap).filter(
            (size) => sizeStockMap[size] > 0
        );
    }, [sizeStockMap]);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // Get current stock for selected size
    const currentStock = selectedSize ? sizeStockMap[selectedSize] || 0 : 0;

    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
    };

    return (
        <div className="min-h-screen bg-[#e7e7e3] pt-24">
            <Head title={product.Title} />
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-4">
                    <Link
                        href={route("products.list")}
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
                            <h1 className="text-2xl font-bold font-rubik">
                                {product.title}
                            </h1>
                            <p className="text-2xl font-bold font-rubik text-blue-600">
                                Rp {product.Price.toLocaleString("id-ID")}
                            </p>

                            {/* Stock info for selected size */}
                            <p className="text-gray-600">
                                {selectedSize
                                    ? `Stock Available for size ${selectedSize}: ${currentStock}`
                                    : "Select a size to see available stock"}
                            </p>

                            {/* Update SizeSelector props */}
                            <SizeSelector
                                sizes={availableSizes}
                                selectedSize={selectedSize}
                                onChange={handleSizeChange}
                                stockMap={sizeStockMap}
                            />

                            {/* Updated buttons section */}
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex gap-2">
                                    <button
                                        className="flex-1 bg-[#2A2A2A] text-white py-3 px-4 rounded-md font-medium hover:bg-[#404040] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        disabled={
                                            currentStock === 0 || !selectedSize
                                        }
                                    >
                                        {!selectedSize
                                            ? "SELECT SIZE"
                                            : currentStock === 0
                                            ? "OUT OF STOCK"
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
                                    {product.Description}
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
