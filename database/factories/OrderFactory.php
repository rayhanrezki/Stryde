<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'total' => fake()->randomFloat(2, 50, 500),
            'status' => fake()->randomElement(['pending', 'completed', 'canceled']),

        ];
    }
}
