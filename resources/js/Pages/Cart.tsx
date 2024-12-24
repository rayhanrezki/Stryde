import { useState, useEffect } from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import RecommendedProducts from "@/Components/RecommendedProducts";

import { Product, ProductSize } from "@/types/product";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { PageProps } from "@/types";

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

export default function Cart({ recommendedProducts, cartItems, auth }: Props) {
    const [cartItemsState, setCartItems] = useState<CartItem[]>(cartItems);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Cart Items:", cartItemsState); // Lihat seluruh data
        cartItemsState.forEach((item) => {
            console.log("Size:", item.sizes); // Periksa apakah size tersedia
        });
    }, [cartItemsState]);

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

    const updateQuantity = (id: number, quantity: number) => {
        // Membuat form untuk mengirimkan data ke server
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "/cart/update";

        // Menambahkan CSRF token
        const csrfToken =
            document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content") || "";

        const csrfInput = document.createElement("input");
        csrfInput.type = "hidden";
        csrfInput.name = "_token";
        csrfInput.value = csrfToken;

        // Menambahkan ID item dan kuantitas
        const idInput = document.createElement("input");
        idInput.type = "hidden";
        idInput.name = "cart_item_id";
        idInput.value = id.toString();

        const quantityInput = document.createElement("input");
        quantityInput.type = "hidden";
        quantityInput.name = "quantity";
        quantityInput.value = quantity.toString();

        form.appendChild(csrfInput);
        form.appendChild(idInput);
        form.appendChild(quantityInput);

        document.body.appendChild(form);
        form.submit();
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
        const delivery = 6.99;
        const salesTax = 0; // Static for now
        const total = subtotal + delivery + salesTax;

        return { itemCount, subtotal, delivery, salesTax, total };
    };

    const orderSummary = calculateOrderSummary();

    return (
        <div>
            <Head title="Shopping Cart" />
            <Navbar user={auth?.user} cartItems={cartItemsState} />

            <div className="min-h-screen bg-[#e7e7e3] p-6 py-24">
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

                                {cartItemsState.map((cartItem) => (
                                    <div
                                        key={cartItem.id}
                                        className="flex gap-6 mb-6"
                                    >
                                        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                                            {/* Memastikan array images tidak kosong sebelum mengakses elemen pertama */}
                                            <img
                                                src={
                                                    cartItem.product.images &&
                                                    cartItem.product.images
                                                        .length > 0
                                                        ? `/storage/${cartItem.product.images[0].image_path}` // Menambahkan '/storage' untuk path gambar publik
                                                        : "/public/imagesAIR-MAX-DN.png" // Gambar default jika tidak ada gambar produk
                                                }
                                                alt={cartItem.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-lg">
                                                        {cartItem.product.name}
                                                    </h3>

                                                    <p className="text-gray-600">
                                                        {cartItem.product
                                                            .categories &&
                                                        cartItem.product
                                                            .categories.length >
                                                            0
                                                            ? `Category: ${cartItem.product.categories[0]?.name}`
                                                            : "No category available"}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {
                                                            cartItem.product
                                                                .description
                                                        }
                                                    </p>

                                                    <p className="text-gray-600">
                                                        Size:{" "}
                                                        {cartItem.product_size
                                                            ?.size || "N/A"}
                                                    </p>
                                                </div>
                                                <span className="text-blue-600 font-semibold">
                                                    $
                                                    {parseFloat(
                                                        cartItem.product.price.toString()
                                                    ).toFixed(2)}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 mt-4">
                                                <button
                                                    className="text-gray-600 hover:text-gray-900"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            cartItem.id,
                                                            Math.max(
                                                                cartItem.quantity -
                                                                    1,
                                                                1
                                                            )
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="text-lg font-semibold">
                                                    {cartItem.quantity}
                                                </span>
                                                <button
                                                    className="text-gray-600 hover:text-gray-900"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            cartItem.id,
                                                            cartItem.quantity +
                                                                1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="flex gap-4 mt-4">
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
                            <div className="bg-[#e7e7e3] p-6">
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

                                    <div className="flex justify-between border-t pt-4">
                                        <span className="font-semibold">
                                            Total
                                        </span>
                                        <span className="font-semibold">
                                            ${orderSummary.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href={route("checkout")}
                                    className="block w-full bg-black text-white rounded-md py-3 mt-6 hover:bg-gray-800 text-center"
                                >
                                    Proceed to Checkout
                                </Link>

                                <button className="w-full text-gray-600 mt-4 hover:text-gray-900">
                                    Use a promo code
                                </button>
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
