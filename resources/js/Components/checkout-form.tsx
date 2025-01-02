import { useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    StandaloneSearchBox,
} from "@react-google-maps/api";
import { useRef } from "react";

interface CheckoutFormProps {
    isProcessing: boolean;
    setIsProcessing: (isProcessing: boolean) => void;
    formData: {
        email: string;
        firstName: string;
        lastName: string;
        address: string;
        phone: string;
        deliveryOption: string;
        sameAsBilling: boolean;
        isOver13: boolean;
    };
    setFormData: (formData: any) => void;
    handlePayment: () => Promise<void>;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLEMAPS_API_KEY;

export function CheckoutForm({
    isProcessing,
    setIsProcessing,
    formData,
    setFormData,
    handlePayment,
}: CheckoutFormProps) {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handlePayment();
    };
    const user = usePage().props.auth.user;

    const { data } = useForm({
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
    });

    const inputref = useRef<any>(null);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: GOOGLE_MAPS_API_KEY || "",
        libraries: ["places"],
    });

    const [mapError, setMapError] = useState<string | null>(null);

    useEffect(() => {
        if (!GOOGLE_MAPS_API_KEY) {
            setMapError("Google Maps API key is not configured");
            console.error("Google Maps API key is missing");
        }
    }, []);

    const handleOnPlacesChanged = () => {
        const places = inputref.current!.getPlaces();
        if (places && places.length > 0) {
            const place = places[0];
            const formattedAddress = place.formatted_address;
            setFormData({
                ...formData,
                address: formattedAddress,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 font-rubik">
            {/* Form fields */}
            <div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Contact Details</h2>
                    <p className="text-gray-600">
                        We will use these details to keep you informed about
                        your delivery.
                    </p>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 bg-[#e7e7e3] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500 font-rubik"
                        value={data.email}
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

                {isLoaded && !mapError ? (
                    <StandaloneSearchBox
                        onLoad={(ref) => (inputref.current = ref)}
                        onPlacesChanged={handleOnPlacesChanged}
                    >
                        <div>
                            <input
                                type="text"
                                placeholder="Find Delivery Address*"
                                className="w-full p-3 bg-[#e7e7e3] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500 mt-4 font-rubik"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        address: e.target.value,
                                    })
                                }
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Start typing your street address or zip code for
                                suggestion
                            </p>
                        </div>
                    </StandaloneSearchBox>
                ) : (
                    <input
                        type="text"
                        placeholder="Delivery Address*"
                        className="w-full p-3 bg-[#e7e7e3] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500 mt-4 font-rubik"
                        value={formData.address}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: e.target.value,
                            })
                        }
                    />
                )}

                <input
                    type="tel"
                    placeholder="Phone Number*"
                    className="w-full p-3 bg-[#e7e7e3] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-500 mt-4 font-rubik"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                    }
                />
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
                    </label>
                </div>
            </div>
            <div className="space-y-4">
                <label className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 rounded accent-black text-white checked:bg-black hover:checked:bg-black focus:ring-black"
                    />
                    <span>
                        My billing and delivery information are the same{" "}
                        <span className="text-red-500">*</span>
                    </span>
                </label>
                <label className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 rounded accent-black text-white checked:bg-black hover:checked:bg-black focus:ring-black"
                    />
                    <span>
                        I'm 13+ year old <span className="text-red-500">*</span>
                    </span>
                </label>
            </div>

            <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 rounded-md font-rubik transition-colors ${
                    isProcessing
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-black hover:bg-gray-800"
                } text-white`}
            >
                {isProcessing ? "PROCESSING..." : "REVIEW AND PAY"}
            </button>
        </form>
    );
}
