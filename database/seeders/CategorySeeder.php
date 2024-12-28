<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create([
            'id' => 1,
            'name' => 'Men',
        ]);
        Category::create([
            'id' => 2,
            'name' => 'Women',
        ]);
    }
}
