<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder
{
    public function run()
    {
        Cart::create([
            'user_id' => User::first()->id,
            'total_price' => 500.00,
        ]);
    }
}
