<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run()
    {
        Category::create([
            'name' => 'Men Shoes',
            'slug' => Str::slug('Men Shoes'),
        ]);

        Category::create([
            'name' => 'Women Shoes',
            'slug' => Str::slug('Women Shoes'),

        ]);
    }
}
