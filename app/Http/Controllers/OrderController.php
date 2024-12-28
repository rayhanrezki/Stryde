<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['product', 'user'])
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'product_name' => $order->product->name,
                    'order_id' => str_pad($order->id, 5, '0', STR_PAD_LEFT),
                    'date' => $order->order_date,
                    'customer' => [
                        'name' => $order->first_name . ' ' . $order->last_name,
                        'avatar' => $order->user->profile_photo_url ?? null,
                    ],
                    'status' => ucfirst($order->status),
                    'amount' => (float) $order->total_amount,
                ];
            });

        return Inertia::render('Admin/OrderDashboard', [
            'orders' => $orders
        ]);
    }
} 