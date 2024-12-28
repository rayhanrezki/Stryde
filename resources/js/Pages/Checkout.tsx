import { useState, useEffect } from "react";
import { CheckoutForm } from "@/Components/checkout-form";
import { OrderDetails } from "@/Components/order-details";
import { OrderSummary } from "@/Components/order-summary";
import { Product, Cart, CartItem } from "@/types/product";
import Navbar from "@/Components/Navbar";
import { PageProps } from "@/types";
import axios from "axios";
import { router } from "@inertiajs/react";

// Helper function to format IDR
const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

interface Props extends PageProps {
    cart: Cart;
    products: Product[];
}

declare global {
    interface Window {
        snap: any;
    }
}

export default function Checkout({ auth, cart, products }: Props) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        deliveryOption: "standard",
        sameAsBilling: true,
        isOver13: false,
        newsletter: false,
    });

    const cartItemsState = cart?.items || [];

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

    const [paymentResult, setPaymentResult] = useState<string>("");

    useEffect(() => {
        // Load Midtrans Snap script
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute(
            "data-client-key",
            import.meta.env.VITE_MIDTRANS_CLIENT_KEY || ""
        );
        document.head.appendChild(script);
    }, []);

    const handlePayment = async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        try {
            const response = await axios.post("/checkout/process", {
                ...formData,
                paymentStatus: "pending",
                paymentMethod: "transfer",
            });

            if (response.data.snapToken) {
                window.snap.pay(response.data.snapToken, {
                    onSuccess: function (result: any) {
                        // Update order status to success/settlement
                        axios
                            .post("/checkout/update-status", {
                                snapToken: response.data.snapToken, // Send the snap token to identify the order
                                status: "settlement", // Update status to settlement
                            })
                            .then(() => {
                                router.visit("/payment/success", {
                                    method: "get",
                                    data: {
                                        orderDetails: {
                                            orderId: result.order_id,
                                            amount: result.gross_amount,
                                            status: result.transaction_status,
                                        },
                                    },
                                });
                            });
                    },
                    onPending: function (result: any) {
                        setPaymentResult(JSON.stringify(result, null, 2));
                    },
                    onError: function (result: any) {
                        setPaymentResult(JSON.stringify(result, null, 2));
                    },
                });
            }
        } catch (error) {
            console.error("Payment error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!cart || !cartItem || !product) {
        return <div>No items in cart</div>;
    }

    return (
        <div className="min-h-screen bg-[#e7e7e3] py-8">
            <Navbar user={auth?.user} cartItems={cartItemsState} />
            <div className="max-w-7xl mx-auto px-4 mt-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <CheckoutForm
                            isProcessing={isProcessing}
                            setIsProcessing={setIsProcessing}
                            formData={formData}
                            setFormData={setFormData}
                        />
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className={`mt-4 w-full px-4 py-2 text-white ${
                                isProcessing ? "bg-gray-400" : "bg-blue-500"
                            } rounded hover:bg-blue-600`}
                        >
                            {isProcessing ? "Processing..." : "Pay Now"}
                        </button>

                        {paymentResult && (
                            <pre className="mt-4 p-4 bg-gray-100 rounded">
                                <div>
                                    Payment Result:
                                    <br />
                                    {paymentResult}
                                </div>
                            </pre>
                        )}
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
