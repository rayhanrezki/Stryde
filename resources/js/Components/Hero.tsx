import { motion } from "framer-motion";
import "@fontsource/rubik/600.css";

export default function Hero() {
    return (
        <section className="relative bg-[#e7e7e3] py-16 font-rubik ">
            <div className="container mx-auto my-10 px-4">
                <motion.h1
                    className="text-7xl font-bold mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    BOLD STEPS{" "}
                    <span className="text-[#6096B0]">START HERE.</span>
                </motion.h1>
                <motion.div
                    className="bg-orange-500 rounded-3xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="relative aspect-[16/9] md:aspect-[21/9]">
                        <img
                            src="/images/nike-air-max.jpg"
                            alt="Nike Air Max"
                            className="w-full h-full object-cover rounded-t-3xl"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-8">
                            <h2 className="text-white text-4xl font-bold mb-2">
                                NIKE AIR MAX
                            </h2>
                            <p className="text-white mb-4">
                                Nike introducing the new air max for everyone's
                                comfort
                            </p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32">
                                Shop Now
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end p-4 space-x-4">
                        <img
                            src="/images/thumbnail-1.jpg"
                            alt="Thumbnail 1"
                            className="w-20 h-20 rounded-lg"
                        />
                        <img
                            src="/images/thumbnail-2.jpg"
                            alt="Thumbnail 2"
                            className="w-20 h-20 rounded-lg"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
