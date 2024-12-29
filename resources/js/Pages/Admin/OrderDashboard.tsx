import { Head } from "@inertiajs/react";
import { MoreVertical, ChevronDown } from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState, useEffect, useRef } from "react";

// helper function to format IDR
const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

interface OrderItem {
    product_name: string;
    quantity: number;
    price: number;
}

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
    items?: OrderItem[];
}

interface Props {
    orders: Order[];
}

export default function OrderDashboard({ orders }: Props) {
    const [showDropdown, setShowDropdown] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Add click away listener
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(null);
            }
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Order Report", 10, 10);

        const tableColumn = [
            "Product",
            "Order ID",
            "Date",
            "Customer Name",
            "Status",
            "Amount",
        ];
        const tableRows: string[][] = [];

        orders.forEach((order) => {
            const orderData = [
                order.product_name,
                `#${order.order_id}`,
                order.date,
                order.customer.name,
                order.status,
                formatIDR(order.amount),
            ];
            tableRows.push(orderData);
        });

        // Menambahkan tabel ke PDF
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("order-report.pdf");
    };

    return (
        <AdminLayout>
            <Head title="Order Dashboard" />

            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Recent Orders</h2>
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>

                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                    <button
                                        onClick={() => {
                                            generatePDF();
                                            setShowMenu(false);
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        Print Table
                                    </button>
                                </div>
                            )}
                        </div>
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
                                    <>
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
                                                <div className="relative">
                                                    <div
                                                        className="flex items-center cursor-pointer"
                                                        onClick={() =>
                                                            setShowDropdown(
                                                                showDropdown ===
                                                                    order.id
                                                                    ? null
                                                                    : order.id
                                                            )
                                                        }
                                                    >
                                                        {order.product_name}
                                                        <ChevronDown
                                                            className={`w-4 h-4 ml-1 transition-transform ${
                                                                showDropdown ===
                                                                order.id
                                                                    ? "transform rotate-180"
                                                                    : ""
                                                            }`}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                #{order.order_id}
                                            </td>
                                            <td className="py-4">
                                                {order.date}
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    {order.customer.avatar && (
                                                        <img
                                                            src={
                                                                order.customer
                                                                    .avatar
                                                            }
                                                            alt={
                                                                order.customer
                                                                    .name
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
                                                {formatIDR(order.amount)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={7} className="p-0">
                                                <div
                                                    className={`transition-all duration-200 ease-in-out overflow-hidden ${
                                                        showDropdown ===
                                                        order.id
                                                            ? "max-h-[500px] border-b"
                                                            : "max-h-0"
                                                    }`}
                                                >
                                                    {order.items?.map(
                                                        (item, index) => (
                                                            <div
                                                                key={index}
                                                                className="px-4 py-3 bg-gray-50 flex justify-between items-center border-b last:border-b-0"
                                                            >
                                                                <div className="flex-1">
                                                                    <div className="font-medium text-gray-900">
                                                                        {
                                                                            item.product_name
                                                                        }
                                                                    </div>
                                                                    <div className="text-gray-500 text-sm">
                                                                        Quantity:{" "}
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="text-gray-900">
                                                                    {formatIDR(
                                                                        item.price
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}