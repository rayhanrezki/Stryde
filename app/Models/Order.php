<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'email',
        'first_name',
        'last_name',
        'address',
        'phone',
        'delivery_option',
        'same_as_billing',
        'is_over_13',
        'newsletter',
        'product_id',
        'quantity',
        'total_amount',
        'status',
        'snap_token',
        'payment',
        'order_date',
    ];

    // Defining relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class, 'payment_id');
    }

    // Optional: For adding the cart item relationship
    public function cartItem()
    {
        return $this->belongsTo(CartItem::class);
    }
}
