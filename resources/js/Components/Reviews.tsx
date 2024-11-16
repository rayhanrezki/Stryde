import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment:
            "These shoes are amazing! The comfort level is unmatched, and they look even better in person.",
        image: "/images/profile1.jpg",
        product: {
            name: "Nike Air Max DN",
            image: "/images/AIR-MAX-DN.png",
        },
    },
    {
        id: 2,
        name: "Michael Chen",
        rating: 5,
        comment:
            "Perfect fit and excellent quality. I've received so many compliments wearing these.",
        image: "/images/profile2.jpg",
        product: {
            name: "Nike Air Max DN",
            image: "/images/AIR-MAX-DN.png",
        },
    },
    {
        id: 3,
        name: "Emma Davis",
        rating: 5,
        comment:
            "Best purchase I've made this year! The style is perfect for both casual and athletic wear.",
        image: "/images/profile3.jpg",
        product: {
            name: "Nike Air Max DN",
            image: "/images/AIR-MAX-DN.png",
        },
    },
];

export default function Reviews() {
    return (
        <section className="w-full bg-white py-16">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 font-rubik text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    WHAT PEOPLE SAY
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            className="bg-[#e7e7e3] rounded-[32px] p-6 h-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-rubik font-bold text-lg">
                                        {review.name}
                                    </h3>
                                    <div className="flex gap-1">
                                        {[...Array(review.rating)].map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-6 font-open-sans">
                                {review.comment}
                            </p>

                            <div className="bg-white rounded-2xl p-4 flex items-center gap-4">
                                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#e7e7e3]">
                                    <img
                                        src={review.product.image}
                                        alt={review.product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="font-rubik font-medium">
                                    {review.product.name}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
