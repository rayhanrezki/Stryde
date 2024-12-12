import React, { useState } from 'react';
import axios from 'axios';

// Definisikan tipe untuk data rating
interface RatingFormProps {
    productId: number;
}

interface RatingResponse {
    message: string;
    rating: {
        id: number;
        product_id: number;
        user_id: number;
        rating: number;
        review: string | null;
        created_at: string;
        updated_at: string;
    };
}

const RatingForm: React.FC<RatingFormProps> = ({ productId }) => {
    const [rating, setRating] = useState<number>(1); // Default rating value
    const [review, setReview] = useState<string>(''); // Default review value
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Kirim data ke API Laravel
            const response = await axios.post<RatingResponse>('/api/ratings', {
                product_id: productId, // ID produk yang diberi rating
                rating: rating, // Nilai rating yang dipilih
                review: review, // Review yang diberikan
            });

            // Menampilkan pesan sukses
            setMessage(response.data.message);
            setRating(1); // Reset nilai rating
            setReview(''); // Reset review
        } catch (error) {
            // Tangani error jika gagal
            setError('Failed to submit rating');
        }
    };

    return (
        <div>
            <h2>Submit Your Rating</h2>

            {/* Tampilkan pesan error atau sukses */}
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        <option value={1}>1 - Very Bad</option>
                        <option value={2}>2 - Bad</option>
                        <option value={3}>3 - Okay</option>
                        <option value={4}>4 - Good</option>
                        <option value={5}>5 - Excellent</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="review">Review:</label>
                    <textarea
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review here..."
                    ></textarea>
                </div>

                <button type="submit">Submit Rating</button>
            </form>
        </div>
    );
};

export default RatingForm;
