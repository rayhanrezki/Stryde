import Navbar from "@/Components/Navbar";

export default function ProductList() {
    return (
        <div className="min-h-screen bg-[#e7e7e3] pt-24">
            <Navbar />
            {/* Hero Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden bg-black text-white rounded-lg mb-8">
                    <div className="container mx-auto px-6 py-16 relative z-10">
                        <p className="text-sm mb-2">Sneaker Of The Year</p>
                        <h1 className="text-5xl font-bold mb-4">Get 30% off</h1>
                        <p className="max-w-md">
                            Sneakers made with your comfort in mind so you can
                            put all of your focus into your next session.
                        </p>
                    </div>
                    <img
                        src="/images/NIKE_AIR_MAX.png"
                        alt=""
                        className="absolute right-0 top-0 h-full w-1/2 object-cover object-center"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">Life Style Shoes</h2>
                        <p className="text-gray-600">122 items</p>
                    </div>
                    <div className="relative">
                        <select
                            className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8"
                            defaultValue="trending"
                        >
                            <option value="trending">TRENDING</option>
                            <option value="newest">NEWEST</option>
                            <option value="price-asc">
                                PRICE: LOW TO HIGH
                            </option>
                            <option value="price-desc">
                                PRICE: HIGH TO LOW
                            </option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <div className="mb-6">
                            <h3 className="font-semibold mb-4">REFINE BY</h3>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">
                                    Mens
                                </button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">
                                    Casual
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-4">SIZE</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {[38, 39, 40, 41, 42, 43, 44, 45, 46, 47].map(
                                    (size) => (
                                        <button
                                            key={size}
                                            className={`p-2 text-sm border rounded-md ${
                                                size === 38
                                                    ? "bg-black text-white"
                                                    : "hover:bg-gray-50"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-4">COLOR</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {[
                                    "blue",
                                    "orange",
                                    "black",
                                    "green",
                                    "gray",
                                    "coral",
                                    "silver",
                                    "navy",
                                    "brown",
                                    "tan",
                                ].map((color) => (
                                    <button
                                        key={color}
                                        className={`w-8 h-8 rounded-md border ${
                                            color === "blue"
                                                ? "ring-2 ring-blue-500"
                                                : ""
                                        }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">TYPE</h3>
                            <div className="space-y-2">
                                {[
                                    "Casual shoes",
                                    "Runners",
                                    "Hiking",
                                    "Sneaker",
                                    "Basketball",
                                    "Golf",
                                ].map((type) => (
                                    <label
                                        key={type}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                        />
                                        <span className="text-sm">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    id: 1,
                                    name: "ULTRABOOST 1.0 MIAMI",
                                    subtitle: "Green",
                                    price: 125,
                                    image: "/shoes/ultraboost-miami.jpg",
                                    isNew: true,
                                },
                                {
                                    id: 2,
                                    name: "ADIDAS OZELIA SHOES",
                                    subtitle: "Green",
                                    price: 125,
                                    image: "/shoes/ozelia-green.jpg",
                                    isNew: true,
                                },
                                {
                                    id: 3,
                                    name: "ADIDAS 4DFWD 2 RUNNING SHOES",
                                    subtitle: "",
                                    price: 125,
                                    image: "/shoes/4dfwd-running.jpg",
                                    isNew: true,
                                },
                            ].map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-gray-50 rounded-lg p-4"
                                >
                                    {product.isNew && (
                                        <span className="inline-block bg-orange-400 text-white text-xs px-2 py-1 rounded mb-2">
                                            New
                                        </span>
                                    )}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <h3 className="font-bold mb-1">
                                        {product.name}
                                    </h3>
                                    {product.subtitle && (
                                        <p className="text-gray-600 mb-4">
                                            {product.subtitle}
                                        </p>
                                    )}
                                    <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                                        VIEW PRODUCT - ${product.price}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
