interface OrderSummaryProps {
    summary: {
        items: number;
        itemsTotal: number;
        delivery: number;
        salesTax: number;
        total: number;
        formatPrice: (amount: number) => string;
    };
}

export function OrderSummary({ summary }: OrderSummaryProps) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm font-rubik">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Items ({summary.items})</span>
                    <span>{summary.formatPrice(summary.itemsTotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                    <span>Sales Tax</span>
                    <span>
                        {summary.salesTax
                            ? summary.formatPrice(summary.salesTax)
                            : "-"}
                    </span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{summary.formatPrice(summary.total)}</span>
                </div>
            </div>
        </div>
    );
}
