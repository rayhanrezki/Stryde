import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Category {
    id: number;
    Title: string;
    image: string;
}

const categories: Category[] = [
    {
        id: 1,
        Title: "LIFESTYLE SHOES",
        image: "/images/Categories/CATEGORY_LIFESTYLE.png",
    },
    {
        id: 2,
        Title: "BASKETBALL SHOES",
        image: "/images/Categories/CATEGORY_BASKETBALL.png",
    },
    {
        id: 3,
        Title: "SOCCER SHOES",
        image: "/images/soccer.webp",
    },
];

const Categories = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2;
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
        <section className="pt-4 bg-[#1E1E1E]">
            <div>
                <div className="w-full">
                    <div className="px-4 mx-auto">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-white text-6xl font-bold tracking-tight">
                                    CATEGORIES
                                </h1>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handlePrev}
                                        className="bg-[#e7e7e3] p-2 rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        <ArrowLeft
                                            size={24}
                                            className="text-black"
                                        />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="bg-[#e7e7e3] p-2 rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        <ArrowRight
                                            size={24}
                                            className="text-black"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-0">
                                {currentCategories.map((category, index) => (
                                    <div
                                        key={category.id}
                                        className={`relative group cursor-pointer bg-white overflow-hidden ${
                                            index === 0
                                                ? "rounded-tl-[48px]"
                                                : ""
                                        }`}
                                    >
                                        <div className="absolute top-8 left-8 right-8 z-10 flex justify-between items-center">
                                            <h2 className="text-black text-2xl font-bold font-rubik">
                                                {category.Title}
                                            </h2>
                                            <div className="bg-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowRight
                                                    size={24}
                                                    className="text-white"
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;
