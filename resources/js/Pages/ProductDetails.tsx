import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/Components/Navbar";
import { Product } from "@/types/product";
import { Head, Link, useForm } from "@inertiajs/react";
import RecommendedProducts from "@/Components/RecommendedProducts";
import { PageProps } from "@/types";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import Footer from "@/Components/Footer";

interface Props extends PageProps {
    product: Product;
    recommendedProducts: Product[];
}

export default function ProductDetails({
    auth,
    product,
    recommendedProducts,
}: Props) {
    const [selectedSize, setSelectedSize] = useState<number | null>(null); // Ukuran yang dipilih
    const [quantity, setQuantity] = useState<number>(1); // Jumlah produk yang dipilih

    const { data, setData, post, processing, errors } = useForm({
        product_id: product.id,
        product_size_id: null as number | null, // ID ukuran awal (null hingga ukuran dipilih)
        quantity: 1,
    });

    // Fungsi untuk mendapatkan stok berdasarkan ukuran
    const getCurrentStock = () => {
        const size = product.sizes.find((s) => s.id === selectedSize); // Cari berdasarkan ID ukuran
        return size ? size.stock : 0;
    };

    const currentStock = getCurrentStock();

    // Fungsi untuk menangani pemilihan ukuran
    const handleSizeSelection = (sizeId: number) => {
        setSelectedSize(sizeId); // Simpan ukuran yang dipilih
        setData("product_size_id", sizeId); // Perbarui product_size_id di form
    };

    // Fungsi untuk menambahkan produk ke keranjang
    const handleAddToCart = () => {
        if (currentStock > 0 && quantity > 0 && selectedSize) {
            setData("quantity", quantity); // Perbarui jumlah produk di form

            console.log("Data sent to backend:", data); // Debugging

            post(route("cart.add"), {
                onSuccess: () => {
                    alert("Item added to cart successfully!");
                },
                onError: (errors: any) => {
                    console.error(errors); // Debugging untuk error backend
                    alert("Failed to add item to cart.");
                },
            });
        } else {
            alert("Please select a valid size and quantity.");
        }
    };

    return (
        <div className="min-h-screen bg-[#e7e7e3] pt-24">
            <Head title={product.name} />
            <Navbar user={auth?.user} />
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
                        {/* Carousel untuk gambar produk */}
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

                        {/* Info produk */}
                        <div className="p-8 space-y-6">
                            <h1 className="text-2xl font-bold font-rubik">
                                {product.name}
                            </h1>
                            <p className="text-2xl font-bold font-rubik text-blue-600">
                                Rp {product.price.toLocaleString("id-ID")}
                            </p>

                            <p className="text-gray-600">
                                {selectedSize
                                    ? `Stock Available for selected size: ${currentStock}`
                                    : "Select a size to see available stock"}
                            </p>

                            {/* Pilih ukuran produk */}
                            <div className="grid grid-cols-2 gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size.id}
                                        className={`p-3 border rounded-lg ${
                                            selectedSize === size.id
                                                ? "border-blue-600 bg-blue-50"
                                                : "hover:border-gray-400"
                                        }`}
                                        onClick={() =>
                                            handleSizeSelection(size.id)
                                        } // Memperbarui ukuran yang dipilih
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

                            {/* Tombol aksi */}
                            <div className="flex flex-col gap-2 w-full">
                                <button
                                    className="flex-1 bg-[#2A2A2A] text-white py-3 px-4 rounded-md font-medium hover:bg-[#404040] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    disabled={
                                        currentStock === 0 || !selectedSize
                                    }
                                    onClick={handleAddToCart}
                                >
                                    {!selectedSize
                                        ? "SELECT SIZE"
                                        : currentStock === 0
                                        ? "OUT OF STOCK"
                                        : "ADD TO CART"}
                                </button>
                                <button
                                    className="w-full bg-[#4263EB] text-white py-3 px-4 rounded-md font-medium hover:bg-[#3653cc] transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                                    disabled={!selectedSize}
                                >
                                    BUY IT NOW
                                </button>
                            </div>

                            {/* Deskripsi produk */}
                            <div className="space-y-4 pt-6 border-t">
                                <h2 className="font-medium">
                                    ABOUT THE PRODUCT
                                </h2>
                                <p className="text-gray-600">
                                    {product.description}
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600 font-open-sans">
                                    <li>Product owned by {auth.user.name}</li>
                                    <li>Pay using QRIS</li>
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
