<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MainController extends Controller
{
    public function index()
    {
        $latestProducts = Product::latest()
            ->take(4)
            ->get();

        return Inertia::render('Main', [
            'latestProducts' => $latestProducts,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
