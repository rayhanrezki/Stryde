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
            'title' => $this->faker->word,
            'Description' => $this->faker->paragraph,
            'Price' => $this->faker->randomFloat(2, 10, 1000),
            'Stock' => $this->faker->numberBetween(1, 100),
            'size' => $this->faker->numberBetween(1, 10),
            'Slug' => $this->faker->slug,
            'image' => $this->faker->imageUrl(),
        ];
    }
}
