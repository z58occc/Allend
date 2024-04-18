<?php

namespace App\Http\Controllers;

use App\Exceptions\ValidationExceptionAPI;
use App\Models\Member;
use DateTime;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\Rules;
use Throwable;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['login', 'register']]);
    }

    // 註冊
    public function register(Request $request)
    {
        // 先進行驗證跟錯誤處理
        try{
            $request->validate([
                'email' => 'required|string|email',
                // 'password' => ['required', 'confirmed', 'min:6', Rules\Password::defaults()],
                'password' => ['required', 'confirmed', 'min:8',],
            ]);
        }
        catch (ValidationException $exception){
            return response()->json([
                'message' => '輸入資料格式有誤!'
            ],422);
        }

        // 插入資料庫，若重複會回傳錯誤訊息
        if (DB::table('members')->where('email', $request->email)->where('provider', null)->exists()){
            return response()->json([
                'error' => '該信箱已被註冊過'
            ]);
        }else{
            try{
                $user = Member::create([
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'last_login' => now()
                ]);

                // 發送信箱驗證信
                event(new Registered($user));

                return response()->json([
                    'email' => $request->email,
                    'password' => $request->password,
                ]);
            }catch(Throwable $err){
                return response()->json([
                    'error' => '該信箱已被註冊過'
                ]);
            }
        }
    }

    // 登入
    public function login(Request $request){
        try{
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
        }
        catch (ValidationException $exception){
            return response()->json([
                'error' => '缺少帳號或是密碼'
            ],422);
        }

        if(DB::table('members')->where('email', $request->email)->where('provider', null)->exists()){
            $credentials = [
                'email' => $request->email,
                'password' => $request->password,
                'provider' => null
            ];

            if(!Auth::attempt($credentials)){
                return response()->json([
                    'error' => '帳號或密碼錯誤'
                ],401);
            }
            $token = auth()->setTTL(120)->attempt($credentials);

            $user = Auth::user();
            Member::where('mid', $user->mid)->update(['last_login' => now()]);

            return response()->json([
                'token' => $token,
            ]);
        }else{
            return response()->json([
                'error' => '該帳號尚未註冊',
            ], 401);
        }
    }

    // 登出
    public function logout(Request $request){

        Auth::invalidate($request->bearerToken());
        return response()->json([
            'message' => '已成功登出'
        ]);
    }
}
