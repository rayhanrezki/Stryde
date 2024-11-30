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
        return Inertia::render('Products/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'Description' => 'nullable|string',
            'Price' => 'required|numeric|min:0',
            'Stock' => 'required|integer|min:0',
            'size' => 'required|integer|min:0',
            'Slug' => 'required|unique:products,Slug',
            'image' => 'required|string|max:255',
        ]);

        Product::create($validatedData);

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully.');
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
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'Description' => 'nullable|string',
            'Price' => 'required|numeric|min:0',
            'Stock' => 'required|integer|min:0',
            'size' => 'required|integer|min:0',
            'Slug' => 'required|unique:products,Slug,' . $product->id,
            'image' => 'required|string|max:255',
        ]);

        $product->update($validatedData);

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function dashboard()
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
            ->paginate(12);

        return Inertia::render('ProductDashboard', [
            'products' => $products,
            'totalProducts' => Product::count(),
        ]);
    }
}
