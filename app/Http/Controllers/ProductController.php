<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\SizeStock;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category', 'sizeStocks')
            ->select([
                'id',
                'title',
                'Description',
                'Price',
                'Slug',
                'image',
                'category_id',
                'created_at',
                'updated_at',
            ])
            ->latest()
            ->get();

        $availableSizes = SizeStock::distinct()
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
        $categories = Category::all(['id', 'name']); // Fetch all categories
        return Inertia::render('Products/Create', [
            'categories' => $categories,
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
            'sizes' => 'required|array',
            'sizes.*.size' => 'required|string|max:10',
            'sizes.*.stock' => 'required|integer|min:0',
        ]);

        $product = Product::create([
            'title' => $validatedData['title'],
            'Description' => $validatedData['Description'],
            'Price' => $validatedData['Price'],
            'Slug' => $validatedData['Slug'],
            'image' => $validatedData['image'],
            'category_id' => $validatedData['category_id'],
        ]);

        foreach ($validatedData['sizes'] as $size) {
            SizeStock::create([
                'product_id' => $product->id,
                'size' => $size['size'],
                'stock' => $size['stock'],
            ]);
        }

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $product = Product::with('category', 'sizeStocks')
            ->where('Slug', $slug)
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
        $categories = Category::all(['id', 'name']);
        $product->load('sizeStocks');

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories,
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
            'category_id' => 'required|exists:categories,id',
            'sizes' => 'required|array',
            'sizes.*.size' => 'required|string|max:10',
            'sizes.*.stock' => 'required|integer|min:0',
        ]);

        $product->update([
            'title' => $validatedData['title'],
            'Description' => $validatedData['Description'],
            'Price' => $validatedData['Price'],
            'Slug' => $validatedData['Slug'],
            'image' => $validatedData['image'],
            'category_id' => $validatedData['category_id'],
        ]);

        $product->sizeStocks()->delete();
        foreach ($validatedData['sizes'] as $size) {
            SizeStock::create([
                'product_id' => $product->id,
                'size' => $size['size'],
                'stock' => $size['stock'],
            ]);
        }

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->sizeStocks()->delete();
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully.');
    }


    public function dashboard()
    {
        $products = Product::with('category', 'sizeStocks')
            ->select([
                'id',
                'title',
                'Description',
                'Price',
                'Slug',
                'image',
                'category_id',
                'created_at',
                'updated_at',
            ])
            ->latest()
            ->paginate(12);

        // Format ukuran dan stok untuk setiap produk
        $products->getCollection()->transform(function ($product) {
            $product->sizes = $product->sizeStocks->map(function ($sizeStock) {
                return [
                    'size' => $sizeStock->size,
                    'stock' => $sizeStock->stock,
                ];
            });
            unset($product->sizeStocks); // Opsional, hapus sizeStocks jika tidak dibutuhkan
            return $product;
        });

        return Inertia::render('ProductDashboard', [
            'products' => $products,
            'totalProducts' => Product::count(),
        ]);
    }
}
