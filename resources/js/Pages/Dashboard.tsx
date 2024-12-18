import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Package, Users, ShoppingCart } from "lucide-react";
import QuoteFetch from "@/Components/QuoteFetch";

interface Props {
    totalProducts: number;
    totalUsers: number;
    user: {
        id: number;
        name: string;
        email: string;
        is_admin: boolean;
    };
}

export default function Dashboard({ totalProducts, totalUsers }: Props) {
    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Products Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Package className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total Products
                                </p>
                                <p className="text-2xl font-semibold">
                                    {totalProducts}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Users Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Registered Users
                                </p>
                                <p className="text-2xl font-semibold">
                                    {totalUsers}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Orders Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <ShoppingCart className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total Orders
                                </p>
                                <p className="text-2xl font-semibold">24</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional dashboard content can go here */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <QuoteFetch />
                </div>
            </div>
        </AdminLayout>
    );
}
