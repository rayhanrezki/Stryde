interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string | null;
    onChange: (size: string) => void;
    stockMap: Record<string, number>;
}

export function SizeSelector({
    sizes,
    selectedSize,
    onChange,
    stockMap,
}: SizeSelectorProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Select Size
            </label>
            <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => {
                    const stock = stockMap[size] || 0;
                    const isOutOfStock = stock === 0;

                    return (
                        <button
                            key={size}
                            onClick={() => onChange(size)}
                            disabled={isOutOfStock}
                            className={`
                                py-2 px-4 rounded-md text-sm font-medium
                                ${
                                    selectedSize === size
                                        ? "bg-blue-600 text-white"
                                        : isOutOfStock
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-white text-gray-900 hover:bg-gray-100"
                                }
                                border border-gray-300
                            `}
                        >
                            {size}
                            <span className="block text-xs mt-1">
                                {stock > 0 ? `(${stock})` : "(Out of Stock)"}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
