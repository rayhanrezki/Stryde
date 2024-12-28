<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
{
    public function index()
    {
        // Contoh data auth user
        $user = Auth::user();

        // Contoh data order
        $order = [
            [
                'id' => 1,
                'order_date' => now(),
                'address' => 'Jl. Example ',
                'phone' => '08123456789',
                'products_id' => ['101'], // Assuming a single product ordered
            ],
        ];

        // Contoh data cart
        $cart = [
            'items' => [
                [
                    'id' => 1,
                    'product_id' => 101,
                    'product_size_id' => 201,
                    'quantity' => 2,
                    'size' => 'M',
                ],
            ],
        ];

        // Contoh data produk
        $products = [
            [
                'id' => 101,
                'name' => 'Product 1',
                'description' => 'Description for Product 1',
                'price' => 150000,
                'sizes' => [
                    ['id' => 201, 'size' => 'M', 'stock' => 10],
                ],
                'categories' => [
                    ['id' => 1, 'name' => 'Category 1'],
                ],
                'images' => [
                    ['id' => 301, 'image_path' => '/images/product1.jpg'],
                ],
            ],
        ];

        // Render halaman dengan data
        return Inertia::render('Invoice', [
            'auth' => $user,
            'order' => $order, // Pass the order data to the component
            'cart' => $cart,
            'products' => $products, // Pass the products data to the component
        ]);
    }
}
