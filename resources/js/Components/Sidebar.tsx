import { Link, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    Package,
    ListOrdered,
    Grid2x2,
    Menu,
    X,
    LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Sidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close sidebar when screen size becomes larger
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navigationLinks = [
        {
            href: route("dashboard"),
            icon: <LayoutDashboard size={20} />,
            text: "DASHBOARD",
            active: route().current("dashboard"),
        },
        {
            href: route("products.index"),
            icon: <Package size={20} />,
            text: "ALL PRODUCTS",
            active: route().current("products.index"),
        },
        {
            href: route("orders.index"),
            icon: <ListOrdered size={20} />,
            text: "ORDER LIST",
            active: route().current("orders.index"),
        },
        {
            href: route("categories.index"),
            icon: <Grid2x2 size={20} />,
            text: "Categories",
            active: route().current("categories.index"),
        },
    ];

    return (
        <>
            {/* Hamburger Menu Button - Visible on Mobile */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-md"
            >
                {isMobileMenuOpen ? (
                    <X size={24} className="text-gray-600" />
                ) : (
                    <Menu size={24} className="text-gray-600" />
                )}
            </button>

            {/* Overlay - Visible when mobile menu is open */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                fixed left-0 top-0 h-screen bg-white border-r z-40 w-[240px]
                transition-transform duration-300 ease-in-out flex flex-col
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
            `}
            >
                {/* Logo */}
                <div className="p-5 border-b">
                    <a className="text-xl font-bold font-rubik" href="/">
                        Stryde
                    </a>
                </div>

                {/* Main Navigation */}
                <nav className="p-4 space-y-2 flex-1">
                    {navigationLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                link.active
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.icon}
                            <span className="font-medium font-rubik">
                                {link.text}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t">
                    <button
                        onClick={() => router.post(route("logout"))}
                        className="flex items-center gap-3 p-3 rounded-lg transition-colors w-full text-gray-700 hover:bg-gray-100"
                    >
                        <LogOut size={20} />
                        <span className="font-medium font-rubik">LOGOUT</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
