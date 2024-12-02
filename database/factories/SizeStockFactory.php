<?php

namespace Database\Factories;

use App\Models\SizeStock;
use Illuminate\Database\Eloquent\Factories\Factory;

class SizeStockFactory extends Factory
{
    protected $model = SizeStock::class;

    public function definition()
    {
        // Menggunakan fake() untuk menghasilkan stok ukuran
        $sizes = [
            36 => fake()->numberBetween(1, 5),
            37 => fake()->numberBetween(1, 5),
            38 => fake()->numberBetween(1, 5),
            39 => fake()->numberBetween(1, 5),
            40 => fake()->numberBetween(1, 5),
            41 => fake()->numberBetween(1, 5),
            42 => fake()->numberBetween(1, 5),
            43 => fake()->numberBetween(1, 5),
        ];

        return [
            'product_id' => \App\Models\Product::factory(),
            'sizes' => $sizes,
        ];
    }
}
