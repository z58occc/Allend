<?php

namespace App\Http\Middleware;

use App\Models\Member;
use Closure;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class EnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // public function handle(Request $request, Closure $next): Response
    // {
    //     if (! $request->user() ||
    //         ($request->user() instanceof MustVerifyEmail &&
    //         ! $request->user()->hasVerifiedEmail())) {
    //         return response()->json(['message' => 'Your email address is not verified.'], 409);
    //     }

    //     return $next($request);
    // }

    public function handle(Request $request, Closure $next ,$guard = null, $redirectToRoute =null): Response
    {
        // 先驗證登入的信箱是不是有經過驗證
        if (! $request->user($guard) ||
            ($request->user($guard) instanceof MustVerifyEmail &&
            ! $request->user($guard)->hasVerifiedEmail())) {
            return response()->json(['error' => 'Your email address is not verified.'], 409);
            // return $request->expectsJson()
            //         ? abort(403, 'Your email address is not verified.')
            //         : Redirect::guest(URL::route($redirectToRoute ?: 'verification'));
        }

        return $next($request);
    }
}
