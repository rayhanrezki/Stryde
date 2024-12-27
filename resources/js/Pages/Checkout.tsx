import { useState } from "react";

// Extend the Window interface to include the snap property
declare global {
    interface Window {
        snap: any;
    }
}
import { CheckoutForm } from "@/Components/checkout-form";
import { OrderDetails } from "@/Components/order-details";
import { OrderSummary } from "@/Components/order-summary";
import { Product, Cart, CartItem } from "@/types/product";
import Navbar from "@/Components/Navbar";
import { PageProps } from "@/types";
import axios from "axios";

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

    // Payment Button Component
    const PaymentButton = () => {
        const [paymentStatus, setPaymentStatus] = useState("");

        const handlePayment = () => {
            // Replace TRANSACTION_TOKEN_HERE with your actual transaction token
            window.snap.pay("TRANSACTION_TOKEN_HERE", {
                onSuccess: (result: any) => {
                    setPaymentStatus("Payment success!");
                    console.log(result);
                },
                onPending: (result: any) => {
                    setPaymentStatus("Waiting for your payment...");
                    console.log(result);
                },
                onError: (result: any) => {
                    setPaymentStatus("Payment failed!");
                    console.log(result);
                },
                onClose: () => {
                    setPaymentStatus(
                        "You closed the popup without finishing the payment"
                    );
                },
            });
        };

        return (
            <div>
                <button
                    onClick={handlePayment}
                    className={`mt-4 w-full px-4 py-2 text-white ${
                        isProcessing ? "bg-gray-400" : "bg-blue-500"
                    } rounded hover:bg-blue-600`}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "Pay Now"}
                </button>
                {paymentStatus && <p>{paymentStatus}</p>}
            </div>
        );
    };
    const handleCheckout = async () => {
        if (isProcessing) return; // Prevent multiple clicks
        setIsProcessing(true);

        try {
            const response = await axios.post("/checkout/process", {
                ...formData, // Send form data to the backend
                paymentStatus: "pending", // Add default values as needed
                paymentMethod: "transfer", // Add default values as needed
            });

            if (response.status === 200) {
                alert(response.data.message); // Show success message
            } else {
                alert("Payment failed! Please try again.");
            }
        } catch (error: any) {
            alert(
                `Error: ${
                    error.response?.data?.message ||
                    "An unexpected error occurred"
                }`
            );
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
                            formData={formData} // Pass formData to the CheckoutForm
                            setFormData={setFormData} // Pass setFormData to handle input changes
                        />
                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className={`mt-4 w-full px-4 py-2 text-white ${
                                isProcessing ? "bg-gray-400" : "bg-blue-500"
                            } rounded hover:bg-blue-600`}
                        >
                            {isProcessing ? "Processing..." : "Checkout"}
                        </button>
                        <PaymentButton />{" "}
                        {/* Add the PaymentButton component */}
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
