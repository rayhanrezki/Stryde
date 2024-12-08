<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MainController;

Route::get('/', [MainController::class, 'index']);

Route::get('/products', [ProductController::class, 'index'])->name('products.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::resource('products', ProductController::class);

Route::get('/products-dashboard', [ProductController::class, 'dashboard'])
    ->name('products.dashboard')
    ->middleware(['auth']);

Route::get('/cart', function () {
    return Inertia::render('Cart', [
        'cartItems' => [] // For now, we'll pass an empty array
    ]);
})->name('cart');

require __DIR__ . '/auth.php';
