<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Throwable;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'update']]);
    }

    // 註冊api
    public function register(Request $request){
        // 先進行驗證跟錯誤處理
        try{
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string|min:6',
            ]);
        }
        catch (ValidationException $exception){
            return response('輸入資料格式有誤或是電子郵件已被註冊!');
        }
        // 插入資料庫，若重複會回傳錯誤訊息
        try{
            User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
            return response()->json([
                'message' => '註冊成功!',
            ]);
        }
        catch(Throwable $err){
            return response('email已被註冊過!');
        }
    }

    // 登入api
    public function login(Request $request){
        try{
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
        }
        catch (ValidationException $exception){
            return response('輸入資料格式錯誤');
        }
        $credentials = $request->only('email', 'password');
        // $token = auth()->attempt($credentials);
        $token = auth('api')
            ->setTTL(120) // 設置過期時間，單位(整數)分鐘
            ->attempt($credentials);

        if(!$token){
            return response()->json([
                'message' => '帳號或密碼錯誤'
            ]);
        }

        $user = Auth::user();
        return response()->json([
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    // 修改資料
    public function update(Request $request){
        return response()->json([
            'id' => $request->id,
            'avatar' => $request->avatar
        ]);
    }
}
