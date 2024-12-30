import { Product } from "@/types/product";
import { Link } from "@inertiajs/react";

interface Props {
    recommendedProducts: Product[];
}

export default function RecommendedProducts({ recommendedProducts }: Props) {
    return (
        <div className="bg-[#e7e7e3]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-xl sm:text-2xl font-rubik font-bold mb-6">
                    You May Also Like
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {recommendedProducts.map((product) => (
                        <div key={product.id} className="flex flex-col h-full">
                            {/* Product Card */}
                            <div className="bg-[#fafafa] rounded-[20px] p-2 relative mb-2 sm:mb-4">
                                <div className="aspect-square relative bg-neutral-50 rounded-[16px] overflow-hidden">
                                    <img
                                        src={
                                            product.images &&
                                            product.images.length > 0
                                                ? product.images[0].image_path.startsWith(
                                                      "images/"
                                                  )
                                                    ? `/${product.images[0].image_path}`
                                                    : `/storage/${product.images[0].image_path}`
                                                : "/placeholder.jpg"
                                        }
                                        alt={product.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 justify-between min-h-[120px]">
                                <div className="space-y-1">
                                    <h3 className="font-semibold font-rubik text-sm sm:text-base line-clamp-2 min-h-[32px] sm:min-h-[40px]">
                                        {product.name}
                                    </h3>
                                    <p className="text-blue-600 font-bold text-sm sm:text-base">
                                        Rp{" "}
                                        {new Intl.NumberFormat("id-ID").format(
                                            product.price
                                        )}
                                    </p>
                                </div>
                                <Link
                                    href={route("products.show", product.slug)}
                                    className="block mt-2"
                                >
                                    <button className="w-full bg-zinc-900 text-white py-2 sm:py-2.5 px-4 rounded-md hover:bg-zinc-900/90 text-xs sm:text-sm font-medium transition-colors">
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
