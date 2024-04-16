<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmailVerificationRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse|JsonResponse
    {
        // 驗證參數
        $request->validate([
            'signature' => 'required',
            'expires' => 'required|integer',
        ]);

        $expires = Carbon::createFromTimestamp($request->expires);
        if($expires->isPast()){
            abort(400);
        }

        if (!URL::hasValidSignature($request, false)){
            abort(401);
        }

        if ($request->user('api')->hasVerifiedEmail()) {
            // return redirect()->intended(
            //     config('app.frontend_url').RouteServiceProvider::HOME.'?verified=1'
            // );
            return response()->json([
                'message' => '該電子郵件已經驗證過'
            ],200);
        }

        if ($request->user('api')->markEmailAsVerified()) {
            event(new Verified($request->user('api')));
        }

        // return redirect()->intended(
        //     config('app.frontend_url').RouteServiceProvider::HOME.'?verified=1'
        // );
        return response()->json([
            'message' => '電子郵件驗證成功'
        ],200);
    }
}
