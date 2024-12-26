<?php

use Inertia\Inertia;
use App\Models\Product;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\CartController;
use App\Http\Controllers\MainController;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\CheckoutController;
use App\Http\Middleware\IsAdmin;
use App\Http\Controllers\RatingController;

Route::get('/', [ProductController::class, 'main'])->name('main');
// Public product routes
Route::get('/products', [ProductController::class, 'list'])->name('products.list');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

Route::middleware(['auth', 'verified'])->group(function () {
    // Admin product routes
    Route::resource('admin/products', ProductController::class);

    Route::post('admin/products/categories', [ProductController::class, 'storeCategory'])
        ->name('products.categories.store');

    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    // Admin category routes
    Route::get('/admin/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::delete('/admin/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');


    Route::get('/cart', [CartController::class, 'viewCart'])->name('cart'); // Menampilkan keranjang
    Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add'); // Menambah item ke keranjang
    Route::post('/cart/update', [CartController::class, 'updateQuantity'])->name('cart.update'); // Mengupdate kuantitas item di keranjang
    Route::post('/cart/remove', [CartController::class, 'removeItem'])->name('cart.remove'); // Menghapus item dari keranjang
    // Admin dashboard
    Route::get('/Admin/dashboard', [DashboardController::class, 'index'])
        ->middleware(['auth', 'verified', 'IsAdmin'])
        ->name('dashboard');


        Route::get('/Admin/dashboard', [DashboardController::class, 'index'])
        ->middleware(['auth', 'verified', 'IsAdmin'])
        ->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Recommended products route for cart page

})->name('cart');

// Route for Authenticated users
Route::middleware('auth')->get('/main', function () {
    if (Auth::user()->is_admin) {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('main');

    //rating
    Route::get('/ratings', [RatingController::class, 'index']);
    Route::post('/ratings', [RatingController::class, 'store']);
});


Route::get('/auth/google/redirect', [SocialiteController::class, 'googleRedirect']);
Route::get('/auth/google/callback', [SocialiteController::class, 'googleCallback']);


Route::get('/auth/github/redirect', [SocialiteController::class, 'githubRedirect']);
Route::get('/auth/github/callback', [SocialiteController::class, 'githubCallback']);


Route::get('/fetch-quote', [QuoteController::class, 'fetch'])
    ->middleware(['auth', 'verified', 'IsAdmin'])
    ->name('fetch.quote');

Route::get('/checkout', [CheckoutController::class, 'index'])
    ->name('checkout')
    ->middleware(['auth']); // Only allow authenticated users

require __DIR__ . '/auth.php';
