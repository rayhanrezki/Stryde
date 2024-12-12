<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Category;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('images')->latest()->get();
        
        return Inertia::render('Admin/ProductDashboard', [
            'products' => $products
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'sizes' => 'required|array|min:1',
            'sizes.*.size' => 'required|string',
            'sizes.*.stock' => 'required|integer|min:0',
        ]);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        // Handle image uploads
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        // Handle sizes and stock
        foreach ($request->sizes as $size) {
            $product->sizes()->create([
                'size' => $size['size'],
                'stock' => $size['stock']
            ]);
        }

        return redirect()->route('products.index')
            ->with('message', 'Product created successfully');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product->load(['images', 'sizes', 'categories']),
            'categories' => Category::all()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'images.*' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'sizes' => 'required|string',
            'existingImages' => 'sometimes|string',
            'categories' => 'sometimes|string',
        ]);

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        // Handle existing images
        if ($request->has('existingImages')) {
            $existingImages = json_decode($request->existingImages, true);
            $existingImageIds = collect($existingImages)->pluck('id');
            
            // Delete images that are not in the existingImages array
            $product->images()
                ->whereNotIn('id', $existingImageIds)
                ->get()
                ->each(function ($image) {
                    Storage::disk('public')->delete($image->image_path);
                    $image->delete();
                });
        }

        // Handle new image uploads
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        // Update sizes and stock
        $sizes = json_decode($request->sizes, true);
        $product->sizes()->delete(); 
        foreach ($sizes as $size) {
            $product->sizes()->create([
                'size' => $size['size'],
                'stock' => $size['stock']
            ]);
        }

        // Update categories if they were provided
        if ($request->has('categories')) {
            $categories = json_decode($request->categories, true);
            $product->categories()->sync($categories);
        }

        return redirect()->route('products.index')
            ->with('message', 'Product updated successfully');
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        try {
            // Delete associated images from storage
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->image_path);
            }
            
            // Delete the product (this will cascade delete related records)
            $product->delete();

            return redirect()->route('products.index')
                ->with('message', 'Product deleted successfully');
            
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete product');
        }
    }

    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name'
        ]);

        $category = Category::create($validated);

        return response()->json($category);
    }
}