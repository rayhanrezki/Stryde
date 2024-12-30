<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function show(Request $request, $orderId)
    {
        $order = Order::with(['items.product', 'user'])
            ->where('id', $orderId)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $formattedOrder = [
            'id' => (string)$order->id,
            'order_id' => str_pad($order->id, 5, '0', STR_PAD_LEFT),
            'date' => $order->order_date,
            'customer' => [
                'name' => $order->first_name . ' ' . $order->last_name,
                'email' => $order->email,
                'address' => $order->address,
                'phone' => $order->phone,
            ],
            'items' => $order->items->map(function ($item) {
                return [
                    'id' => (string)$item->id,
                    'product_name' => $item->product->name,
                    'quantity' => $item->quantity,
                    'price' => (float)$item->price,
                ];
            }),
            'total' => (float)$order->total_amount,
        ];

        return Inertia::render('Invoice', [
            'orders' => [$formattedOrder], // Wrap in array since Invoice component expects array
        ]);
    }
} 