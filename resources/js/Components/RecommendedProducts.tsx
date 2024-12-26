import { Product } from "@/types/product";
import { Link } from "@inertiajs/react";

interface Props {
    recommendedProducts: Product[];
}

export default function RecommendedProducts({ recommendedProducts }: Props) {
    return (
        <div className="bg-[#e7e7e3]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-rubik font-bold mb-6">
                    You May Also Like
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendedProducts.map((product) => (
                        <div key={product.id} className="space-y-4">
                            {/* Product Card */}
                            <div className="bg-[#fafafa] rounded-[20px] p-2 relative">
                                <div className="aspect-square relative bg-neutral-50 rounded-[16px] overflow-hidden">
                                    <img
                                        src={
                                            product.images &&
                                            product.images.length > 0 &&
                                            product.images[0].image_path
                                                ? `/storage/${product.images[0].image_path}`
                                                : "/placeholder.jpg"
                                        }
                                        alt={product.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-2">
                                <h3 className="font-semibold font-rubik text-base line-clamp-2">
                                    {product.name}
                                </h3>
                                <p className="text-blue-600 font-bold">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </p>
                                <Link
                                    href={route("products.show", product.slug)}
                                    className="block"
                                >
                                    <button className="w-full bg-zinc-900 text-white py-2.5 px-4 rounded-md hover:bg-zinc-900/90 text-sm font-medium transition-colors">
                                        VIEW PRODUCT
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
