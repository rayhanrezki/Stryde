<?php



namespace Database\Seeders;

use App\Models\Product;
use App\Models\SizeStock;
use Illuminate\Database\Seeder;

class SizeStockSeeder extends Seeder
{
    public function run()
    {
        $products = Product::all();

        foreach ($products as $product) {
            SizeStock::create([
                'product_id' => $product->id,
                'size_stock' => json_encode([
                    ['size' => '44', 'stock' => 1],
                    ['size' => '45', 'stock' => 12],
                    ['size' => '46', 'stock' => 37],
                    ['size' => '47', 'stock' => 33],
                ]),
            ]);
        }
    }
}
