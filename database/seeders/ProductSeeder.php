<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {

        Product::create([
            'id' => 1,
            'name' => 'Nike Air Force x Carhartt WIP',
            'description' => 'The Nike Air Force 1 07 Next Nature is a versatile and stylish sneaker with a streetwear-inspired design, offering a great blend of comfort and performance.',
            'price' => 1000,
            'slug' => 'nike-air-force-x-carhartt-wip',
        ]);



        Product::create([
            'id' => 2,
            'name' => 'nike air max 270',
            'description' => 'nike air max 270 is a stylish and comfortable sneaker with the latest air cushioning technology designed for all-day wear.',
            'price' => 1500,
            'slug' => 'nike-air-max-270',
        ]);

        Product::create([
            'id' => 3,
            'name' => 'Nike React Phantom Run Flyknit 2',
            'description' => 'the Nike React Phantom Run Flyknit 2 combination of plush cushioning and responsive energy return, perfect for long runs or casual wear.',
            'price' => 2000,
            'slug' => 'nike-react-phantom-run-flyknit-2',
        ]);


        Product::create([
            'id' => 4,
            'name' => 'nike air zoom pegasus easyon',
            'description' => 'the nike air zoom pegasus easyoncontinues to put a spring in your step, using the same responsive foam as its predecessor.',
            'price' => 5000,
            'slug' => 'nike-air-zoom-pegasus-easyon',
        ]);

        Product::create([
            'id' => 5,
            'name' => 'nike air force 1',
            'description' => 'The Nike Air Force 1 is a classic and iconic sneaker that offers both style and comfort, featuring a timeless design and durable build.',
            'price' => 10000,
            'slug' => 'nike-air-force-1',
        ]);

        Product::create([
            'id' => 6,
            'name' => 'nike dunk low',
            'description' => 'The Nike Dunk Low is a versatile and stylish sneaker with a streetwear-inspired design, offering a great blend of comfort and performance.',
            'price' => 150000,
            'slug' => 'nike-dunk-low',
        ]);

        Product::create([
            'name' => 7,
            'name' => 'nike air zoom pegasus 41',
            'description' => 'the nike air zoom pegasus 49 brings the lightweight comfort you expect with a fresh design that lets you express your personal style.',
            'price' => 170000,
            'slug' => 'nike-air-zoom-pegasus-39',
        ]);
    }
}
