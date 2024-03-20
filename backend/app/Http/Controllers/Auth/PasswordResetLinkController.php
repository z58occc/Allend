<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordResetLinkController extends Controller
{
    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request):RedirectResponse// JsonResponse
    {
        // $request->validate([
        //     'email' => ['required', 'email'],
        // ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );
        // return response()->json([
        //     'message' => $status
        // ]);
        // if ($status === Password::RESET_LINK_SENT) {
        //     return response()->json([
        //         'message' => 'success'
        //     ]);
        //     // throw ValidationException::withMessages([
        //     //     'email' => [__($status)],
        //     // ]);
        // }else {
        //     // throw ValidationException::withMessages([
        //     //     'email' => [__($status)],
        //     // ]);
        //     return response()->json([
        //         'message' => 'fail'
        //     ]);
        // }
        // return response()->json($request);

        // return response()->json(['status' => __($status)]);


        return $status == Password::RESET_LINK_SENT
                    ? back()->with('status', __($status))
                    : back()->withInput($request->only('email'))
                            ->withErrors(['email' => __($status)]);

    }
}
