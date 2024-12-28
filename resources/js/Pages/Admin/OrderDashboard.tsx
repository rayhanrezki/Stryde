import { Head } from "@inertiajs/react";
import { MoreVertical } from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";

interface Order {
    id: string;
    product_name: string;
    order_id: string;
    date: string;
    customer: {
        name: string;
        avatar?: string;
    };
    status: "Delivered" | "Canceled" | "settlement" | "pending";
    amount: number;
}

interface Props {
    orders: Order[];
}

export default function OrderDashboard({ orders }: Props) {
    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case "settlement":
                return "bg-green-100 text-black-800 font-rubik";
            case "pending":
                return "bg-yellow-100 text-black-800 font-rubik font-bold";
            case "canceled":
                return "bg-red-100 text-orange-800 font-rubik font-bold";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <AdminLayout>
            <Head title="Order Dashboard" />

            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Recent Orders</h2>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="w-6 pb-3">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300"
                                        />
                                    </th>
                                    <th className="text-left pb-3 text-gray-600 font-medium">
                                        Product
                                    </th>
                                    <th className="text-left pb-3 text-gray-600 font-medium">
                                        Order ID
                                    </th>
                                    <th className="text-left pb-3 text-gray-600 font-medium">
                                        Date
                                    </th>
                                    <th className="text-left pb-3 text-gray-600 font-medium">
                                        Customer Name
                                    </th>
                                    <th className="text-left pb-3 text-gray-600 font-medium">
                                        Status
                                    </th>
                                    <th className="text-left pb-3 text-gray-600 font-medium">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                            />
                                        </td>
                                        <td className="py-4">
                                            {order.product_name}
                                        </td>
                                        <td className="py-4">
                                            #{order.order_id}
                                        </td>
                                        <td className="py-4">{order.date}</td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                {order.customer.avatar && (
                                                    <img
                                                        src={
                                                            order.customer
                                                                .avatar
                                                        }
                                                        alt={
                                                            order.customer.name
                                                        }
                                                        className="w-6 h-6 rounded-full"
                                                    />
                                                )}
                                                <span>
                                                    {order.customer.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span
                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                                    order.status
                                                )}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            ${order.amount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
