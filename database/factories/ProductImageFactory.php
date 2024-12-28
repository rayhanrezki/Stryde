<?php

use App\Models\ProductImage;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductImageFactory extends Factory
{
    protected $model = ProductImage::class;

    public function definition()
    {
        return [
            'product_id' => Product::factory(), // Menggunakan factory produk untuk ID produk
            'image_path' => $this->faker->imageUrl(),
        ];
    }
}
