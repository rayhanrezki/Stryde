<?php

use App\Models\ProductSize;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductSizeFactory extends Factory
{
    protected $model = ProductSize::class;

    public function definition()
    {
        return [
            'product_id' => Product::factory(), // Menggunakan factory produk untuk ID produk
            'size' => $this->faker->randomElement(['S', 'M', 'L', 'XL']),
            'stock' => $this->faker->numberBetween(1, 100),
        ];
    }
}
