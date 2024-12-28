import { Link } from "@inertiajs/react";
import Navbar from "../Components/Navbar";

interface Props {
    orderDetails?: {
        orderId: string;
        amount: number;
        status: string;
    };
}

export default function PaymentSuccess({ orderDetails }: Props) {
    return (
        <div className="min-h-screen bg-[#e7e7e3] flex items-center justify-center">
            <Navbar cartItems={[]} />
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <div className="mb-6">
                    <svg
                        className="w-16 h-16 mx-auto text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
                {orderDetails && (
                    <div className="mb-6 text-gray-600">
                        <p>Order ID: {orderDetails.orderId}</p>
                        <p>Amount: ${orderDetails.amount}</p>
                    </div>
                )}
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/dashboard"
                        className="block w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                    >
                        View Order Status
                    </Link>
                    <Link
                        href="/invoice" // Update URL untuk mencetak invoice
                        className="block w-full border border-black text-black py-2 px-4 rounded hover:bg-gray-100"
                    >
                        Cetak Invoice
                    </Link>
                </div>
            </div>
        </div>
    );
}
