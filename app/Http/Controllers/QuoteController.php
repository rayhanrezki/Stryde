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
            ])->get('https://api.api-ninjas.com/v1/quotes');

            if (!$response->successful()) {
                return response()->json([
                    ['quote' => 'Could not fetch quote', 'author' => 'System']
                ], $response->status());
            }

            $data = $response->json();
            if (empty($data)) {
                return response()->json([
                    ['quote' => 'No quotes available', 'author' => 'System']
                ]);
            }

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json([
                ['quote' => 'Error fetching quote', 'author' => 'System']
            ], 500);
        }
    }
} 