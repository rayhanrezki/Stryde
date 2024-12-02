<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'category_id' => Category::factory(),
            'title' => fake()->word(),
            'Description' => fake()->paragraph(),
            'Price' => fake()->randomFloat(2, 10, 1000),
            'Slug' => fake()->slug(),
            'image' => fake()->imageUrl(),

        ];
    }
}
