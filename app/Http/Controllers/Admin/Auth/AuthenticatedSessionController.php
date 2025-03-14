<?php


namespace App\Http\Controllers\Admin\Auth;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('admin/auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request. LoginRequest
     */
    public function store(Request $request): RedirectResponse
    {
        //$request->authenticate();

        $request->session()->regenerate();

        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Attempt to log in the user
        if (Auth::guard('web')->attempt($request->only('email', 'password'))) {
            // Check if the user is an admin
            if (Auth::user()->role === 'admin') {
                return redirect()->route('admin.dashboard'); // Redirect to admin dashboard
            }

            return redirect()->route('dashboard'); // Redirect to regular user dashboard
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin');
    }
}
