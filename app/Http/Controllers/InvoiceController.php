<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        // Contoh data auth user
        $authUser = [
            'id' => 1,
            'name' => 'ray',
            'email' => 'ray@gmail.com',
            'email_verified_at' => '2023-01-01T00:00:00Z',
            'is_admin' => false,
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
                'price' => '150000',
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
            'auth' => ['user' => $authUser],
            'cart' => $cart,
            'products' => $products,
        ]);
    }
}
