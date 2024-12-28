<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductSize;
use Illuminate\Database\Seeder;

class ProductSizeSeeder extends Seeder
{
    public function run()
    {


        ProductSize::create([
            'id' => 1,
            'product_id' => 1,
            'size' => '40',
            'stock' => 50,
        ]);

        ProductSize::create([
            'id' => 2,
            'product_id' => 1,
            'size' => '41',
            'stock' => 30,
        ]);

        ProductSize::create([
            'id' => 3,
            'product_id' => 1,
            'size' => '42',
            'stock' => 30,
        ]);


        ProductSize::create([
            'id' => 4,
            'product_id' => 2,
            'size' => '45',
            'stock' => 50,
        ]);

        ProductSize::create([
            'id' => 5,
            'product_id' => 2,
            'size' => '41',
            'stock' => 30,
        ]);

        ProductSize::create([
            'id' => 6,
            'product_id' => 2,
            'size' => '47',
            'stock' => 30,
        ]);

        ProductSize::create([
            'id' => 7,
            'product_id' => 3,
            'size' => '40',
            'stock' => 50,
        ]);

        ProductSize::create([
            'id' => 8,
            'product_id' => 3,
            'size' => '41',
            'stock' => 30,
        ]);

        ProductSize::create([
            'id' => 9,
            'product_id' => 3,
            'size' => '48',
            'stock' => 30,
        ]);

        ProductSize::create([
            'id' => 10,
            'product_id' => 4,
            'size' => '40',
            'stock' => 50,
        ]);

        ProductSize::create([
            'id' => 11,
            'product_id' => 4,
            'size' => '46',
            'stock' => 30,
        ]);

        ProductSize::create([
            'id' => 12,
            'product_id' => 4,
            'size' => '42',
            'stock' => 30,
        ]);

        ProductSize::create([
            'id' => 13,
            'product_id' => 5,
            'size' => '40',
            'stock' => 50,
        ]);

        ProductSize::create([
            'id' => 14,
            'product_id' => 5,
            'size' => '39',
            'stock' => 30,
        ]);

        ProductSize::create([
            'id' => 15,
            'product_id' => 5,
            'size' => '42',
            'stock' => 30,
        ]);
        ProductSize::create([
            'id' => 16,
            'product_id' => 6,
            'size' => '40',
            'stock' => 50,
        ]);

        ProductSize::create([
            'id' => 17,
            'product_id' => 6,
            'size' => '41',
            'stock' => 30,
        ]);

        ProductSize::create([
            'id' => 18,
            'product_id' => 6,
            'size' => '42',
            'stock' => 30,
        ]);
        ProductSize::create([
            'id' => 19,
            'product_id' => 7,
            'size' => '44',
            'stock' => 50,
        ]);

        ProductSize::create([
            'id' => 20,
            'product_id' => 7,
            'size' => '41',
            'stock' => 30,
        ]);

        ProductSize::create([
            'id' => 21,
            'product_id' => 7,
            'size' => '42',
            'stock' => 30,
        ]);
        ProductSize::create([
            'id' => 21,
            'product_id' => 7,
            'size' => '42',
            'stock' => 30,
        ]);
    }
}
