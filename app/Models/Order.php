<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model


{

    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'payment_id',
        'quantity',
        'total_amount',
        'email',
        'name',
        'shipping_address',
        'status',
        'payment',
        'order_date',
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
