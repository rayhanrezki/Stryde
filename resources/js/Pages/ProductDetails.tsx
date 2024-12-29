import { useState } from "react";
import { ArrowLeft, CheckCircle2, AlertCircle, X } from "lucide-react";
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
import { Alert, AlertTitle, AlertDescription } from "@/Components/ui/alert";

interface CartItem {
    sizes(arg0: string, sizes: any): unknown;
    id: number;
    product_id: number;
    product_size_id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        description: string;
        price: string;
        sizes: { id: number; size: string; stock: number }[];
        categories: { id: number; name: string }[];
        images: { id: number; image_path: string }[];
    };
    product_size: {
        id: number;
        size: string;
        stock: number;
    };
}

interface Props extends PageProps {
    product: Product;
    recommendedProducts: Product[];
    cartItems: CartItem[];
}

export default function ProductDetails({
    auth,
    product,
    recommendedProducts,
    cartItems,
}: Props) {
    const [selectedSize, setSelectedSize] = useState<number | null>(null); // Ukuran yang dipilih
    const [quantity, setQuantity] = useState<number>(1);
    const [cartItemsState, setCartItems] = useState<CartItem[]>(cartItems);
    const [alertState, setAlertState] = useState<{
        show: boolean;
        type: "success" | "destructive";
        message: string;
    } | null>(null);

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
        if (!auth.user) {
            setAlertState({
                show: true,
                type: "destructive",
                message: "You must be logged in to add items to cart",
            });
            setTimeout(() => setAlertState(null), 3000);
            return;
        }

        if (currentStock > 0 && quantity > 0 && selectedSize) {
            setData("quantity", quantity);

            post(route("cart.add"), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (response) => {
                    // Dispatch the cart-updated event with the new cart items
                    window.dispatchEvent(
                        new CustomEvent("cart-updated", {
                            detail: {
                                cartItems: response.props.cartItems,
                            },
                        })
                    );

                    setAlertState({
                        show: true,
                        type: "success",
                        message: "Item added to cart successfully!",
                    });

                    setTimeout(() => {
                        setAlertState(null);
                    }, 3000);
                },
                onError: (errors: any) => {
                    console.error(errors);
                    setAlertState({
                        show: true,
                        type: "destructive",
                        message: "Failed to add item to cart.",
                    });
                },
            });
        } else {
            setAlertState({
                show: true,
                type: "destructive",
                message: "Please select a valid size and quantity.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#e7e7e3] pt-24">
            <Head title={product.name} />
            <Navbar user={auth?.user} cartItems={cartItems} />
            {alertState?.show && (
                <div className="fixed inset-x-0 top-24 mx-auto z-50 max-w-md animate-in fade-in slide-in-from-top-2">
                    <Alert
                        variant={alertState.type}
                        className={`pr-12 shadow-lg ${
                            alertState.type === "success"
                                ? "bg-green-500 text-white border-green-600"
                                : "bg-red-500 text-white border-red-600"
                        }`}
                    >
                        <button
                            onClick={() => setAlertState(null)}
                            className="absolute right-2 top-2 rounded-lg p-1 hover:bg-white/20"
                        >
                            <X className="h-4 w-4 text-white" />
                        </button>
                        {alertState.type === "success" ? (
                            <CheckCircle2 className="h-4 w-4 text-white" />
                        ) : (
                            <AlertCircle className="h-4 w-4 text-white" />
                        )}
                        <AlertTitle className="text-white">
                            {alertState.type === "success"
                                ? "Success"
                                : "Error"}
                        </AlertTitle>
                        <AlertDescription className="text-white/90">
                            {alertState.message}
                        </AlertDescription>
                    </Alert>
                </div>
            )}
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
                                                    src={
                                                        image.image_path.startsWith(
                                                            "images/"
                                                        )
                                                            ? `/${image.image_path}`
                                                            : `/storage/${image.image_path}`
                                                    }
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
