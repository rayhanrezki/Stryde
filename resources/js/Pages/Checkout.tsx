import { useState } from "react";
import CheckoutForm from "@/Components/checkout-form";
import OrderDetails from "@/Components/order-details";
import OrderSummary from "@/Components/order-summary";
import { PageProps } from "@/types";
import { Product } from "@/types/product";
import Navbar from "@/Components/Navbar";

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
    recommendedProducts: Product[];
    cartItems: CartItem[]; // Menggunakan tipe CartItem[]
}

export default function Checkout({ cartItems, auth }: Props) {
    const [isProcessing, setIsProcessing] = useState(false);

    return (
        <>
            <Navbar user={auth?.user} cartItems={cartItems} />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left column - Form */}
                        <div className="space-y-8">
                            <OrderDetails />
                            <CheckoutForm
                                isProcessing={isProcessing}
                                setIsProcessing={setIsProcessing}
                            />
                        </div>

                        {/* Right column - Summary */}
                        <div>
                            <OrderSummary />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
