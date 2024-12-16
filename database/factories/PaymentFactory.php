<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition()
    {
        return [
            'order_id' => Order::factory(),
            'amount' => fake()->randomFloat(2, 50, 1000),
            'payment_method' => fake()->randomElement(['credit_card', 'bank_transfer', 'paypal']),
            'status' => fake()->randomElement(['pending', 'completed', 'failed']),


        ];
    }
}
