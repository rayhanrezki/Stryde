import { motion } from "framer-motion";
import "@fontsource/rubik/600.css";
import "@fontsource-variable/open-sans";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

export default function Hero() {
    return (
        <section className="relative bg-[#e7e7e3] py-8 sm:py-16 w-screen">
            <div className="container mx-auto my-4 sm:my-10 px-4">
                <motion.h1
                    className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-8 text-center font-rubik"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    BOLD STEPS{" "}
                    <span className="text-[#6096B0]">START HERE.</span>
                </motion.h1>
                <motion.div
                    className="bg-[#F3A261] rounded-[32px] overflow-hidden shadow-xl relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="relative aspect-[16/9]">
                        <div className="absolute top-8 sm:top-10 left-0 bg-[#232321] text-white py-3 sm:py-6 px-1 sm:px-4 text-xs sm:text-lg z-10 [writing-mode:vertical-lr] rotate-180 rounded-l-md font-rubik">
                            Nike product of the year
                        </div>
                        <img
                            src="/images/NIKE_AIR_MAX.png"
                            alt="Nike Air Max"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 text-white font-rubik">
                                        NIKE AIR FORCE X CARHARTT WIP
                                    </h2>
                                    <p className="text-xs sm:text-sm mb-4 text-white/90 font-open-sans font-semibold max-w-[280px] sm:max-w-none">
                                        Nike introducing the new air max for
                                        everyone's comfort
                                    </p>
                                    <Link href="/products/nike-air-force-x-carhartt-wip">
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white py-1 sm:py-2 px-4 sm:px-6 rounded-md text-xs sm:text-sm">
                                            SHOP NOW
                                        </Button>
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {[1, 2].map((index) => (
                                        <div
                                            key={index}
                                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 border-white/20 hidden sm:block"
                                        >
                                            <img
                                                src="/images/NIKE_AIR_MAX.png"
                                                alt={`Nike Air Max Thumbnail ${index}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
