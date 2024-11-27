<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        $title = $this->faker->words(3, true);
        return [
            'title' => $title,
            'Description' => $this->faker->paragraph(),
            'Price' => $this->faker->randomFloat(2, 10, 1000),
            'Stock' => $this->faker->numberBetween(1, 100),
            'size' => $this->faker->numberBetween(36, 46),
            'Slug' => Str::slug($title),
            'image' => $this->faker->imageUrl(640, 480, 'products', true),
        ];
    }
}
