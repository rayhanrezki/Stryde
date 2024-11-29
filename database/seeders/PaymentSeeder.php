<?php

namespace Database\Seeders;

use App\Models\Payment;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    public function run()
    {

        $payments = [
            [
                'order_id' => 1,
                'amount' => 250.00,
                'payment_method' => 'credit_card',
                'status' => 'completed',
                'created_at' => now(),
                'updated_at' => now(),
            ]

        ];


        Payment::insert($payments);
    }
}
