<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Nama produk
            $table->decimal('price', 10, 2); // Harga produk
            $table->integer('stock'); // Stok produk
            $table->timestamps(); // created_at dan updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
