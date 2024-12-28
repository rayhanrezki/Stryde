import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

interface Category {
    id: number;
    Title: string;
    image: string;
    filterName: string;
}

const categories: Category[] = [
    {
        id: 1,
        Title: "LIFESTYLE SHOES",
        image: "/images/Categories/CATEGORY_LIFESTYLE.png",
        filterName: "lifestyle",
    },
    {
        id: 2,
        Title: "BASKETBALL SHOES",
        image: "/images/Categories/CATEGORY_BASKETBALL.png",
        filterName: "basketball",
    },
];

const Categories = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const totalPages = Math.ceil(categories.length / itemsPerPage);

    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const currentCategories = categories.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <section className="pt-4 md:pt-8 lg:pt-12 bg-[#1E1E1E]">
            <div className="px-4 mx-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-4">
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            CATEGORIES
                        </h1>
                        <div className="flex gap-2">
                            <button
                                onClick={handlePrev}
                                className="bg-[#e7e7e3] p-1.5 sm:p-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                <ArrowLeft
                                    size={20}
                                    className="text-black sm:w-6 sm:h-6"
                                />
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-[#e7e7e3] p-1.5 sm:p-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                <ArrowRight
                                    size={20}
                                    className="text-black sm:w-6 sm:h-6"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0">
                        {currentCategories.map((category, index) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.filterName}`}
                                className={`relative group cursor-pointer bg-white overflow-hidden ${
                                    index === 0 ? "sm:rounded-tl-[48px]" : ""
                                }`}
                            >
                                <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 z-10 flex justify-between items-center">
                                    <h2 className="text-black text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-rubik">
                                        {category.Title}
                                    </h2>
                                    <div className="bg-black rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight
                                            size={16}
                                            className="text-white sm:w-6 sm:h-6"
                                        />
                                    </div>
                                </div>
                                <div className="aspect-[4/3]">
                                    <img
                                        src={category.image}
                                        alt={category.Title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;
