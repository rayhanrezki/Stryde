<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SizeStock extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'sizes'];

    protected $casts = [
        'sizes' => 'array', // Menyatakan bahwa kolom sizes adalah array (JSON)
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
