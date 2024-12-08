<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MainController extends Controller
{
    public function index()
    {
        $latestProducts = Product::latest()
            ->take(4)
            ->get();

        return Inertia::render('Main', [
            'latestProducts' => $latestProducts
        ]);
    }
} 