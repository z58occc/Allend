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
    public function register(Request $request)//:JsonResponse
    {
//         $email = 'john@example.com';
// return $maskedEmail = $email[0] . str_repeat('*', strlen(explode('@', $email)[0]) - 1) . '@' . explode('@', $email)[1];
        // 先進行驗證跟錯誤處理
        try{
            $request->validate([
                'email' => 'required|string|email|unique:members',
                // 'password' => ['required', 'confirmed', 'min:6', Rules\Password::defaults()],
                'password' => ['required', 'confirmed', 'min:6',],
            ]);
        }
        catch (ValidationException $exception){
            return response()->json([
                'message' => '輸入資料格式有誤或是電子郵件已被註冊!'
            ]);
        }
        // 插入資料庫，若重複會回傳錯誤訊息
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
        }
        catch(Throwable $err){
            return response()->json([
                'message' => '該信箱已被註冊過'
            ]);
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
                'error' =>'查無此帳號'
            ],422);
        }

        $credentials = $request->only('email', 'password');
        

        if(!Auth::attempt($credentials)){
            return response()->json([
                'error' => '帳號或密碼錯誤'
            ],401);
        }
        $token = auth()->setTTL(120)->attempt($credentials);
        $user = Auth::user();
        Member::where('mid', $user->mid)->update(['last_login' => now()]);

        return response()->json([
            'user_login_time' => now(),
            'token' => $token,
        ]);
    }

    // 登出
    public function logout(Request $request){
        Auth::invalidate($request->bearerToken());
        return response()->json([
            'message' => '已成功登出'
        ]);
    }

    //  // 從請求頭獲取 JWT
    //  $jwt = $request->bearerToken();

    //  if (!$jwt) {
    //      // 如果未提供 JWT，直接拒絕請求
    //      return response()->json(['error' => 'Token not provided.'], 401);
    //  }

    //  try {
    //      // 解碼並驗證 JWT
    //      $payload = JWT::decode($jwt, env('JWT_SECRET'), ['HS256']);

    //      // 驗證通過，可以在請求中添加用戶信息
    //      $request->merge(['user' => $payload->user]);
    //  } catch (ExpiredException $e) {
    //      // 處理 JWT 過期
    //      return response()->json(['error' => 'Provided token is expired.'], 400);
    //  } catch (SignatureInvalidException $e) {
    //      // 處理 JWT 簽名無效
    //      return response()->json(['error' => 'Invalid credentials.'], 400);
    //  } catch (Exception $e) {
    //      // 處理其他異常
    //      return response()->json(['error' => 'Could not decode token.'], 400);
    //  }

    //  // 繼續處理請求
    //  return $next($request);
}
