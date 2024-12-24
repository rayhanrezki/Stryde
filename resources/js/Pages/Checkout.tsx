import { useState } from "react";
import CheckoutForm from "@/Components/checkout-form";
import OrderDetails from "@/Components/order-details";
import OrderSummary from "@/Components/order-summary";

export default function Checkout() {
    const [isProcessing, setIsProcessing] = useState(false);

    return (
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
    );
}
