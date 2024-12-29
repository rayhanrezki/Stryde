<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['items.product', 'user'])
            ->latest()
            ->get()
            ->map(function ($order) {
                $itemCount = $order->items->count();
                $productText = $itemCount > 1 ? "{$itemCount} Products" : "1 Product";

                return [
                    'id' => $order->id,
                    'product_name' => $productText,
                    'order_id' => str_pad($order->id, 5, '0', STR_PAD_LEFT),
                    'date' => Carbon::parse($order->order_date)->format('d M Y'),
                    'customer' => [
                        'name' => $order->first_name . ' ' . $order->last_name,
                        'avatar' => $order->user->profile_photo_url ?? null,
                    ],
                    'status' => ucfirst($order->status),
                    'amount' => (float) $order->total_amount,
                    'items' => $order->items->map(function ($item) {
                        return [
                            'product_name' => $item->product->name,
                            'quantity' => $item->quantity,
                            'price' => (float) $item->price
                        ];
                    })
                ];
            });

        return Inertia::render('Admin/OrderDashboard', [
            'orders' => $orders
        ]);
    }
} 