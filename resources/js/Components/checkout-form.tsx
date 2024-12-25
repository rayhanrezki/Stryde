import { useState } from "react";

interface CheckoutFormProps {
    isProcessing: boolean;
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CheckoutForm({
    isProcessing,
    setIsProcessing,
}: CheckoutFormProps) {
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        deliveryOption: "standard",
        sameAsBilling: true,
        isOver13: false,
        newsletter: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 font-rubik">
            <div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Contact Details</h2>
                    <p className="text-gray-600">
                        We will use these details to keep you inform about your
                        delivery.
                    </p>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 bg-[#e7e7e3] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500 font-rubik"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">
                    Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="First Name*"
                        className="w-full p-3 bg-[#e7e7e3] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500 font-rubik"
                        value={formData.firstName}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                firstName: e.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Last Name*"
                        className="w-full p-3 bg-[#e7e7e3] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500 font-rubik"
                        value={formData.lastName}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                lastName: e.target.value,
                            })
                        }
                    />
                </div>
                <input
                    type="text"
                    placeholder="Find Delivery Address*"
                    className="w-full p-3 bg-[#e7e7e3] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500 mt-4 font-rubik"
                    value={formData.address}
                    onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                    }
                />
                <p className="text-sm text-gray-500 mt-1">
                    Start typing your street address or zip code for suggestion
                </p>
                <input
                    type="tel"
                    placeholder="Phone Number*"
                    className="w-full p-3 bg-[#e7e7e3] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500 mt-4 font-rubik"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                    }
                />
                <p className="text-sm text-gray-500 mt-1">
                    E.g. (123) 456-7890
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">
                    Delivery Options
                </h2>
                <div className="space-y-4">
                    <label className="block p-4 border-2 border-black rounded-2xl cursor-pointer">
                        <input
                            type="radio"
                            name="delivery"
                            value="standard"
                            checked={formData.deliveryOption === "standard"}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    deliveryOption: e.target.value,
                                })
                            }
                            className="mr-2"
                        />
                        <span className="font-medium">Standard Delivery</span>
                        <span className="float-right text-green-600">Free</span>
                        <p className="text-sm text-gray-500 mt-1">
                            Enter your address to see when you'll get your order
                        </p>
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <label className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        checked={formData.sameAsBilling}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                sameAsBilling: e.target.checked,
                            })
                        }
                        className="mt-1"
                    />
                    <span>
                        My billing and delivery information are the same
                    </span>
                </label>
                <label className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        checked={formData.isOver13}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                isOver13: e.target.checked,
                            })
                        }
                        className="mt-1"
                    />
                    <span>I'm 13+ year old</span>
                </label>
            </div>

            <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-800 transition-colors font-rubik"
            >
                REVIEW AND PAY
            </button>
        </form>
    );
}
