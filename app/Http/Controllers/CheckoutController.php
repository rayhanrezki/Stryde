<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\Product;
use App\Models\Payment;
use App\Models\CartItem;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $cart = Auth::user()->cart;
        $products = Product::with(['images', 'sizes', 'categories'])
            ->whereIn('id', $cart->items->pluck('product_id'))
            ->get();

        return Inertia::render('Checkout', [
            'cart' => $cart,
            'products' => $products,
            'auth' => ['user' => $user],
        ]);
    }

    public function process(Request $request)
    {
        $user = Auth::user();
        $cart = $user->cart;
        $cartItems = $cart->items;

        // Validasi jika tidak ada item di cart
        if ($cart->items->isEmpty()) {
            return redirect()->route('checkout.index')->withErrors(['message' => 'Cart is empty!']);
        }

        DB::beginTransaction();

        try {

            foreach ($cartItems as $item) {
                $orderData = [
                    'user_id' => $user->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'total_amount' => $item->product->price * $item->quantity,
                    'status' => 'completed',
                    'email' => $user->email,
                    'name' => $user->name,
                    'shipping_address' => $user->address,
                    'payment' => 'transfer',
                    'order_date' => Carbon::now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                // Log untuk memeriksa data order
                Log::info('Order data:', $orderData);

                Order::create($orderData);
            }
            // Hapus item dari cart
            CartItem::where('cart_id', $cart->id)->delete();

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'Payment successful!',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Payment failed! Please try again.',
            ], 500);
        }
    }
}
