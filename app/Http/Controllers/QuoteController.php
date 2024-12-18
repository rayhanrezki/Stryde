<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class QuoteController extends Controller
{
    public function fetch()
    {
        try {
            $response = Http::withHeaders([
                'X-Api-Key' => env('NINJA_QUOTES_API_KEY')
            ])->get('https://api.api-ninjas.com/v1/quotes?category=inspirational');

            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch quote'], 500);
        }
    }
} 