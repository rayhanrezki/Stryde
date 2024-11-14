import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Search, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-50 px-4 py-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.nav
                className={`flex items-center justify-between p-4 bg-white rounded-full shadow-lg max-w-7xl mx-auto transition-all duration-300 ease-in-out ${
                    isScrolled ? "py-2" : "py-4"
                }`}
                layout
            >
                <div className="flex items-center space-x-6">
                    <NavLink href="/new-drops">New Drops</NavLink>
                    <NavLink href="/men">Men</NavLink>
                    <NavLink href="/women">Women</NavLink>
                </div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link href="/" className="text-2xl font-bold">
                        KICKS
                    </Link>
                </motion.div>
                <div className="flex items-center space-x-4">
                    <NavIcon
                        icon={<Search className="w-5 h-5" />}
                        label="Search"
                    />
                    <NavIcon
                        icon={<User className="w-5 h-5" />}
                        label="User account"
                    />
                    <div className="relative">
                        <NavIcon
                            icon={<ShoppingCart className="w-5 h-5" />}
                            label="Shopping cart"
                        />
                        <motion.span
                            className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                            }}
                        >
                            0
                        </motion.span>
                    </div>
                </div>
            </motion.nav>
        </motion.div>
    );
}

function NavLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
                href={href}
                className="text-sm font-medium hover:text-gray-600 transition-colors"
            >
                {children}
            </Link>
        </motion.div>
    );
}

function NavIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <motion.button
            aria-label={label}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {icon}
        </motion.button>
    );
}
