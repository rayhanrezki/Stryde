<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\CartItem;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_size_id' => 'required|exists:product_sizes,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        // Cek atau buat cart untuk pengguna
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $productSize = ProductSize::findOrFail($request->product_size_id);

        try {
            DB::transaction(function () use ($cart, $request, $productSize) {
                // Validasi stok
                if ($request->quantity > $productSize->stock) {
                    throw new \Exception('Not enough stock for the selected size.');
                }

                // Cek jika produk dan ukuran sudah ada di keranjang
                $item = CartItem::where('cart_id', $cart->id)
                    ->where('product_id', $request->product_id)
                    ->where('product_size_id', $request->product_size_id)
                    ->first();

                if ($item) {
                    $item->quantity += $request->quantity;
                    $item->save();
                } else {
                    CartItem::create([
                        'cart_id' => $cart->id,
                        'product_id' => $request->product_id,
                        'product_size_id' => $request->product_size_id,
                        'quantity' => $request->quantity,
                    ]);
                }

                // Jika ada gambar yang diunggah untuk item keranjang, simpan gambar
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $path = $image->store('product', 'public'); // Menyimpan gambar di folder cart_images
                        $item->images()->create([
                            'image_path' => $path
                        ]);
                    }
                }

                // Kurangi stok produk
                $productSize->decrement('stock', $request->quantity);
            });

            $cartItems = CartItem::with([
                'product' => function ($query) {
                    $query->with(['images', 'categories', 'sizes']); // Mengambil relasi 'sizes' dari Product
                },
                'productSize' // Relasi langsung ke ProductSize
            ])->where('cart_id', $cart->id)->get();

            // dd($cartItems);

            // Kirim data keranjang terbaru ke view
            return redirect()->route('cart')->with('success', 'Item added to cart.')
                ->with('cartItems', $cartItems);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function viewCart()
    {
        $user = Auth::user();

        // Pastikan pengguna memiliki keranjang
        $cart = $user->cart; // Asumsi Anda sudah memiliki relasi 'cart' di model User

        // Ambil semua item dalam keranjang beserta relasi produk, ukuran produk, dan gambar terkait dengan item keranjang
        $cartItems = $cart ? $cart->items()
            ->with([
                'product' => function ($query) {
                    $query->with(['images', 'categories', 'sizes']); // Mengambil gambar produk, kategori, dan ukuran
                },
                'productSize', // Mengambil ukuran produk
                // Menambahkan relasi untuk gambar item keranjang (jika ada)
            ])
            ->get() : [];


        // Ambil produk rekomendasi secara acak beserta relasi gambar
        $recommendedProducts = Product::with(['images', 'categories'])
            ->inRandomOrder()
            ->limit(4)
            ->get();

        // Render halaman Cart dengan data item keranjang dan produk rekomendasi
        return Inertia::render('Cart', [
            'cartItems' => $cartItems,              // Item dalam keranjang, termasuk gambar item keranjang
            'recommendedProducts' => $recommendedProducts, // Produk rekomendasi
        ]);
    }

    // Mengupdate kuantitas produk di keranjang
    public function updateQuantity(Request $request)
    {
        $request->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::findOrFail($request->cart_item_id);

        // Validasi stok
        $productSize = ProductSize::findOrFail($cartItem->product_size_id);
        if ($request->quantity > $productSize->stock) {
            return back()->with('error', 'Not enough stock for the selected size.');
        }

        // Update kuantitas
        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return back()->with('success', 'Quantity updated.');
    }

    // Menghapus item dari keranjang
    public function removeItem(Request $request)
    {
        $request->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
        ]);

        $cartItem = CartItem::findOrFail($request->cart_item_id);

        // Mengembalikan stok produk jika item dihapus
        $productSize = ProductSize::findOrFail($cartItem->product_size_id);
        $productSize->increment('stock', $cartItem->quantity);

        // Hapus item dari keranjang
        $cartItem->delete();

        return back()->with('success', 'Item removed from cart.');
    }
}
