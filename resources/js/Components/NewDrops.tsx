import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

interface Product {
    id: number;
    name: string;
    price: number;
    images: {
        id: number;
        image_path: string;
    }[];
    slug: string;
}

interface NewDropsProps {
    products: Product[];
}

export default function NewDrops({ products }: NewDropsProps) {
    return (
        <section className="py-16 bg-[#e7e7e3]">
            <div className="container mx-auto px-4 max-w-[1600px]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold font-rubik"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        DON'T MISS OUT NEW DROPS
                    </motion.h2>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto"
                    >
                        <Link
                            href={route("products.list")}
                            className={cn(
                                "bg-blue-600 hover:bg-blue-700 text-white font-rubik rounded-sm",
                                "text-sm md:text-base px-6 py-3 h-auto",
                                "w-full sm:w-auto inline-block text-center"
                            )}
                        >
                            SHOP NEW DROPS
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-full max-w-[400px]"
                        >
                            <div className="aspect-square relative bg-neutral-50 rounded-[32px] overflow-hidden">
                                <img
                                    src={
                                        product.images?.[0]?.image_path
                                            ? `/storage/${product.images[0].image_path}`
                                            : "/placeholder.jpg"
                                    }
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="inline-flex items-start gap-2.5 px-5 py-3 absolute top-3 left-3 bg-blue-600 rounded-[28px_0px_28px_0px]">
                                    <div className="font-rubik text-white text-sm whitespace-nowrap">
                                        New
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-3 space-y-4 mt-4">
                                <h3 className="font-medium text-base sm:text-lg lg:text-xl line-clamp-2 font-rubik">
                                    {product.name}
                                </h3>
                                <div className="w-full">
                                    <Link
                                        href={route(
                                            "products.show",
                                            product.slug
                                        )}
                                        className="block"
                                    >
                                        <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-900/90 text-lg sm:text-base lg:text-lg font-rubik py-6">
                                            VIEW PRODUCT - Rp {product.price}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
