<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'stock',
    ];

    // Relasi one-to-one dengan ProductDetail
    public function detail()
    {
        return $this->hasOne(ProductDetail::class);
    }

    public function ratings()
{
    return $this->hasMany(Rating::class);
}

public function averageRating()
{
    return $this->ratings()->avg('rating');
}

}
