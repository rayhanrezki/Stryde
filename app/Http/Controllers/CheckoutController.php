<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;

class CheckoutController extends Controller
{
    public function index()
    {
        $cart = Auth::user()->cart;
        $products = Product::with(['images', 'sizes', 'categories'])
            ->whereIn('id', $cart->items->pluck('product_id'))
            ->get();

        return Inertia::render('Checkout', [
            'cart' => $cart,
            'products' => $products
        ]);
    }
} 