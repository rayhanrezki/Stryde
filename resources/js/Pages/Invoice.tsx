import { useRef } from "react";
import Navbar from "@/Components/Navbar";
import { PageProps } from "@/types";
import { Product, Cart } from "@/types/product";
import { jsPDF } from "jspdf";

// Helper function to format IDR
const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

interface OrderItem {
    id: string;
    product_name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    order_id: string;
    date: string;
    customer: {
        name: string;
        avatar?: string;
        address?: string;
        phone?: string;
        email?: string;
    };
    items: OrderItem[];
    total: number;
}

interface Props extends PageProps {
    orders: Order[];
    products: Product[];
    cart: Cart;
}

export default function Invoice({ auth, orders, products, cart }: Props) {
    if (!orders || orders.length === 0) {
        return <div>No order details found</div>;
    }

    const order = orders[0]; // Assuming single order for the invoice
    const cartItemsState = cart?.items || [];

    const invoiceRef = useRef<HTMLDivElement>(null);
    const downloadButtonRef = useRef<HTMLButtonElement>(null);

    const downloadInvoice = () => {
        if (downloadButtonRef.current) {
            downloadButtonRef.current.style.display = "none";
        }

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        if (invoiceRef.current) {
            doc.html(invoiceRef.current, {
                callback: (doc) => {
                    doc.save(`Invoice_${order.order_id}.pdf`);
                    if (downloadButtonRef.current) {
                        downloadButtonRef.current.style.display =
                            "inline-block";
                    }
                },
                margin: [10, 10, 10, 10],
                x: 10,
                y: 10,
                width: 190,
                windowWidth: 650,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <Navbar user={auth?.user} cartItems={cartItemsState} />
            <div
                ref={invoiceRef}
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
                                {new Date(order.date).toLocaleDateString(
                                    "id-ID"
                                )}
                            </div>
                            <div>Invoice #: INV{order.order_id}</div>
                        </div>
                    </div>

                    {/* Billing Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
                        <div className="text-gray-700 mb-2">
                            {order.customer.name}
                        </div>
                        {order.customer.address && (
                            <div className="text-gray-700 mb-2">
                                {order.customer.address}
                            </div>
                        )}
                        {order.customer.phone && (
                            <div className="text-gray-700 mb-2">
                                {order.customer.phone}
                            </div>
                        )}
                        {order.customer.email && (
                            <div className="text-gray-700">
                                {order.customer.email}
                            </div>
                        )}
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
                            {order.items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-100">
                                    <td className="text-left text-gray-700 py-3 px-4">
                                        {item.product_name}
                                    </td>
                                    <td className="text-right text-gray-700 py-3 px-4">
                                        {formatIDR(item.price)}
                                    </td>
                                    <td className="text-right text-gray-700 py-3 px-4">
                                        {item.quantity}
                                    </td>
                                    <td className="text-right text-gray-700 py-3 px-4">
                                        {formatIDR(item.price * item.quantity)}
                                    </td>
                                </tr>
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
                                    {formatIDR(order.total)}
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
                            onClick={downloadInvoice}
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
