<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{   
    public function index()
    {
        return Inertia::render('Dashboard', [
            'totalProducts' => Product::count(),
            'totalUsers' => User::count(),
        ]);
    }
}