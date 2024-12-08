import { useState } from "react";
import { Head } from "@inertiajs/react";
import { Heart, Trash2 } from "lucide-react";
import { CartItem, OrderSummary } from "@/types/cart";

export default function Cart() {
    const [cartItem] = useState<CartItem>({
        id: "1",
        name: "DROPSET TRAINER SHOES",
        category: "Men's Road Running Shoes",
        description: "Enamel Blue/ University White",
        price: 130.0,
        image: "/placeholder.svg",
        size: "10",
        quantity: 1,
    });

    const [orderSummary] = useState<OrderSummary>({
        itemCount: 1,
        subtotal: 130.0,
        delivery: 6.99,
        salesTax: 0,
        total: 136.99,
    });

    return (
        <>
            <Head title="Shopping Cart" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-2">
                            Saving to celebrate
                        </h1>
                        <p className="text-gray-600">
                            Enjoy up to 60% off thousands of styles during the
                            End of Year sale - while supplies last. No code
                            needed.
                        </p>
                        <div className="flex gap-2 mt-2">
                            <button className="text-blue-600 hover:underline">
                                Join us
                            </button>
                            <span className="text-gray-600">or</span>
                            <button className="text-blue-600 hover:underline">
                                Sign-in
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-2">
                                    Your Bag
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Items in your bag not reserved - check out
                                    now to make them yours.
                                </p>

                                <div className="flex gap-6">
                                    <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={cartItem.image}
                                            alt={cartItem.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg">
                                                    {cartItem.name}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {cartItem.category}
                                                </p>
                                                <p className="text-gray-600">
                                                    {cartItem.description}
                                                </p>
                                            </div>
                                            <span className="text-blue-600 font-semibold">
                                                ${cartItem.price.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex gap-4 mt-4">
                                            <select
                                                className="border rounded-md px-3 py-2 bg-white"
                                                value={cartItem.size}
                                            >
                                                <option value="10">
                                                    Size 10
                                                </option>
                                                <option value="10.5">
                                                    Size 10.5
                                                </option>
                                                <option value="11">
                                                    Size 11
                                                </option>
                                            </select>

                                            <select
                                                className="border rounded-md px-3 py-2 bg-white"
                                                value={cartItem.quantity}
                                            >
                                                <option value="1">
                                                    Quantity 1
                                                </option>
                                                <option value="2">
                                                    Quantity 2
                                                </option>
                                                <option value="3">
                                                    Quantity 3
                                                </option>
                                            </select>
                                        </div>

                                        <div className="flex gap-4 mt-4">
                                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                                <Heart className="w-5 h-5" />
                                                <span className="sr-only">
                                                    Add to Favorites
                                                </span>
                                            </button>
                                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                                <Trash2 className="w-5 h-5" />
                                                <span className="sr-only">
                                                    Remove Item
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            {orderSummary.itemCount} ITEM
                                        </span>
                                        <span>
                                            ${orderSummary.subtotal.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Delivery
                                        </span>
                                        <span>
                                            ${orderSummary.delivery.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Sales Tax
                                        </span>
                                        <span>-</span>
                                    </div>

                                    <div className="flex justify-between border-t pt-4">
                                        <span className="font-semibold">
                                            Total
                                        </span>
                                        <span className="font-semibold">
                                            ${orderSummary.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full bg-black text-white rounded-md py-3 mt-6 hover:bg-gray-800">
                                    CHECKOUT
                                </button>

                                <button className="w-full text-gray-600 mt-4 hover:text-gray-900">
                                    Use a promo code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
