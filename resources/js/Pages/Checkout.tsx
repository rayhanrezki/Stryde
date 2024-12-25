import { useState } from "react";
import { CheckoutForm } from "@/Components/checkout-form";
import { OrderDetails } from "@/Components/order-details";
import { OrderSummary } from "@/Components/order-summary";
import { Product, Cart, CartItem } from "@/types/product";
import Navbar from "@/Components/Navbar";

// Helper function to format IDR
const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

interface CheckoutProps {
    cart: Cart;
    products: Product[];
}

export default function Checkout({ cart, products }: CheckoutProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const cartItem = cart?.items[0];
    const product = cartItem
        ? products.find((p) => p.id === cartItem.product_id)
        : null;

    const orderSummary = {
        items: cart?.items?.length || 0,
        itemsTotal: Number(product?.price || 0),
        delivery: 0,
        salesTax: 0,
        total: Number(product?.price || 0),
        formatPrice: formatIDR,
    };

    if (!cart || !cartItem || !product) {
        return <div>No items in cart</div>;
    }

    return (
        <div className="min-h-screen bg-[#e7e7e3] py-8">
            <Navbar cartItems={cart.items} />
            <div className="max-w-7xl mx-auto px-4 mt-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <CheckoutForm
                            isProcessing={isProcessing}
                            setIsProcessing={setIsProcessing}
                        />
                    </div>
                    <div>
                        <OrderSummary summary={orderSummary} />
                        <OrderDetails product={product} cartItem={cartItem} />
                    </div>
                </div>
            </div>
        </div>
    );
}
