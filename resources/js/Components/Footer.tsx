import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Twitter } from "lucide-react";
import { Link } from "@inertiajs/react";

interface Category {
    id: number;
    Title: string;
    image: string;
    filterName: string;
}

const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white w-[90%] mx-auto rounded-3xl overflow-hidden mb-8 mt-12">
            {/* Newsletter Signup Section */}
            <div className="bg-[#4169E1] p-4 md:p-8 relative">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="w-full md:w-auto">
                        <h2 className="text-xl md:text-3xl font-bold font-rubik mb-2 text-center md:text-left">
                            STEP INTO YOUR STYLE!
                        </h2>
                        <h3 className="text-lg md:text-xl font-bold font-rubik mb-4 text-center md:text-left">
                            DISCOVER YOUR CHARACTER WITH STRYDE
                        </h3>
                        <p className="mb-4 font-open-sans text-center md:text-left">
                            Premium Quality, Unmatched Style
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/products"
                                className="px-6 py-3 bg-black text-white rounded hover:bg-black/90 text-center transition-colors"
                            >
                                EXPLORE COLLECTION
                            </Link>
                        </div>
                    </div>
                    <div className="text-4xl md:text-6xl font-bold font-rubik mt-4 md:mt-0">
                        STRYDE
                        <sup className="text-orange-500 text-xl md:text-2xl">
                            ®
                        </sup>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative">
                <div className="absolute bottom-0 w-full text-[8rem] md:text-[20rem] font-bold font-rubik text-white/5 leading-none select-none pointer-events-none">
                    STRYDE
                </div>
                <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
                    {/* About Us */}
                    <div>
                        <h4 className="text-[#FFA500] font-bold mb-4">
                            About us
                        </h4>
                        <p className="text-gray-300 font-rubik text-sm md:text-base">
                            We are the ultimate destination for sneaker
                            enthusiasts. Stryde delivers exclusive collections
                            and the latest trends to keep you a step ahead.
                        </p>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-[#FFA500] font-bold font-rubik mb-4">
                            Categories
                        </h4>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li>
                                <Link
                                    href="/products?category=basketball"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Basketball
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products?category=lifestyle"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Lifestyle
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company & Follow Us Combined for Mobile */}
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[#FFA500] font-bold font-rubik mb-4">
                                Company
                            </h4>
                            <ul className="space-y-2 text-sm md:text-base">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blogs"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        Blogs
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[#FFA500] font-bold mb-4">
                                Follow us
                            </h4>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 p-4 text-center text-xs md:text-sm text-gray-400">
                © All rights reserved | Made with{" "}
                <span className="text-red-500">❤</span> by{" "}
                <a href="#" className="text-[#4169E1] hover:underline">
                    BY.U Tech
                </a>
            </div>
        </footer>
    );
};

export default Footer;
