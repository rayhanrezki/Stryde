<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Menambahkan produk manual berdasarkan data referensi Nike
        Product::create([
            'category_id' => Category::where('name', 'Men Shoes')->first()->id,
            'title' => 'Nike Air Zoom Pegasus 39',
            'Description' => 'The Nike Air Zoom Pegasus 39 brings the lightweight comfort you expect with a fresh design that lets you express your personal style.',
            'Price' => 120.00,
            'Slug' => 'nike-air-zoom-pegasus-39',
            'image' => 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f_9ae7a52f-9eb6-4c44-91ed-3b0bfa67409f/air-zoom-pegasus-39-mens-road-running-shoes-PbshxJ.png',
        ]);

        Product::create([
            'category_id' => Category::where('name', 'Women Shoes')->first()->id,
            'title' => 'Nike Air Force 1',
            'Description' => 'A classic since 1982, the Nike Air Force 1 is known for its iconic design and comfortable feel, perfect for casual and sporty looks.',
            'Price' => 90.00,
            'Slug' => 'nike-air-force-1',
            'image' => 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0bdbf524-fd6f-44ae-91be-b7e81be9ad6f/air-force-1-07-mens-shoes-cR7ZRp.png',
        ]);

        Product::create([
            'category_id' => Category::where('name', 'Men Shoes')->first()->id,
            'title' => 'Nike Dri-FIT Tee',
            'Description' => 'Stay dry and comfortable with the Nike Dri-FIT Tee, perfect for running, training, or just lounging.',
            'Price' => 25.00,
            'Slug' => 'nike-dri-fit-tee',
            'image' => 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ae8d7f9a-7c1c-40f7-b4f8-6995f4c56a4a/dri-fit-mens-short-sleeve-training-top-lrqF9C.png',
        ]);
    }
}
