<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CategoryProduct extends Pivot
{
    use HasFactory;

    // Jika ingin mengubah nama tabel, bisa didefinisikan disini
    protected $table = 'category_product';

    // Menambahkan relasi yang dibutuhkan pada model pivot
    protected $fillable = ['category_id', 'product_id'];

    // Jika tidak ingin menggunakan timestamp di tabel pivot, matikan timestamps
    public $timestamps = true;
}
