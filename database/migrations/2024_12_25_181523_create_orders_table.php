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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('email');
            $table->string('first_name');  // Kolom baru
            $table->string('last_name');   // Kolom baru
            $table->string('address');     // Kolom baru
            $table->string('phone');       // Kolom baru
            $table->string('delivery_option')->default('standard'); // Kolom baru
            $table->boolean('same_as_billing')->default(true); // Kolom baru
            $table->boolean('is_over_13')->default(false); // Kolom baru
            $table->boolean('newsletter')->default(false); // Kolom baru
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('total_amount', 10, 2);
            $table->string('status')->default('pending');
            $table->string('payment')->default('transfer');
            $table->date('order_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
