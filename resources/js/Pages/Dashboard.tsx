import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p>Welcome to your dashboard!</p>
                </div>
            </div>
        </AdminLayout>
    );
}
