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
        if (empty($guards)) {
            $guards = [null];
        }

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                Auth::shouldUse($guard); // Ensure correct guard is used
                return $next($request);
            }
        }

        return redirect($this->redirectTo($request));
    }

    protected function redirectTo($request)
    {
        if ($request->is('admin/*')) {
            return route('admin.login');
        }

        return route('login');
    }

}
