<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpFoundation\Response;

class Authenticate
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
            // If authenticated with this guard, continue request
            if (Auth::guard($guard)->check()) {
                Auth::shouldUse($guard);
                return $next($request);
            }
        }

        // Handle unauthenticated session
        throw new AuthenticationException(
            'Unauthenticated', $guards, $this->redirectTo($request)
        );
    }

    /**
     * Function to redirect based on user type
     */
    protected function redirectTo(Request $request)
    {
        // If the request is for admin routes
        if ($request->is('admin/*')) {
            return route('admin.login');
        }

        // Default to user login
        return route('login');
    }
}
