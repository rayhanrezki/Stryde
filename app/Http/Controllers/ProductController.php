<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::query()
            ->select([
                'id',
                'title',
                'Description',
                'Price',
                'Stock',
                'size',
                'Slug',
                'image',
                'created_at',
                'updated_at'
            ])
            ->latest()
            ->get();

        // Get unique sizes from all products
        $availableSizes = Product::distinct()
            ->pluck('size')
            ->sort()
            ->values();

        return Inertia::render('ProductList', [
            'products' => $products,
            'totalItems' => $products->count(),
            'availableSizes' => $availableSizes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $product = Product::where('Slug', $slug)
            ->firstOrFail();

        return Inertia::render('ProductDetails', [
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
