<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Models\OrderItem;

class CheckoutController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $cart = $user->cart->load(['items.productSize']);
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

        if ($cartItems->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart is empty!'
            ], 400);
        }

        $validated = $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
            'paymentStatus' => 'string|nullable',
        ]);

        DB::beginTransaction();

        try {
            $totalAmount = 0;
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

            // Set Midtrans configuration
            \Midtrans\Config::$serverKey = config('midtrans.serverKey');
            \Midtrans\Config::$isProduction = false;
            \Midtrans\Config::$isSanitized = true;
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

            // Create single order
            $order = Order::create([
                'user_id' => $user->id,
                'email' => $user->email,
                'first_name' => $validated['firstName'],
                'last_name' => $validated['lastName'],
                'address' => $validated['address'],
                'phone' => $validated['phone'],
                'total_amount' => $totalAmount,
                'status' => $validated['paymentStatus'] ?? 'pending',
                'snap_token' => $snapToken,
                'order_date' => Carbon::now(),
            ]);

            // Create order items
            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                    'size' => $item->productSize->size
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Order created successfully!',
                'snapToken' => $snapToken
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

    public function updateStatus(Request $request)
    {
        try {
            $validated = $request->validate([
                'snapToken' => 'required',
                'status' => 'required|string'
            ]);

            DB::transaction(function () use ($validated) {
                // Update the order status
                Order::where('snap_token', $validated['snapToken'])
                    ->update([
                        'status' => $validated['status'],
                        'updated_at' => now()
                    ]);

                // Only delete cart items if payment is successful
                if ($validated['status'] === 'settlement') {
                    $user = Auth::user();
                    CartItem::where('cart_id', $user->cart->id)->delete();
                }
            });

            return response()->json([
                'status' => 'success',
                'message' => 'Order status updated successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating order status', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTrace(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update order status'
            ], 500);
        }
    }

    public function showInvoice()
    {
        $user = Auth::user();

        $order = Order::where('user_id', $user->id)
            ->with(['items.product']) // Pastikan relasi terhubung dengan item dan produk
            ->latest()
            ->first();

        if (!$order) {
            return Inertia::render('Invoice', [
                'auth' => $user,
                'orders' => [],
                'cart' => null,
                'products' => [],
            ]);
        }

        // Format items untuk frontend
        $orderItems = $order->items->map(function ($item) {
            return [
                'id' => $item->id,
                'product_name' => $item->product->name,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'size' => $item->size
            ];
        });

        return Inertia::render('Invoice', [
            'auth' => $user,
            'orders' => [[
                'id' => $order->id,
                'order_id' => $order->id,
                'date' => $order->created_at->toDateString(),
                'customer' => [
                    'name' => "{$order->first_name} {$order->last_name}",
                    'address' => $order->address,
                    'phone' => $order->phone,
                    'email' => $order->email,
                ],
                'items' => $orderItems,
                'total' => $order->total_amount,
            ]],
            'cart' => $user->cart,
            'products' => $order->items->pluck('product'), // Produk terkait
        ]);
    }
}
