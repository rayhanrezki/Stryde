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
            'deliveryOption' => 'required|string',
            'sameAsBilling' => 'boolean',
            'isOver13' => 'required|boolean',
            'newsletter' => 'required|boolean',
            'paymentStatus' => 'string|nullable', // Allow null or string
            'paymentMethod' => 'string|nullable', // Allow null or string
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


        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        \Midtrans\Config::$isProduction = false;
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;


        // Data transaksi untuk Midtrans
        $params = [
            'transaction_details' => [
                'order_id' => uniqid()::Order(),
                'gross_amount' => $totalAmount,
            ],
            'customer_details' => [
                'first_name' => $validated['firstName'],
                'last_name' => $validated['lastName'],
                'email' => $user->email,
                'phone' => $validated['phone'],
                'billing_address' => $validated['address'], // Opsional jika didukung Midtrans
            ],
            'item_details' => $items,
        ];

        $snapUrl = \Midtrans\Snap::createTransaction($params)->redirect_url;


        try {
            foreach ($cartItems as $item) {
                $orderData = [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'first_name' => $validated['firstName'],
                    'last_name' => $validated['lastName'],
                    'address' => $validated['address'],
                    'phone' => $validated['phone'],
                    'delivery_option' => $validated['deliveryOption'],
                    'same_as_billing' => $validated['sameAsBilling'],
                    'is_over_13' => $validated['isOver13'],
                    'newsletter' => $validated['newsletter'],
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'total_amount' => $item->product->price * $item->quantity,
                    'status' => $validated['paymentStatus'] ?? 'pending',  // Default value if null
                    'payment' => $validated['paymentMethod'] ?? 'transfer', // Default value if null
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
