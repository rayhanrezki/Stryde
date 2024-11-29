<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run()
    {

        Order::create([
            'user_id' => User::first()->id,
            'total_price' => 150.00,
            'status' => 'completed',
        ]);
    }
}
