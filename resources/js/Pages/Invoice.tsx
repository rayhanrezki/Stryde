import Navbar from "@/Components/Navbar";
import { PageProps } from "@/types";
import { Order, Product, Cart } from "@/types/product";

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
    const orderItems = Array.isArray(orderDetails?.products_id)
        ? orderDetails.products_id
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

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <Navbar user={auth?.user} cartItems={cartItemsState} />
            <div className="max-w-5xl mx-auto px-6 mt-14 bg-white shadow-lg rounded-lg">
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
                            {auth?.user?.name}
                        </div>
                        <div className="text-gray-700 mb-2">
                            {orderDetails.address}
                        </div>
                        <div className="text-gray-700 mb-2">
                            {orderDetails.phone}
                        </div>
                        <div className="text-gray-700">{auth?.user?.email}</div>
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
                            {orderProducts.map((product) => {
                                const quantity = orderItems.filter(
                                    (id: string) => id === product.id.toString()
                                ).length;
                                const totalItemPrice = product.price * quantity;
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
                                            {quantity}
                                        </td>
                                        <td className="text-right text-gray-700 py-3 px-4">
                                            {formatIDR(totalItemPrice)}
                                        </td>
                                    </tr>
                                );
                            })}
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
                                    {formatIDR(orderSummary.total)}
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
                        <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
                            Download Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
