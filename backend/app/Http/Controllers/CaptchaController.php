<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CaptchaController extends Controller
{
    public function capthcaFormValidate(Request $request)
    {
        $request->validate([
            'capthca'
        ]);
    }

    public function reloadCaptcha()
    {
        return response()->json([
            // 'captcha' => captcha_img(),
            'captcha' => app('captcha')->create('default', true)
        ]);
    }

    public function validateCaptcha(Request $request)
    {
        $request->validate([
            'key' => 'required',
            'captcha' => 'required'
        ]);

        $key = $request->key;
        $answer = $request->captcha;

        if(!captcha_api_check($answer, $key)) {
            return response()->json([
                'message' => '驗證碼錯誤'
            ]);
        }

        return response()->json([
            'message' => '驗證通過'
        ]);
    }
}
