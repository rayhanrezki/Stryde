<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\CartItem;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Menampilkan daftar semua produk
    public function index()
    {
        $products = Product::with('images')->latest()->get();

        return Inertia::render('Admin/ProductDashboard', [
            'products' => $products
        ]);
    }

    // Menampilkan form untuk membuat produk baru
    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::all()
        ]);
    }

    // Menyimpan produk baru ke database
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

        // Menangani kategori
        if ($request->has('categories')) {
            $product->categories()->attach($request->categories);
        }

        // Menangani upload gambar
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        // Menangani ukuran dan stok
        foreach ($request->sizes as $size) {
            $product->sizes()->create([
                'size' => $size['size'],
                'stock' => $size['stock']
            ]);
        }

        return redirect()->route('products.index')
            ->with('message', 'Product created successfully');
    }

    // Menampilkan form untuk mengedit produk
    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product->load(['images', 'sizes', 'categories']),
            'categories' => Category::all()
        ]);
    }

    // Memperbarui data produk di database
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

        // Menangani gambar yang sudah ada
        if ($request->has('existingImages')) {
            $existingImages = json_decode($request->existingImages, true);
            $existingImageIds = collect($existingImages)->pluck('id');

            // Menghapus gambar yang tidak ada dalam array existingImages
            $product->images()
                ->whereNotIn('id', $existingImageIds)
                ->get()
                ->each(function ($image) {
                    Storage::disk('public')->delete($image->image_path);
                    $image->delete();
                });
        }

        // Menangani upload gambar baru
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        // Memperbarui ukuran dan stok
        $sizes = json_decode($request->sizes, true);
        $product->sizes()->delete();
        foreach ($sizes as $size) {
            $product->sizes()->create([
                'size' => $size['size'],
                'stock' => $size['stock']
            ]);
        }

        // Memperbarui kategori jika ada
        if ($request->has('categories')) {
            $categories = json_decode($request->categories, true);
            $product->categories()->sync($categories);
        }

        return redirect()->route('products.index')
            ->with('message', 'Product updated successfully');
    }

    /**
     * Menghapus produk tertentu dari database
     */
    public function destroy(Product $product)
    {
        try {
            // Menghapus gambar terkait dari penyimpanan
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->image_path);
            }

            $product->delete();

            return redirect()->route('products.index')
                ->with('message', 'Product deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete product');
        }
    }

    // Menyimpan kategori baru
    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name'
        ]);

        $category = Category::create($validated);

        return response()->json($category);
    }

    // Menampilkan detail produk berdasarkan slug
    public function show($slug)
    {

        $user = Auth::user();
        $cartItems = CartItem::where('cart_id', $user->id)->get();
        $product = Product::with(['images', 'sizes', 'categories'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Rekomendasi product ambil random 4
        $recommendedProducts = Product::with(['images', 'categories'])
            ->where('id', '!=', $product->id)
            ->inRandomOrder()
            ->take(4)
            ->get();

        return Inertia::render('ProductDetails', [
            'product' => $product,
            'recommendedProducts' => $recommendedProducts,
            'auth' => [
                'user' => $user,
            ],
            'cartItems' => $cartItems,
        ]);
    }

    // Menampilkan halaman utama dengan produk terbaru
    // Menampilkan halaman utama dengan produk terbaru
    public function main()
    {
        $user = Auth::user();
        $cartItems = $user ? CartItem::where('cart_id', $user->id)->get() : [];

        $latestProducts = Product::with('images')
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('Main', [
            'latestProducts' => $latestProducts,
            'auth' => ['user' => $user],
            'cartItems' => $cartItems,
        ]);
    }

    // Menampilkan daftar semua produk untuk halaman publik
    public function list()
    {
        $products = Product::with(['images', 'sizes', 'categories'])
            ->latest()
            ->get();

        return Inertia::render('ProductList', [
            'products' => $products,
            'totalItems' => $products->count()
        ]);
    }
}
