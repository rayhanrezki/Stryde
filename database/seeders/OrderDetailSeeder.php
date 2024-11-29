<?php

namespace Database\Seeders;

use App\Models\OrderDetail;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Seeder;

class OrderDetailSeeder extends Seeder
{
    public function run()
    {
        OrderDetail::create([
            'order_id' => Order::first()->id,
            'product_id' => Product::where('title', 'Nike Air Zoom Pegasus 39')->first()->id,
            'quantity' => 1,
            'price' => 120.00,
        ]);
    }
}
