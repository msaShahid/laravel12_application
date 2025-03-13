<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            // If already authenticated, redirect to the correct dashboard
            if (Auth::guard($guard)->check()) {
                $user = Auth::guard($guard)->user();

                // If admin, redirect to admin dashboard
                if ($user->role === 'admin') {
                    return redirect()->route('admin.dashboard');
                }

                // Otherwise, redirect to user dashboard
                return redirect()->route('user.dashboard');
            }
        }

        return $next($request);
    }
}
