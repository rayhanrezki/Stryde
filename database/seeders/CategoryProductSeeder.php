<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CategoryProduct;

class CategoryProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CategoryProduct::create([
            'id' => 1,
            'product_id' => 1,
            'category_id' => 1,

        ]);
        CategoryProduct::create([
            'id' => 2,
            'product_id' => 2,
            'category_id' => 1,

        ]);
        CategoryProduct::create([
            'id' => 3,
            'product_id' => 3,
            'category_id' => 2,

        ]);
        CategoryProduct::create([
            'id' => 4,
            'product_id' => 4,
            'category_id' => 1,

        ]);
        CategoryProduct::create([
            'id' => 5,
            'product_id' => 5,
            'category_id' => 2,

        ]);
        CategoryProduct::create([
            'id' => 6,
            'product_id' => 6,
            'category_id' => 1,

        ]);
        CategoryProduct::create([
            'id' => 7,
            'product_id' => 7,
            'category_id' => 2,

        ]);
    }
}
