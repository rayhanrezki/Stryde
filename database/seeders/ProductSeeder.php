<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Get the Men category ID
        $menCategory = Category::where('name', 'Men')->first();

        // Add products for men
        Product::create([
            'category_id' => $menCategory->id,
            'title' => 'Nike Air Zoom Pegasus 39',
            'Description' => 'The Nike Air Zoom Pegasus 39 brings the lightweight comfort you expect with a fresh design that lets you express your personal style.',
            'Price' => 120.00,
            'Slug' => 'nike-air-zoom-pegasus-39',
            'image' => '/images/products/nike-pegasus-39.jpg',
        ]);

        // Get the Women category ID
        $womenCategory = Category::where('name', 'Women')->first();

        // Add products for women
        Product::create([
            'category_id' => $womenCategory->id,
            'title' => 'Nike Air Zoom Pegasus 38 Women',
            'Description' => 'The Nike Air Zoom Pegasus 38 continues to put a spring in your step, using the same responsive foam as its predecessor.',
            'Price' => 110.00,
            'Slug' => 'nike-air-zoom-pegasus-38-women',
            'image' => '/images/products/nike-pegasus-38-women.jpg',
        ]);

        // Add more products as needed...
    }
}
