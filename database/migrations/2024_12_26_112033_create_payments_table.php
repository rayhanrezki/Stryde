<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->string('payment_method')->default('transfer'); // Metode pembayaran
            $table->string('payment_status')->default('pending'); // Status pembayaran
            $table->string('payment_channel')->nullable(); // Kanal pembayaran
            $table->string('transaction_id')->nullable(); // ID transaksi dari Doku
            $table->text('payment_response')->nullable(); // Response dari Doku atau payment gateway lainnya
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
