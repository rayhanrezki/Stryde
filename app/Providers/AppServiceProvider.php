<?php

namespace App\Providers;

use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        $this->app['router']->aliasMiddleware('IsAdmin', IsAdmin::class);
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
