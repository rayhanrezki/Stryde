"use client";

import { useState, useEffect } from "react";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-50 px-1 sm:px-4 py-1 sm:py-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.nav
                className={`flex items-center justify-between p-1 sm:p-4 bg-white rounded-full shadow-lg max-w-7xl mx-auto transition-all duration-300 ease-in-out ${
                    isScrolled ? "py-1 sm:py-2" : "py-1 sm:py-4"
                }`}
                layout
            >
                {/* Mobile Menu Button */}
                <motion.button
                    className="lg:hidden p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                        <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                </motion.button>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-6 font-rubik">
                    <NavLink href="/new-drops">New Drops</NavLink>
                    <NavLink href="/men">Men</NavLink>
                    <NavLink href="/women">Women</NavLink>
                </div>

                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mx-2"
                >
                    <Link href="/" className="text-base sm:text-2xl font-bold">
                        KICKS
                    </Link>
                </motion.div>

                {/* Desktop Icons */}
                <div className="hidden lg:flex items-center space-x-4">
                    <NavIcon
                        icon={<Search className="w-5 h-5" />}
                        label="Search"
                    />
                    <NavIcon
                        icon={<User className="w-5 h-5" />}
                        label="User account"
                        href="/login"
                    />
                    <div className="relative">
                        <NavIcon
                            icon={<ShoppingCart className="w-5 h-5" />}
                            label="Shopping cart"
                        />
                        <CartBadge />
                    </div>
                </div>

                {/* Mobile User and Cart Icons */}
                <div className="lg:hidden flex items-center space-x-0.5 sm:space-x-2">
                    <NavIcon
                        icon={<User className="w-4 h-4 sm:w-5 sm:h-5" />}
                        label="User account"
                        href="/login"
                    />
                    <div className="relative">
                        <NavIcon
                            icon={
                                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                            }
                            label="Shopping cart"
                        />
                        <CartBadge />
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden bg-white mt-1 sm:mt-2 rounded-2xl shadow-lg overflow-hidden mx-2"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.1 }}
                            className="p-3 sm:p-4 space-y-2 sm:space-y-4"
                        >
                            <MobileNavLink
                                href="/new-drops"
                                onClick={() => setIsOpen(false)}
                            >
                                New Drops
                            </MobileNavLink>
                            <MobileNavLink
                                href="/men"
                                onClick={() => setIsOpen(false)}
                            >
                                Men
                            </MobileNavLink>
                            <MobileNavLink
                                href="/women"
                                onClick={() => setIsOpen(false)}
                            >
                                Women
                            </MobileNavLink>
                            <div className="pt-2 sm:pt-4 border-t border-gray-100">
                                <MobileNavLink
                                    href="/search"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Search
                                </MobileNavLink>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
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

function MobileNavLink({
    href,
    onClick,
    children,
}: {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="block py-2"
        >
            <Link
                href={href}
                className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors flex items-center"
                onClick={onClick}
            >
                {children}
            </Link>
        </motion.div>
    );
}

function NavIcon({
    icon,
    label,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    href?: string;
}) {
    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
                href={href || "#"}
                className="p-0.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex items-center justify-center"
                aria-label={label}
            >
                {icon}
            </Link>
        </motion.div>
    );
}
function CartBadge() {
    return (
        <motion.span
            className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"
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
    );
}
