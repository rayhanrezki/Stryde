<?php

namespace Database\Seeders;

use App\Models\ProductImage;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductImageSeeder extends Seeder
{
    public function run()
    {
        // Mengambil semua produk yang sudah ada



        // Menambahkan 12 gambar secara manual untuk setiap produk
        ProductImage::create([
            'id' => 1,
            'product_id' => 1,
            'image_path' => 'products/7.1.png',
        ]);

        ProductImage::create([
            'id' => 2,
            'product_id' => 2,
            'image_path' => 'products/2.1.png',
        ]);
        ProductImage::create([
            'id' => 3,
            'product_id' => 2,
            'image_path' => 'products/2.2.png',
        ]);
        ProductImage::create([
            'id' => 4,
            'product_id' => 3,
            'image_path' => 'products/3.1.png',
        ]);
        ProductImage::create([
            'id' => 5,
            'product_id' => 3,
            'image_path' => 'products/3.2.png',
        ]);
        ProductImage::create([
            'id' => 6,
            'product_id' => 4,
            'image_path' => 'products/4.1.png',
        ]);
        ProductImage::create([
            'id' => 7,
            'product_id' => 4,
            'image_path' => 'products/4.2.jpeg',
        ]);
        ProductImage::create([
            'id' => 8,
            'product_id' => 5,
            'image_path' => 'products/5.1.png',
        ]);
        ProductImage::create([
            'id' => 9,
            'product_id' => 5,
            'image_path' => 'products/5.2.png',
        ]);
        ProductImage::create([
            'id' => 10,
            'product_id' => 6,
            'image_path' => 'products/6.1.png',
        ]);
        ProductImage::create([
            'id' => 11,
            'product_id' => 6,
            'image_path' => 'products/6.2.png',
        ]);
        ProductImage::create([
            'id' => 12,
            'product_id' => 7,
            'image_path' => 'products/1.1.png',
        ]);
        ProductImage::create([
            'id' => 13,
            'product_id' => 7,
            'image_path' => 'products/1.2.png',
        ]);
    }
}
