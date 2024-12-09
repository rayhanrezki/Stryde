<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SizeStock extends Model
{
    use HasFactory;

    protected $fillable = ['size_stock'];

    protected $casts = [
        'size_stock' => 'array'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
