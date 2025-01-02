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

    public function edit(Category $category)
    {
        return Inertia::render('Admin/EditCategory', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update([
            'name' => $request->name
        ]);

        return redirect()->route('categories.index')
            ->with('message', 'Category updated successfully');
    }

    public function create()
    {
        return Inertia::render('Admin/CreateCategory');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        Category::create([
            'name' => $request->name
        ]);

        return redirect()->route('categories.index')
            ->with('message', 'Category created successfully');
    }
}
