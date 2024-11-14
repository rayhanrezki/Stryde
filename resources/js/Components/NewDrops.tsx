import React from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";

const products = [
    {
        id: 1,
        name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
        price: "$129",
        image: "/images/AIR-MAX-DN.png",
    },
    {
        id: 2,
        name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
        price: "$129",
        image: "/images/AIR-MAX-DN.png",
    },
    {
        id: 3,
        name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
        price: "$129",
        image: "/images/AIR-MAX-DN.png",
    },
    {
        id: 4,
        name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
        price: "$129",
        image: "/images/AIR-MAX-DN.png",
    },
];

export default function NewDrops() {
    return (
        <section className="py-16 bg-[#e7e7e3]">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <motion.h2
                        className="text-4xl font-bold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        DON'T MISS OUT NEW DROPS
                    </motion.h2>
                    <motion.button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        SHOP NEW DROPS
                    </motion.button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="bg-gray-100 rounded-xl p-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="relative aspect-square mb-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    New
                                </span>
                            </div>
                            <h3 className="text-sm font-bold mb-2">
                                {product.name}
                            </h3>
                            <div className="flex justify-between items-center">
                                <span className="font-bold">
                                    {product.price}
                                </span>
                                <Link
                                    href={`/product/${product.id}`}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    VIEW PRODUCT
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
