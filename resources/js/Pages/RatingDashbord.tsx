import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rating, Product } from "./types";

const RatingDashboard: React.FC = () => {
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [newRating, setNewRating] = useState({
        product_id: "",
        rating: 0,
        review: "",
    });

    // Ambil data produk dan rating saat komponen dimuat
    useEffect(() => {
        axios.get("/api/ratings").then((response) => setRatings(response.data.data));
        axios.get("/api/products").then((response) => setProducts(response.data));
    }, []);

    // Menangani perubahan pada form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setNewRating({ ...newRating, [e.target.name]: e.target.value });
    };

    // Submit rating baru
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios.post("/api/ratings", newRating)
            .then((response) => {
                setRatings([...ratings, response.data.data]);
                setNewRating({ product_id: "", rating: 0, review: "" });
                alert("Rating berhasil ditambahkan!");
            })
            .catch((error) => {
                console.error("Error submitting rating:", error.response.data);
                alert("Gagal menambahkan rating.");
            });
    };

    return (
        <div className="container">
            <h1>Rating Dashboard</h1>

            {/* Form Tambah Rating */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product:</label>
                    <select name="product_id" value={newRating.product_id} onChange={handleChange} required>
                        <option value="">-- Select Product --</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Rating (1-5):</label>
                    <input
                        type="number"
                        name="rating"
                        min="1"
                        max="5"
                        value={newRating.rating}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Review:</label>
                    <textarea name="review" value={newRating.review} onChange={handleChange} />
                </div>

                <button type="submit">Add Rating</button>
            </form>

            {/* Tabel Data Rating */}
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>User</th>
                        <th>Rating</th>
                        <th>Review</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {ratings.map((rating) => (
                        <tr key={rating.id}>
                            <td>{rating.id}</td>
                            <td>{rating.product_id}</td>
                            <td>{rating.user_id}</td>
                            <td>{rating.rating}</td>
                            <td>{rating.review}</td>
                            <td>{rating.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RatingDashboard;
