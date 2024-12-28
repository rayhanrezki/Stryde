import { Product, CartItem } from "@/types/product";

const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

interface OrderDetailsProps {
    products: Product[];
    cartItems: CartItem[];
}

export function OrderDetails({ products, cartItems }: OrderDetailsProps) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm mt-4 font-rubik">
            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
            {cartItems.map((cartItem) => {
                const product = products.find(
                    (p) => p.id === cartItem.product_id
                );
                if (!product) return null;

                return (
                    <div key={cartItem.id} className="flex gap-4 mb-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={
                                    product.images && product.images.length > 0
                                        ? product.images[0].image_path.startsWith(
                                              "images/"
                                          )
                                            ? `/${product.images[0].image_path}`
                                            : `/storage/${product.images[0].image_path}`
                                        : "/placeholder.jpg"
                                }
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-gray-600">
                                {product.description}
                            </p>
                            <div className="flex gap-4 mt-1">
                                <span>Size: {cartItem.size}</span>
                                <span>Quantity: {cartItem.quantity}</span>
                            </div>
                            <p className="text-blue-600 font-semibold mt-1">
                                {formatIDR(Number(product.price))}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
