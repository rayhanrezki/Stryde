<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {


        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => ('password'),
            'is_admin' => true,
            'address' => '123 Admin Street',
            'phone' => '1234567890',
        ]);
    }
}
