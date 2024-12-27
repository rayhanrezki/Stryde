<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $cart = $user->cart;
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
        if ($cartItems->isEmpty()) {
            return redirect()->route('checkout.index')->withErrors(['message' => 'Cart is empty!']);
        }

        $validated = $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
            'paymentStatus' => 'string|nullable', // Allow null or string
        ]);

        DB::beginTransaction();



        $totalAmount = 0;

        // Siapkan data untuk Midtrans
        $items = [];
        foreach ($cartItems as $item) {
            $totalAmount += $item->product->price * $item->quantity;

            $items[] = [
                'id' => $item->product_id,
                'price' => $item->product->price,
                'quantity' => $item->quantity,
                'name' => $item->product->name,
            ];
        }

        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = config('midtrans.serverKey');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;

        $params = array(
            'transaction_details' => array(
                'order_id' => rand(),
                'gross_amount' => $totalAmount,
            ),
            'customer_details' => array(
                'first_name' => $validated['firstName'],
                'last_name' => $validated['lastName'],
                'email' => $user->email,
                'phone' => $validated['phone'],
            ),

        );

        $snapToken = \Midtrans\Snap::getSnapToken($params);

        try {

            foreach ($cartItems as $item) {
                $orderData = [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'first_name' => $validated['firstName'],
                    'last_name' => $validated['lastName'],
                    'address' => $validated['address'],
                    'phone' => $validated['phone'],
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'total_amount' => $totalAmount,
                    'status' => $validated['paymentStatus'] ?? 'pending',  // Default value if null
                    'snap_token' => $snapToken,
                    'order_date' => Carbon::now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                Order::create($orderData);

                // Log untuk memeriksa data order
                Log::info('Order data:', $orderData);
            }

            // Hapus item dari cart jika semua order berhasil dibuat
            CartItem::where('cart_id', $cart->id)->delete();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Payment successful!',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error processing checkout', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTrace(),
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Payment failed! Please try again.',
            ], 500);
        }
    }
}
