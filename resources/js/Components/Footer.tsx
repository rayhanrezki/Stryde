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
        <footer className="bg-[#1a1a1a] text-white w-[90%] mx-auto rounded-3xl overflow-hidden mb-8">
            {/* Newsletter Signup Section */}
            <div className="bg-[#4169E1] p-8 relative">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold font-rubik mb-2">
                            JOIN OUR STRYDE!
                        </h2>
                        <h3 className="text-3xl font-bold font-rubik mb-4">
                            CLUB & GET NOTIFIED FOR NEW PRODUCTS
                        </h3>
                        <p className="mb-4 font-open-sans">
                            Sign up for free! Join the community.
                        </p>
                        <div className="flex gap-4">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-grow p-3 rounded bg-[#5479E8] text-white placeholder-white/70"
                            />
                            <button className="px-6 py-3 bg-black text-white rounded hover:bg-black/90">
                                SUBMIT
                            </button>
                        </div>
                    </div>
                    <div className="text-6xl font-bold font-rubik">
                        STRYDE
                        <sup className="text-orange-500 text-2xl">®</sup>
                    </div>
                </div>
            </div>

            {/* Main Footer Content with background */}
            <div className="relative">
                <div className="absolute bottom-0 w-full text-[20rem] font-bold font-rubik text-white/5 leading-none">
                    STRYDE
                </div>
                <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                    {/* About Us */}
                    <div>
                        <h4 className="text-[#FFA500] font-bold mb-4">
                            About us
                        </h4>
                        <p className="text-gray-300 font-rubik">
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
                        <ul className="space-y-2">
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

                    {/* Company */}
                    {/* <div>
                        <h4 className="text-[#FFA500] font-bold mb-4">
                            Company
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Blogs
                                </a>
                            </li>
                        </ul>
                    </div> */}

                    {/* Follow Us */}
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

            {/* Copyright */}
            <div className="border-t border-gray-800 p-4 text-center text-sm text-gray-400">
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
