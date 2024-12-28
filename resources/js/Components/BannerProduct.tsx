import React from 'react';
import { CheckCircle } from 'lucide-react'; // Importing an icon from lucide-react

const BannerProduct: React.FC = () => {
    return (
        <div className="relative bg-gradient-to-r from-[#1a1a1a] to-[#4169E1] py-24 sm:py-32 mb-4">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10 flex items-center justify-between">
                {/* Left Section: Text & Decoration */}
                <div className="text-white space-y-6 max-w-md relative">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight opacity-90 transform transition-all duration-300 hover:scale-105 hover:text-orange-400">
                        Discover Our Latest Sneaker Collection
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 mb-8 opacity-80">
                        Step up your sneaker game with Stryde's exclusive selection of premium sneakers. Whether new or pre-loved, our shoes are curated for quality, comfort, and style.
                    </p>
                    <p className="text-lg sm:text-xl text-gray-300 mb-12 opacity-80">
                        Join our community and find your next perfect pair. Fashionable, comfortable, and sustainable – Stryde has it all.
                    </p>
                </div>

                {/* Right Section: Features & Icons */}
                <div className="w-1/2 flex flex-col space-y-6">
                    <h3 className="text-3xl font-bold text-white">Why Choose Stryde?</h3>
                    <ul className="text-lg text-gray-300 space-y-4">
                        <li className="flex items-center gap-2">
                            <CheckCircle className="text-[#FFA500]" />
                            High-quality materials for lasting comfort
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle className="text-[#FFA500]" />
                            Exclusive, trendy designs for all styles
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle className="text-[#FFA500]" />
                            Affordable pricing on both new & pre-loved sneakers
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle className="text-[#FFA500]" />
                            Sustainable, eco-friendly choices available
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
