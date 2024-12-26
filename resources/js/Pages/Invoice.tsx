import Navbar from "@/Components/Navbar";
import { PageProps } from "@/types";
import { Cart, Product } from "@/types/product";

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

export default function Invoice({ auth, cart, products }: Props) {
    const cartItemsState = cart?.items || [];
    const cartItem = cart?.items[0];
    const product = cartItem
        ? products.find((p) => p.id === cartItem.product_id)
        : null;

    const orderSummary = {
        items: cart?.items?.length || 0,
        itemsTotal: cartItemsState.reduce((total, item) => {
            const productItem = products.find((p) => p.id === item.product_id);
            return total + (Number(productItem?.price) || 0) * item.quantity;
        }, 0),
        delivery: 0,
        salesTax: 0,
        total: cartItemsState.reduce((total, item) => {
            const productItem = products.find((p) => p.id === item.product_id);
            return total + (Number(productItem?.price) || 0) * item.quantity;
        }, 0),
        formatPrice: formatIDR,
    };

    if (!cart || !cartItem || !product) {
        return <div>No items in cart</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <Navbar user={auth?.user} cartItems={cartItemsState} />
            <div className="max-w-5xl mx-auto px-6 mt-14 bg-white shadow-lg rounded-lg">
                <div className="px-6 py-8">
                    {/* Invoice Header */}
                    <h1 className="font-bold text-3xl my-4 text-center text-red-600">Invoice</h1>
                    <hr className="mb-6 border-gray-300" />
                    <div className="flex justify-between mb-6">
                        <h2 className="text-xl font-bold">Invoice Details</h2>
                        <div className="text-gray-600">
                            <div>Date: {new Date().toLocaleDateString("id-ID")}</div>
                            <div>Invoice #: INV12345</div>
                        </div>
                    </div>

                    {/* Billing Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
                        <div className="text-gray-700 mb-2">{auth?.user?.name}</div>
                        <div className="text-gray-700 mb-2">123 Main St.</div>
                        <div className="text-gray-700 mb-2">Anytown, USA 12345</div>
                        <div className="text-gray-700">{auth?.user?.email}</div>
                    </div>

                    {/* Product Table */}
                    <table className="w-full mb-8 table-auto border-separate border-spacing-0.5">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left font-bold text-gray-700 py-3 px-4">Description</th>
                                <th className="text-right font-bold text-gray-700 py-3 px-4">Amount</th>
                                <th className="text-right font-bold text-gray-700 py-3 px-4">Quantity</th>
                                <th className="text-right font-bold text-gray-700 py-3 px-4">Total</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {cart?.items.map((item) => {
                                const productItem = products.find((p) => p.id === item.product_id);
                                const totalItemPrice = (Number(productItem?.price) || 0) * item.quantity;
                                return (
                                    <tr key={item.id} className="hover:bg-gray-100">
                                        <td className="text-left text-gray-700 py-3 px-4">{productItem?.name}</td>
                                        <td className="text-right text-gray-700 py-3 px-4">
                                            {formatIDR(Number(productItem?.price || 0))}
                                        </td>
                                        <td className="text-right text-gray-700 py-3 px-4">{item.quantity}</td>
                                        <td className="text-right text-gray-700 py-3 px-4">
                                            {formatIDR(totalItemPrice)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot className="bg-gray-200">
                            <tr>
                                <td className="text-left font-bold text-gray-700 py-3 px-4" colSpan={3}>Total</td>
                                <td className="text-right font-bold text-gray-700 py-3 px-4">
                                    {formatIDR(orderSummary.total)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Footer */}
                    <div className="text-gray-700 text-center mb-4">
                        <span className="font-semibold">Thank you for your business!</span>
                    </div>
                    <div className="text-black  text-center">
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
