<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained()->onDelete('cascade');  // Relasi ke tabel carts
            $table->foreignId('product_id')->constrained()->onDelete('cascade');  // Relasi ke tabel products
            $table->foreignId('product_size_id')->constrained()->onDelete('cascade'); // Relasi ke tabel product_sizes
            $table->integer('quantity')->default(1);  // Kuantitas produk
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
