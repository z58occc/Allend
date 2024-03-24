<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        if ($request->user('api')->hasVerifiedEmail()) {
            // return redirect()->intended(RouteServiceProvider::HOME);
            return response()->json(["message" =>"信箱已完成驗證"]);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => '驗證信已寄出']);
    }
}
