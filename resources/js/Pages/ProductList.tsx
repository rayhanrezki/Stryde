import { Head, Link, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { Product, Category } from "@/types/product";
import { useState, useMemo, useEffect } from "react";
import Footer from "@/Components/Footer";
import { PageProps } from "@/types";

interface CartItem {
    sizes(arg0: string, sizes: any): unknown;
    id: number;
    product_id: number;
    product_size_id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        description: string;
        price: string;
        sizes: { id: number; size: string; stock: number }[];
        categories: { id: number; name: string }[];
        images: { id: number; image_path: string }[];
    };
    product_size: {
        id: number;
        size: string;
        stock: number;
    };
}

interface Props extends PageProps {
    products: Product[];

    cartItems: CartItem[];
}

export default function ProductList({ auth, products, cartItems }: Props) {
    const [filters, setFilters] = useState({
        size: "",
        categories: [] as number[],
        searchQuery: "",
    });
    const [sortBy, setSortBy] = useState("latest");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get("category");

        if (categoryParam) {
            const category = availableCategories.find(
                (cat: Category) =>
                    cat.name.toLowerCase() === categoryParam.toLowerCase()
            );

            if (category) {
                setFilters((prev) => ({
                    ...prev,
                    categories: [category.id],
                }));
            }
        }
    }, []);

    const availableSizes = useMemo(() => {
        return Array.from(
            new Set(
                products.flatMap((product) =>
                    product.sizes.map((size) => size.size)
                )
            )
        ).sort();
    }, [products]);

    const availableCategories = useMemo(() => {
        return Array.from(
            new Set(products.flatMap((product) => product.categories))
        ).reduce((unique: Category[], category: Category) => {
            if (!unique.some((item: Category) => item.id === category.id)) {
                unique.push(category);
            }
            return unique;
        }, [] as Category[]);
    }, [products]);

    const sortProducts = (products: Product[]) => {
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return Number(a.price) - Number(b.price);
                case "price-desc":
                    return Number(b.price) - Number(a.price);
                case "latest":
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                default:
                    return 0;
            }
        });
    };

    const filteredProducts = useMemo(() => {
        const filtered = products.filter((product) => {
            const sizeMatch =
                !filters.size ||
                product.sizes.some((s) => s.size === filters.size);
            const categoryMatch =
                filters.categories.length === 0 ||
                product.categories.some((c: Category) =>
                    filters.categories.includes(c.id)
                );
            const searchMatch =
                !filters.searchQuery ||
                product.name
                    .toLowerCase()
                    .includes(filters.searchQuery.toLowerCase());
            return sizeMatch && categoryMatch && searchMatch;
        });

        return sortProducts(filtered);
    }, [products, filters, sortBy]);

    const handleFilter = (
        type: "size" | "categories",
        value: string | number
    ) => {
        if (type === "size") {
            setFilters((prev) => ({
                ...prev,
                size: prev.size === value ? "" : (value as string),
            }));
        } else {
            const newCategories = filters.categories.includes(value as number)
                ? filters.categories.filter((id) => id !== value)
                : [...filters.categories, value as number];

            setFilters((prev) => ({
                ...prev,
                categories: newCategories,
            }));

            const category = availableCategories.find(
                (cat: Category) => cat.id === value
            );
            if (category) {
                const url = new URL(window.location.href);
                if (newCategories.includes(category.id)) {
                    url.searchParams.set(
                        "category",
                        category.name.toLowerCase()
                    );
                } else {
                    url.searchParams.delete("category");
                }
                router.get(
                    url.pathname + url.search,
                    {},
                    { preserveState: true }
                );
            }
        }
    };

    const clearFilters = (type?: "size" | "categories") => {
        if (!type) {
            setFilters({ size: "", categories: [], searchQuery: "" });
            router.get(window.location.pathname, {}, { preserveState: true });
        } else {
            setFilters((prev) => ({
                ...prev,
                [type]: type === "size" ? "" : [],
            }));
            if (type === "categories") {
                router.get(
                    window.location.pathname,
                    {},
                    { preserveState: true }
                );
            }
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({
            ...prev,
            searchQuery: e.target.value,
        }));
    };

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="min-h-screen bg-[#e7e7e3] pt-24">
            <Head title="Products" />
            <Navbar user={auth?.user} cartItems={cartItems} />

            {/* Hero Banner - Make responsive */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden bg-black text-white rounded-lg mb-8">
                    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
                        <p className="text-sm mb-2">Sneaker Of The Year</p>
                        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
                            NIKE AIR FORCE
                        </h1>
                        <p className="max-w-md text-sm sm:text-base">
                            Sneakers made with your comfort in mind so you can
                            put all of your focus into your next session
                        </p>
                    </div>
                    <img
                        src="/images/NIKE_AIR_MAX.png"
                        alt=""
                        className="absolute right-0 top-0 h-full w-1/2 object-cover object-center hidden sm:block"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold">
                            Life Style Shoes
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            {filteredProducts.length} items
                            {(filters.size ||
                                filters.categories.length > 0 ||
                                filters.searchQuery) && (
                                <span className="ml-2">
                                    {filters.size && `(Size: ${filters.size})`}
                                    {filters.categories.length > 0 &&
                                        ` (${filters.categories.length} categories selected)`}
                                    {filters.searchQuery &&
                                        ` (Search: "${filters.searchQuery}")`}
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="w-full sm:w-auto flex gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={filters.searchQuery}
                            onChange={handleSearch}
                            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            className="w-full sm:w-auto appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8"
                            value={sortBy}
                            onChange={handleSort}
                        >
                            <option value="latest">LATEST PRODUCTS</option>
                            <option value="price-desc">PRICE: HIGH TO LOW</option>
                            <option value="price-asc">PRICE: LOW TO HIGH</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full sm:w-64 flex-shrink-0">
                        <div className="mb-6 bg-white sm:bg-transparent p-4 sm:p-0 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold">SIZE</h3>
                                {filters.size && (
                                    <button
                                        onClick={() => clearFilters("size")}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Clear filter
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-6 sm:grid-cols-5 gap-2">
                                {availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() =>
                                            handleFilter("size", size)
                                        }
                                        className={`p-2 text-sm border rounded-md ${
                                            filters.size === size
                                                ? "bg-black text-white"
                                                : "hover:bg-gray-50"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white sm:bg-transparent p-4 sm:p-0 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold">CATEGORIES</h3>
                                {filters.categories.length > 0 && (
                                    <button
                                        onClick={() =>
                                            clearFilters("categories")
                                        }
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>
                            <div className="space-y-2">
                                {availableCategories.map(
                                    (category: {
                                        id: number;
                                        name: string;
                                    }) => (
                                        <label
                                            key={category.id}
                                            className="flex items-center cursor-pointer group"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={filters.categories.includes(
                                                    category.id
                                                )}
                                                onChange={() =>
                                                    handleFilter(
                                                        "categories",
                                                        category.id
                                                    )
                                                }
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                                                {category.name}
                                            </span>
                                        </label>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 mb-20">
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex flex-col h-full"
                                >
                                    {/* Card with image */}
                                    <div className="bg-[#fafafa] rounded-[20px] p-2 relative mb-2 sm:mb-4">
                                        <div className="aspect-square relative bg-neutral-50 rounded-[16px] overflow-hidden">
                                            <img
                                                src={
                                                    product.images[0]
                                                        ?.image_path
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

                                    {/* Product Info Below Card */}
                                    <div className="flex flex-col flex-1 justify-between min-h-[120px]">
                                        <div className="space-y-1 sm:space-y-2">
                                            <h3 className="font-medium text-sm sm:text-base line-clamp-2 min-h-[32px] sm:min-h-[40px]">
                                                {product.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-1 min-h-[24px]">
                                                {product.categories.map(
                                                    (category: {
                                                        id: number;
                                                        name: string;
                                                    }) => (
                                                        <span
                                                            key={category.id}
                                                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                                                        >
                                                            {category.name}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="block mt-2"
                                        >
                                            <button className="w-full bg-zinc-900 text-white h-8 sm:h-10 px-4 rounded-md hover:bg-zinc-900/90 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center">
                                                <span className="truncate">
                                                    VIEW PRODUCT - Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(product.price)}
                                                </span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
