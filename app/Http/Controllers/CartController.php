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
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);
        $productSize = ProductSize::findOrFail($request->product_size_id);

        try {
            DB::transaction(function () use ($cart, $request, $productSize) {
                if ($request->quantity > $productSize->stock) {
                    throw new \Exception('Not enough stock for the selected size.');
                }

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

                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $path = $image->store('product', 'public');
                        $item->images()->create([
                            'image_path' => $path
                        ]);
                    }
                }

                $productSize->decrement('stock', $request->quantity);
            });

            $cartItems = CartItem::with([
                'product' => function ($query) {
                    $query->with(['images', 'categories', 'sizes']);
                },
                'productSize'
            ])->where('cart_id', $cart->id)->get();

            return redirect()->back()->with([
                'success' => true,
                'message' => 'Item added to cart successfully',
            ])->with('cartItems', $cartItems);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function viewCart()
    {
        $user = Auth::user();

        $cart = $user->cart;

        $cartItems = $cart ? $cart->items()
            ->with([
                'product' => function ($query) {
                    $query->with(['images', 'categories', 'sizes']);
                },
                'productSize',
            ])
            ->get() : [];

        $recommendedProducts = Product::with(['images', 'categories'])
            ->inRandomOrder()
            ->limit(4)
            ->get();

        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
            'recommendedProducts' => $recommendedProducts,
        ]);
    }

    public function updateQuantity(Request $request)
    {
        $request->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::findOrFail($request->cart_item_id);
        $productSize = ProductSize::findOrFail($cartItem->product_size_id);

        $oldQuantity = $cartItem->quantity;
        $newQuantity = $request->quantity;
        $quantityDifference = $newQuantity - $oldQuantity;

        if ($quantityDifference > 0 && $quantityDifference > $productSize->stock) {
            return response()->json([
                'success' => false,
                'message' => 'Stok tidak cukup untuk ukuran yang dipilih.',
                'availableStock' => $productSize->stock,
                'currentQuantity' => $oldQuantity
            ], 400);
        }

        $cartItem->quantity = $newQuantity;
        $cartItem->save();

        if ($quantityDifference > 0) {
            $productSize->decrement('stock', $quantityDifference);
        } elseif ($quantityDifference < 0) {
            $productSize->increment('stock', abs($quantityDifference));
        }

        // Return updated cart item with its relationships
        $updatedCartItem = CartItem::with([
            'product' => function ($query) {
                $query->with(['images', 'categories', 'sizes']);
            },
            'productSize'
        ])->find($cartItem->id);

        return response()->json([
            'success' => true,
            'message' => 'Quantity updated.',
            'cartItem' => $updatedCartItem
        ]);
    }


    public function removeItem(Request $request)
    {
        $request->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
        ]);

        $cartItem = CartItem::findOrFail($request->cart_item_id);

        $productSize = ProductSize::findOrFail($cartItem->product_size_id);
        $productSize->increment('stock', $cartItem->quantity);

        $cartItem->delete();

        return redirect()->route('cart')->with('success', 'Item removed successfully.');
    }
}
