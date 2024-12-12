import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatingForm from './RatingForm';

// Definisikan tipe produk dan rating
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface Rating {
    rating: number;
    review: string;
    user_id: number;
}

const ProductPage: React.FC<{ productId: number }> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);

    // Ambil data produk dan rating produk
    useEffect(() => {
        // Fungsi untuk mengambil produk
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${productId}`);
                setProduct(response.data); // Menyimpan data produk ke state
            } catch (error) {
                console.error('Error fetching product', error);
            }
        };

        // Fungsi untuk mengambil rating produk
        const fetchRatings = async () => {
            try {
                const response = await axios.get(`/api/ratings/${productId}`);
                setRatings(response.data.ratings); // Menyimpan rating ke state
                setAverageRating(response.data.average_rating); // Menyimpan rating rata-rata ke state
            } catch (error) {
                console.error('Error fetching ratings', error);
            }
        };

        fetchProduct();
        fetchRatings();
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>

            {/* Tampilkan Rating Produk */}
            <div>
                <h3>Average Rating: {averageRating.toFixed(1)} / 5</h3>
                <div>
                    <h4>Reviews:</h4>
                    {ratings.length > 0 ? (
                        ratings.map((rating, index) => (
                            <div key={index}>
                                <p><strong>User {rating.user_id}:</strong> {rating.rating} / 5</p>
                                <p>{rating.review}</p>
                            </div>
                        ))
                    ) : (
                        <p>No ratings yet.</p>
                    )}
                </div>
            </div>

            {/* Form untuk Submit Rating */}
            <RatingForm productId={productId} />
        </div>
    );
};

export default ProductPage;
