import { useRef } from "react";
import Navbar from "@/Components/Navbar";
import { PageProps } from "@/types";
import { Order, Product, Cart } from "@/types/product";
import { jsPDF } from "jspdf"; // Import jsPDF
import React from "react";

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
    order: Order[]; // We now receive an order array with one item
    products: Product[];
    cart: Cart; // Cart data passed to the page
}

export default function Invoice({ auth, order, products, cart }: Props) {
    const orderDetails = order && order.length > 0 ? order[0] : null;
    if (!orderDetails) {
        return <div>No order details found</div>;
    }
    const orderItems = Array.isArray(orderDetails?.product_id)
        ? orderDetails.product_id
        : []; // Ensure products_id is an array
    const orderProducts = products;

    const orderSummary = {
        items: Array.isArray(orderItems) ? orderItems.length : 0,
        itemsTotal: orderProducts.reduce((total, product) => {
            return (
                total +
                product.price *
                    orderItems.filter((id) => id === product.id.toString())
                        .length
            );
        }, 0),
        delivery: 0,
        salesTax: 0,
        total: orderProducts.reduce(
            (total, product) =>
                total +
                product.price *
                    orderItems.filter((id) => id === product.id.toString())
                        .length,
            0
        ),
        formatPrice: formatIDR,
    };

    // Cart items to send to Navbar
    const cartItemsState = cart?.items || [];

    // Create a ref to capture the content of the invoice
    const invoiceRef = useRef<HTMLDivElement>(null);
    const downloadButtonRef = useRef<HTMLButtonElement>(null);

    // Function to handle the download of the PDF
    const downloadInvoice = () => {
        // Temporarily hide the download button
        if (downloadButtonRef.current) {
            downloadButtonRef.current.style.display = "none";
        }

        const doc = new jsPDF({
            orientation: "portrait", // Set orientation to portrait
            unit: "mm", // Set unit to millimeters
            format: "a4", // Set the format to A4
        });

        // Capture the content of the invoice
        if (invoiceRef.current) {
            doc.html(invoiceRef.current, {
                callback: (doc) => {
                    doc.save(`Invoice_${orderDetails.id}.pdf`);

                    // After generating the PDF, restore the button visibility
                    if (downloadButtonRef.current) {
                        downloadButtonRef.current.style.display =
                            "inline-block";
                    }
                },
                margin: [10, 10, 10, 10], // Set margins for the PDF
                x: 10, // Start rendering at X 10mm
                y: 10, // Start rendering at Y 10mm
                width: 190, // Width of the content area (A4 width minus margins)
                windowWidth: 650, // Adjust this based on your content width
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <Navbar user={auth?.user} cartItems={cartItemsState} />
            <div
                ref={invoiceRef} // Add the ref to the main container
                className="max-w-5xl mx-auto px-6 mt-14 bg-white shadow-lg rounded-lg"
            >
                <div className="px-6 py-8">
                    <h1 className="font-bold text-3xl my-4 text-center text-red-600">
                        Invoice
                    </h1>
                    <hr className="mb-6 border-gray-300" />
                    <div className="flex justify-between mb-6">
                        <h2 className="text-xl font-bold">Invoice Details</h2>
                        <div className="text-gray-600">
                            <div>
                                Date:{" "}
                                {new Date(
                                    orderDetails.order_date
                                ).toLocaleDateString("id-ID")}
                            </div>
                            <div>Invoice #: {`INV${orderDetails.id}`}</div>
                        </div>
                    </div>

                    {/* Billing Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
                        <div className="text-gray-700 mb-2">
                            {orderDetails.first_name} {orderDetails.last_name}
                        </div>
                        <div className="text-gray-700 mb-2">
                            {orderDetails.address}
                        </div>
                        <div className="text-gray-700 mb-2">
                            {orderDetails.phone}
                        </div>
                        <div className="text-gray-700">
                            {orderDetails.email}
                        </div>
                    </div>

                    {/* Product Table */}
                    <table className="w-full mb-8 table-auto border-separate border-spacing-0.5">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left font-bold text-gray-700 py-3 px-4">
                                    Description
                                </th>
                                <th className="text-right font-bold text-gray-700 py-3 px-4">
                                    Amount
                                </th>
                                <th className="text-right font-bold text-gray-700 py-3 px-4">
                                    Quantity
                                </th>
                                <th className="text-right font-bold text-gray-700 py-3 px-4">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {Object.entries(
                                orderProducts.reduce((acc, product) => {
                                    const createdAt = orderDetails.created_at; // Gunakan created_at sebagai kunci
                                    if (!acc[createdAt]) {
                                        acc[createdAt] = [];
                                    }
                                    acc[createdAt].push(product); // Tambahkan produk ke grup berdasarkan created_at
                                    return acc;
                                }, {} as Record<string, Product[]>)
                            ).map(([createdAt, products]) => (
                                <React.Fragment key={createdAt}>
                                    {/* Header untuk grup berdasarkan created_at */}
                                    <tr>
                                        <td
                                            className="text-left font-bold text-gray-700 py-3 px-4"
                                            colSpan={4}
                                        >
                                            Created At:{" "}
                                            {new Date(createdAt).toLocaleString(
                                                "id-ID",
                                                {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    second: "2-digit",
                                                }
                                            )}
                                        </td>
                                    </tr>

                                    {/* Tampilkan produk dalam grup */}
                                    {products.map((product) => {
                                        const quantity = orderItems.filter(
                                            (id: string) =>
                                                id === product.id.toString()
                                        ).length;
                                        const totalItemPrice =
                                            product.price * quantity;

                                        return (
                                            <tr
                                                key={product.id}
                                                className="hover:bg-gray-100"
                                            >
                                                <td className="text-left text-gray-700 py-3 px-4">
                                                    {product.name}
                                                </td>
                                                <td className="text-right text-gray-700 py-3 px-4">
                                                    {formatIDR(product.price)}
                                                </td>
                                                <td className="text-right text-gray-700 py-3 px-4">
                                                    {orderDetails.quantity}
                                                </td>
                                                <td className="text-right text-gray-700 py-3 px-4">
                                                    {formatIDR(
                                                        orderDetails.total_amount
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-200">
                            <tr>
                                <td
                                    className="text-left font-bold text-gray-700 py-3 px-4"
                                    colSpan={3}
                                >
                                    Total
                                </td>
                                <td className="text-right font-bold text-gray-700 py-3 px-4">
                                    {formatIDR(orderDetails.total_amount)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Footer */}
                    <div className="text-gray-700 text-center mb-4">
                        <span className="font-semibold">
                            Thank you for your business!
                        </span>
                    </div>
                    <div className="text-black text-center">
                        <span className="font-bold">Stryde</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-6">
                        <button
                            ref={downloadButtonRef}
                            onClick={downloadInvoice} // Attach downloadInvoice to the button
                            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                        >
                            Download Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
