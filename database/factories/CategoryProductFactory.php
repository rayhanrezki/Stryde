<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryProductFactory extends Factory
{
    public function definition()
    {
        // Mengambil kategori dan produk secara acak
        $category = Category::inRandomOrder()->first();
        $product = Product::inRandomOrder()->first();

        return [
            'category_id' => $category->id,
            'product_id' => $product->id,
        ];
    }
}
