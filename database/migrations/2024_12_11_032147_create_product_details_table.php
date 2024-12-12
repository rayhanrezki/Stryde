<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductDetailsTable extends Migration
{
    public function up()
    {
        Schema::create('product_details', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('product_id'); // Foreign key ke tabel produk
            $table->text('description')->nullable(); // Deskripsi produk
            $table->decimal('weight', 8, 2)->nullable(); // Berat produk (kg)
            $table->string('dimensions')->nullable(); // Dimensi produk (misal: 10x20x15 cm)
            $table->string('material')->nullable(); // Bahan produk
            $table->timestamps(); // created_at dan updated_at

            // Foreign key constraint
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_details');
    }
}
