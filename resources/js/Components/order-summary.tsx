interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export default function OrderSummary() {
    // This would typically come from your cart state/store
    const cartItems: CartItem[] = [
        { id: 1, name: "Sample Product", price: 29.99, quantity: 2 },
    ];

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 5.99;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-6">Order Summary</h2>

            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                            </p>
                        </div>
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>

            <div className="border-t mt-6 pt-6 space-y-4">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>${shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Tax</p>
                    <p>${tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-medium text-lg">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}
