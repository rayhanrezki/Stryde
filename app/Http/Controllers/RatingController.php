<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class RatingController extends Controller
{

    public function index(): JsonResponse
    {
        $ratings = Rating::with(['product', 'user'])->get();

        return response()->json([
            'data' => $ratings
        ]);
    }
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        // Membuat Rating baru
        try {
            $rating = Rating::create([
                'user_id' => Auth::id(), // Menggunakan Auth::id() untuk mendapatkan ID pengguna yang terautentikasi
                'product_id' => $request->product_id,
                'rating' => $request->rating,
                'review' => $request->review,
            ]);

            // Mengembalikan respon dengan status 201 Created
            return response()->json([
                'message' => 'Rating submitted successfully.',
                'rating' => $rating, // Mengembalikan rating yang baru saja dibuat
            ], 201);

        } catch (\Exception $e) {
            // Menangani error jika ada masalah saat membuat rating
            return response()->json([
                'message' => 'Failed to submit rating.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

     // Method untuk mendapatkan rating berdasarkan product_id
     public function getRatingsByProduct($productId)
     {
         // Ambil semua rating untuk produk tersebut
         $ratings = Rating::where('product_id', $productId)->get();
         
         // Jika ada rating, hitung rata-rata dan kembalikan rating
         $averageRating = $ratings->avg('rating');
         return response()->json([
             'average_rating' => $averageRating,
             'ratings' => $ratings,
         ]);
     }
}
