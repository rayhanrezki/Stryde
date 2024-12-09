<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('sizeStock')
            ->select([
                'id',
                'title',
                'Description',
                'Price',
                'Slug',
                'image',
                'created_at',
                'updated_at'
            ])
            ->orderBy('created_at', 'desc')
            ->paginate(12);
        
        $totalProducts = Product::count();

        return Inertia::render('Admin/ProductDashboard', [
            'products' => $products,
            'totalProducts' => $totalProducts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::select('id', 'name', 'slug')->get()
        ]);
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
            'Slug' => 'required|unique:products,Slug',
            'image' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'size_stock' => 'required|array',
            'size_stock.*.size' => 'required|string',
            'size_stock.*.stock' => 'required|integer|min:0',
        ]);

        $product = Product::create([
            'title' => $validatedData['title'],
            'Description' => $validatedData['Description'],
            'Price' => $validatedData['Price'],
            'Slug' => $validatedData['Slug'],
            'image' => $validatedData['image'],
            'category_id' => $validatedData['category_id'],
        ]);

        $product->sizeStock()->create([
            'size_stock' => $validatedData['size_stock']
        ]);

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
        $product->load('sizeStock');
        
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => Category::select('id', 'name', 'slug')->get()
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
            'Slug' => 'required|unique:products,Slug,' . $product->id,
            'image' => 'required|string|max:255',
            'size_stock' => 'required|array',
            'size_stock.*.size' => 'required|string',
            'size_stock.*.stock' => 'required|integer|min:0',
        ]);

        $product->update([
            'title' => $validatedData['title'],
            'Description' => $validatedData['Description'],
            'Price' => $validatedData['Price'],
            'Slug' => $validatedData['Slug'],
            'image' => $validatedData['image'],
        ]);

        $product->sizeStock()->update([
            'size_stock' => $validatedData['size_stock']
        ]);

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete the size_stock records first (due to foreign key constraint)
        $product->sizeStock()->delete();
        
        // Then delete the product
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully.');
    }

    public function list()
    {
        $products = Product::with('sizeStock')
            ->select([
                'id',
                'title',
                'Description',
                'Price',
                'Slug',
                'image',
                'created_at',
                'updated_at'
            ])
            ->latest()
            ->get();

        // Get unique sizes from all products' size_stock
        $availableSizes = collect();
        foreach ($products as $product) {
            $sizes = collect($product->sizeStock->size_stock ?? [])->pluck('size');
            $availableSizes = $availableSizes->concat($sizes);
        }
        $availableSizes = $availableSizes->unique()->sort()->values();

        return Inertia::render('ProductList', [
            'products' => $products,
            'totalItems' => $products->count(),
            'availableSizes' => $availableSizes
        ]);
    }
}
