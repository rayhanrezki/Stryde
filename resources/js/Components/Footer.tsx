"use client";

import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <motion.footer
            className="bg-gray-100 py-6 sm:py-10 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-300 pb-6 mb-6">
                    {/* Logo and Description */}
                    <motion.div
                        className="text-center sm:text-left mb-4 sm:mb-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/"
                            className="text-2xl sm:text-3xl font-bold font-rubik text-gray-800"
                        >
                            Stryde.
                        </Link>
                        <p className="text-sm text-gray-600 mt-2">
                            Your go-to destination for the latest fashion drops and trends.
                        </p>
                    </motion.div>

                    {/* Social Media Links */}
                    <div className="flex items-center space-x-4">
                        <SocialIcon href="#" icon={<Facebook className="w-5 h-5" />} />
                        <SocialIcon href="#" icon={<Instagram className="w-5 h-5" />} />
                        <SocialIcon href="#" icon={<Twitter className="w-5 h-5" />} />
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center sm:text-left">
                    {/* Quick Links */}
                    <FooterColumn title="Quick Links">
                        <FooterLink href="/products">Products</FooterLink>
                        <FooterLink href="/about">About Us</FooterLink>
                        <FooterLink href="/contact">Contact</FooterLink>
                    </FooterColumn>

                    {/* Customer Service */}
                    <FooterColumn title="Customer Service">
                        <FooterLink href="/help">Help Center</FooterLink>
                        <FooterLink href="/shipping">Shipping Info</FooterLink>
                        <FooterLink href="/returns">Returns</FooterLink>
                    </FooterColumn>

                    {/* Company */}
                    <FooterColumn title="Company">
                        <FooterLink href="/careers">Careers</FooterLink>
                        <FooterLink href="/press">Press</FooterLink>
                        <FooterLink href="/terms">Terms of Service</FooterLink>
                    </FooterColumn>
                </div>

                {/* Footer Bottom */}
                <div className="text-center text-sm text-gray-500 mt-8">
                    &copy; {new Date().getFullYear()} Stryde. All rights reserved.
                </div>
            </div>
        </motion.footer>
    );
}

function FooterColumn({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">{title}</h4>
            <div className="space-y-2">{children}</div>
        </div>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
            <Link
                href={href}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
                {children}
            </Link>
        </motion.div>
    );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {icon}
        </motion.a>
    );
}
