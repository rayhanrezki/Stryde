import { Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    Package,
    ListOrdered,
    ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    return (
        <aside className="fixed left-0 top-0 h-screen w-[240px] bg-white border-r">
            {/* Logo */}
            <div className="p-5 border-b">
                <a className="text-xl font-bold font-rubik" href="/">
                    Stryde
                </a>
            </div>

            {/* Main Navigation */}
            <nav className="p-4 space-y-2">
                <Link
                    href={route("dashboard")}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        route().current("dashboard")
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    <LayoutDashboard size={20} />
                    <span className="font-medium font-rubik">DASHBOARD</span>
                </Link>

                <Link
                    href={route("products.dashboard")}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        route().current("products.dashboard")
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    <Package size={20} />
                    <span className="font-medium font-rubik">ALL PRODUCTS</span>
                </Link>

                <Link
                    href="#"
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ListOrdered size={20} />
                    <span className="font-medium font-rubik">ORDER LIST</span>
                </Link>
            </nav>

            {/* Categories */}
            <div className="p-4">
                <button
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="flex items-center justify-between w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <span className="font-medium">Categories</span>
                    <ChevronDown
                        size={20}
                        className={`transform transition-transform ${
                            isCategoriesOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {isCategoriesOpen && (
                    <div className="mt-2 ml-3 space-y-1">
                        <Link
                            href="#"
                            className="block p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Running
                        </Link>
                        <Link
                            href="#"
                            className="block p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Basketball
                        </Link>
                        <Link
                            href="#"
                            className="block p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Training
                        </Link>
                        <Link
                            href="#"
                            className="block p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Lifestyle
                        </Link>
                    </div>
                )}
            </div>
        </aside>
    );
}
