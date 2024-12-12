<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'description',
        'weight',
        'dimensions',
        'material',
    ];

    // Relasi one-to-one dengan Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
