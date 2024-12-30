import { useState, useEffect } from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import RecommendedProducts from "@/Components/RecommendedProducts";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Product, ProductSize } from "@/types/product";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { PageProps } from "@/types";

interface CartItem {
    sizes: string;
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

const formatToIDR = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export default function Cart({ recommendedProducts, cartItems, auth }: Props) {
    const [cartItemsState, setCartItems] = useState<CartItem[]>(cartItems);

    const removeItem = (id: number) => {
        if (!confirm("Are you sure you want to remove this item?")) return;

        // Membuat form untuk mengirimkan data ke server
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "/cart/remove";

        // Menambahkan CSRF token
        const csrfToken =
            document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content") || "";

        const csrfInput = document.createElement("input");
        csrfInput.type = "hidden";
        csrfInput.name = "_token";
        csrfInput.value = csrfToken;

        // Menambahkan ID item yang akan dihapus
        const idInput = document.createElement("input");
        idInput.type = "hidden";
        idInput.name = "cart_item_id";
        idInput.value = id.toString();

        form.appendChild(csrfInput);
        form.appendChild(idInput);

        document.body.appendChild(form);
        form.submit();
    };

    const handleQuantityChange = async (
        cartItemId: number,
        newQuantity: number
    ) => {
        try {
            // Find the current cart item to check its current quantity
            const currentItem = cartItemsState.find(
                (item) => item.id === cartItemId
            );
            if (!currentItem) return;

            // Prevent negative quantities
            if (newQuantity < 1) {
                toast.error("Quantity cannot be less than 1");
                return;
            }

            const response = await axios.post("/cart/update-quantity", {
                cart_item_id: cartItemId,
                quantity: newQuantity,
            });

            if (response.data.success) {
                setCartItems((currentItems) =>
                    currentItems.map((item) =>
                        item.id === cartItemId
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
                toast.success(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                // If we get a stock limit error, reset the quantity to the available amount
                if (error.response.data.availableStock !== undefined) {
                    const maxQuantity =
                        error.response.data.currentQuantity +
                        error.response.data.availableStock;
                    setCartItems((currentItems) =>
                        currentItems.map((item) =>
                            item.id === cartItemId
                                ? {
                                      ...item,
                                      quantity:
                                          error.response?.data
                                              .currentQuantity ??
                                          error.response?.data.currentQuantity,
                                  }
                                : item
                        )
                    );
                    toast.error(`Maximum available quantity is ${maxQuantity}`);
                } else {
                    toast.error(error.response.data.message);
                }
            } else {
                toast.error("An error occurred while updating quantity");
            }
        }
    };

    const calculateOrderSummary = () => {
        if (!cartItemsState.length) {
            return {
                itemCount: 0,
                subtotal: 0,
                delivery: 0,
                salesTax: 0,
                total: 0,
            };
        }

        const itemCount = cartItemsState.reduce(
            (acc, item) => acc + item.quantity,
            0
        );
        const subtotal = cartItemsState.reduce(
            (acc, item) => acc + parseFloat(item.product.price) * item.quantity,
            0
        );
        const delivery = 0;
        const salesTax = 0;
        const total = subtotal + delivery + salesTax;

        return { itemCount, subtotal, delivery, salesTax, total };
    };

    const orderSummary = calculateOrderSummary();

    return (
        <div>
            <Head title="Shopping Cart" />
            <Navbar user={auth?.user} cartItems={cartItems} />

            <div className="min-h-screen bg-[#e7e7e3] p-4 sm:p-6 py-24">
                <div className="max-w-6xl mx-auto mt-24">
                    <div className="mb-8">
                        <h1 className="text-xl sm:text-2xl font-bold mb-2">
                            Step into Stryde
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            Discover the latest sneaker trends and find your
                            stride.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                                <h2 className="text-lg sm:text-xl font-semibold mb-2">
                                    Your Bag
                                </h2>
                                {cartItemsState.length > 0 ? (
                                    <p className="text-gray-600 mb-6">
                                        Items in your bag not reserved - check
                                        out now to make them yours.
                                    </p>
                                ) : (
                                    <p className="text-gray-600 mb-6">
                                        Your bag is empty.{" "}
                                        <Link
                                            href={route("products.list")}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Start shopping now!
                                        </Link>
                                    </p>
                                )}

                                {cartItemsState.map((cartItem) => (
                                    <div
                                        key={cartItem.id}
                                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 border-b pb-6 last:border-b-0"
                                    >
                                        <div className="w-full sm:w-32 h-48 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={
                                                    cartItem.product.images &&
                                                    cartItem.product.images
                                                        .length > 0
                                                        ? cartItem.product.images[0].image_path.startsWith(
                                                              "images/"
                                                          )
                                                            ? `/${cartItem.product.images[0].image_path}`
                                                            : `/storage/${cartItem.product.images[0].image_path}`
                                                        : "/placeholder.jpg"
                                                }
                                                alt={cartItem.product.name}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                                                <div>
                                                    <h3 className="font-semibold font-rubik text-lg truncate">
                                                        {cartItem.product.name}
                                                    </h3>

                                                    <p className="text-sm text-black-600 font-rubik">
                                                        {cartItem.product
                                                            .categories &&
                                                        cartItem.product
                                                            .categories.length >
                                                            0
                                                            ? `Category: ${cartItem.product.categories[0]?.name}`
                                                            : "No category available"}
                                                    </p>
                                                    <p className="text-sm text-gray-600 line-clamp-2">
                                                        {
                                                            cartItem.product
                                                                .description
                                                        }
                                                    </p>

                                                    <p className="text-sm text-black-600 font-rubik">
                                                        Size:{" "}
                                                        {cartItem.product_size
                                                            ?.size || "N/A"}
                                                    </p>
                                                </div>
                                                <span className="text-blue-600 font-semibold">
                                                    {formatToIDR(
                                                        parseFloat(
                                                            cartItem.product
                                                                .price
                                                        )
                                                    )}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        className="text-gray-600 hover:text-gray-900 w-8 h-8 flex items-center justify-center"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                cartItem.id,
                                                                cartItem.quantity -
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </button>

                                                    <span className="text-lg font-semibold">
                                                        {cartItem.quantity}
                                                    </span>

                                                    <button
                                                        className="text-gray-600 hover:text-gray-900 w-8 h-8 flex items-center justify-center"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                cartItem.id,
                                                                cartItem.quantity +
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() =>
                                                        removeItem(cartItem.id)
                                                    }
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div className="bg-white md:bg-[#e7e7e3] p-4 sm:p-6 rounded-lg md:rounded-none shadow-sm md:shadow-none">
                                <h2 className="text-lg sm:text-xl font-semibold mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            {orderSummary.itemCount} ITEM
                                        </span>
                                        <span>
                                            {formatToIDR(orderSummary.subtotal)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between border-t pt-4">
                                        <span className="font-semibold">
                                            Total
                                        </span>
                                        <span className="font-semibold">
                                            {formatToIDR(orderSummary.total)}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href={route("checkout")}
                                    className="block w-full bg-black text-white rounded-md py-3 mt-6 hover:bg-gray-800 text-center"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {recommendedProducts.length > 0 && (
                <RecommendedProducts
                    recommendedProducts={recommendedProducts}
                />
            )}

            <Footer />
        </div>
    );
}
