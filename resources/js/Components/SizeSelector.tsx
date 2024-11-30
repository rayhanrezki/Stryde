interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string | null;
    onChange: (size: string) => void;
}

export function SizeSelector({
    sizes,
    selectedSize,
    onChange,
}: SizeSelectorProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium">SIZE</span>
                <p className="text-sm text-gray-600">SIZE CHART</p>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => onChange(size)}
                        className={`py-2 border rounded text-sm ${
                            selectedSize === size
                                ? "border-black bg-black text-white"
                                : "border-gray-200 hover:border-black"
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
}
