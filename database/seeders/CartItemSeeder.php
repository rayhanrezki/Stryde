<?php

namespace Database\Seeders;

use App\Models\CartItem;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CartItemSeeder extends Seeder
{
    public function run()
    {
        // Menambahkan cart item manual
        CartItem::create([
            'cart_id' => Cart::first()->id, // Pastikan ada cart pertama
            'product_id' => Product::where('title', 'Nike Air Force 1')->first()->id,
            'quantity' => 2,
        ]);
    }
}
