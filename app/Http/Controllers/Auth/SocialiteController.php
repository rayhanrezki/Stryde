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
    public function googleRedirect()
    {
        if (Auth::check()) {
            return redirect('/main');
        }
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback()
    {
        $socialUser = Socialite::driver('google')->user();

        // Cari pengguna berdasarkan email untuk menghindari duplikasi email
        $registeredUser = User::where('email', $socialUser->email)->first();

        if (!$registeredUser) {
            // Jika pengguna belum ada, buat pengguna baru
            $user = User::create([
                'google_id' => $socialUser->id,
                'name' => $socialUser->name,
                'email' => $socialUser->email,
                'password' => Hash::make('password'),  // Password default untuk akun baru
                'google_token' => $socialUser->token,
                'google_refresh_token' => $socialUser->refreshToken,
            ]);

            Auth::login($user);
            return redirect('/main');
        }

        // Jika pengguna sudah terdaftar, login
        Auth::login($registeredUser);
        return redirect('/main');
    }

    public function githubRedirect()
    {
        if (Auth::check()) {
            return redirect('/main');
        }
        return Socialite::driver('github')->redirect();
    }

    public function githubCallback()
    {
        $socialUser = Socialite::driver('github')->user();

        // Cari pengguna berdasarkan email untuk menghindari duplikasi email
        $registeredUser = User::where('email', $socialUser->email)->first();

        if (!$registeredUser) {
            // Jika pengguna belum ada, buat pengguna baru dengan github_id
            $user = User::create([
                'github_id' => $socialUser->id,
                'name' => $socialUser->name ?? $socialUser->nickname,
                'email' => $socialUser->email,
                'password' => Hash::make('password'),  // Password default untuk akun baru
                'github_token' => $socialUser->token,
                'github_refresh_token' => $socialUser->refreshToken,
                'email_verified_at' => now(),
            ]);

            Auth::login($user);
            return redirect('/main');
        }

        // Jika pengguna sudah terdaftar, login
        Auth::login($registeredUser);
        return redirect('/main');
    }
}
