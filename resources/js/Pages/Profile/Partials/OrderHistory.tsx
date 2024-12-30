import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Link } from "@inertiajs/react";

interface OrderHistoryProps {
    orders: Order[];
    className?: string;
}

export default function OrderHistory({
    orders,
    className = "",
}: OrderHistoryProps) {
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Order History
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    View all your previous orders and their details.
                </p>
            </header>

            <div className="relative mx-auto">
                {/* Orders Display */}
                <div className="flex gap-6 overflow-x-auto px-4 pb-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-lg border border-gray-200 p-6 bg-white relative min-h-[400px] w-[400px] flex-shrink-0 hover:shadow-lg"
                        >
                            <div className="flex justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Order #{order.order_id}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {order.date}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">
                                        {formatPrice(order.amount)}
                                    </p>
                                    <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                                        Completed
                                    </span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-16">
                                <h4 className="font-medium mb-2">Items</h4>
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between py-2"
                                    >
                                        <div>
                                            <p>{item.product_name}</p>
                                            <p className="text-sm text-gray-600">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-medium">
                                            {formatPrice(
                                                item.price * item.quantity
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute bottom-6 right-6">
                                <Link
                                    href={route("invoice.show", {
                                        orderId: order.id,
                                    })}
                                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    View Invoice
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
