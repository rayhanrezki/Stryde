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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ID pelanggan
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // ID produk
            $table->integer('rating')->unsigned(); // Nilai rating (1-5)
            $table->text('review')->nullable(); // Ulasan opsional
            $table->timestamps();
        });
    }
    
};
