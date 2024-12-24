<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $cartItems = $user ? CartItem::where('cart_id', $user->id)->get() : [];



        return Inertia::render('Checkout', [
            'auth' => ['user' => $user],
            'cartItems' => $cartItems,
        ]);
    }
}
