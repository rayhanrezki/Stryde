<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\MainController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\IsAdmin;

Route::get('/', [ProductController::class, 'main'])->name('main');

Route::middleware(['auth', 'verified'])->group(function () {
    // Public product routes
    Route::get('/products', [ProductController::class, 'list'])->name('products.list');
    Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

    // Admin product routes
    Route::resource('admin/products', ProductController::class);

    Route::post('admin/products/categories', [ProductController::class, 'storeCategory'])
        ->name('products.categories.store');

    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});

Route::get('/Admin/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'IsAdmin'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/cart', function () {
    return Inertia::render('Cart', [
        'cartItems' => [] // Sementara, kosong.
    ]);
})->name('cart');

require __DIR__ . '/auth.php';


Route::middleware('auth')->get('/main', function () {
    if (Auth::user()->isAdmin) {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('main');
});
