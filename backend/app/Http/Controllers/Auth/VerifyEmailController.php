<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmailVerificationRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse|JsonResponse
    {
        // 驗證時效性
        // $request->validate([
        //     'signature' => 'required',
        //     'expires' => 'required|integer',
        // ]);
        // $expires = $request->expires;
        // if($expires < 165111111116){
        //     return response()->json([
        //         'message' => 'Signature expired.',
        //     ]);
        // }
            // dd($request->user('api'));
        if ($request->user('api')->hasVerifiedEmail()) {
            return redirect()->intended(
                config('app.frontend_url').RouteServiceProvider::HOME.'?verified=1'
            );
        }

        if ($request->user('api')->markEmailAsVerified()) {
            event(new Verified($request->user('api')));
        }

        return redirect()->intended(
            config('app.frontend_url').RouteServiceProvider::HOME.'?verified=1'
        );
    }
}
