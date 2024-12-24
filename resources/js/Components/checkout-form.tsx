interface CheckoutFormProps {
    isProcessing: boolean;
    setIsProcessing: (value: boolean) => void;
}

export default function CheckoutForm({
    isProcessing,
    setIsProcessing,
}: CheckoutFormProps) {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Add your payment processing logic here

        setTimeout(() => {
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-6">Payment Information</h2>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Card Number
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="4242 4242 4242 4242"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Expiration Date
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="MM/YY"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                CVC
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="123"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isProcessing ? "Processing..." : "Complete Purchase"}
                    </button>
                </div>
            </form>
        </div>
    );
}
