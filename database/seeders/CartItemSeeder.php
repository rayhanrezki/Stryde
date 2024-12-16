<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Database\Seeder;

class CartItemSeeder extends Seeder
{
    public function run()
    {
        $cart = Cart::first();
        $product = Product::where('Title', 'Nike Air Zoom Pegasus 39')->first();

        if ($cart && $product) {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => 2,
            ]);
        }

        // Add another cart item for women's product
        $womensProduct = Product::where('Title', 'Nike Air Zoom Pegasus 38 Women')->first();

        if ($cart && $womensProduct) {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $womensProduct->id,
                'quantity' => 1,
            ]);
        }
    }
}
