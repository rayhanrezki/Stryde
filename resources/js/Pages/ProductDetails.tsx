import { useState } from "react";
import { Heart, ArrowLeft } from "lucide-react";
import Navbar from "@/Components/Navbar";
import { Product } from "@/types/product";
import { Head, Link } from "@inertiajs/react";
import RecommendedProducts from "@/Components/RecommendedProducts";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import Footer from "@/Components/Footer";

interface Props {
    product: Product;
    recommendedProducts: Product[];
}

export default function ProductDetails({
    product,
    recommendedProducts,
}: Props) {
    const [selectedSize, setSelectedSize] = useState<string>("");

    const getCurrentStock = () => {
        const size = product.sizes.find((s) => s.size === selectedSize);
        return size ? size.stock : 0;
    };

    const currentStock = getCurrentStock();

    return (
        <div className="min-h-screen bg-[#e7e7e3] pt-24">
            <Head title={product.name} />
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
                        {/* Product Images Carousel */}
                        <div className="p-4">
                            <Carousel className="w-full max-w-xl mx-auto">
                                <CarouselContent>
                                    {product.images.map((image, index) => (
                                        <CarouselItem key={image.id}>
                                            <div className="aspect-square relative overflow-hidden rounded-xl">
                                                <img
                                                    src={`/storage/${image.image_path}`}
                                                    alt={`${
                                                        product.name
                                                    } view ${index + 1}`}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                            </Carousel>
                        </div>

                        {/* Product Info */}
                        <div className="p-8 space-y-6">
                            <h1 className="text-2xl font-bold font-rubik">
                                {product.name}
                            </h1>
                            <p className="text-2xl font-bold font-rubik text-blue-600">
                                Rp {product.price.toLocaleString("id-ID")}
                            </p>

                            <p className="text-gray-600">
                                {selectedSize
                                    ? `Stock Available for size ${selectedSize}: ${currentStock}`
                                    : "Select a size to see available stock"}
                            </p>

                            {/* Size Selector */}
                            <div className="grid grid-cols-2 gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size.id}
                                        className={`p-3 border rounded-lg ${
                                            selectedSize === size.size
                                                ? "border-blue-600 bg-blue-50"
                                                : "hover:border-gray-400"
                                        }`}
                                        onClick={() =>
                                            setSelectedSize(size.size)
                                        }
                                    >
                                        <span className="font-medium">
                                            {size.size}
                                        </span>
                                        <p className="text-sm text-gray-500">
                                            Stock: {size.stock}
                                        </p>
                                    </button>
                                ))}
                            </div>

                            {/* Action Buttons */}
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

            <RecommendedProducts recommendedProducts={recommendedProducts} />
            <Footer />
        </div>
    );
}
