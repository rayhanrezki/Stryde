<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect()
    {
        // Jika pengguna sudah login, arahkan ke halaman utama atau dashboard
        if (Auth::check()) {
            return redirect('/main'); // Ganti dengan rute yang sesuai
        }

        // Jika pengguna belum login, arahkan ke Google login
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $socialUser = Socialite::driver('google')->user();

        // Cari pengguna berdasarkan Google ID
        $registeredUser = User::where('google_id', $socialUser->id)->first();

        if (!$registeredUser) {
            // Jika pengguna belum ada, buat pengguna baru
            $user = User::updateOrCreate(
                ['google_id' => $socialUser->id],
                [
                    'name' => $socialUser->name,
                    'email' => $socialUser->email,
                    'password' => Hash::make('123'),
                    'google_token' => $socialUser->token,
                    'google_refresh_token' => $socialUser->refreshToken,
                ]
            );

            // Login pengguna
            Auth::login($user);

            return redirect('/main'); // Ganti dengan rute setelah login
        }

        // Jika pengguna sudah terdaftar, login
        Auth::login($registeredUser);

        return redirect('/main'); // Ganti dengan rute setelah login
    }
}
