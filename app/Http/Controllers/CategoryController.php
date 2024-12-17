<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/CategoryDashboard', [
            'categories' => Category::all()
        ]);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->back();
    }
} 