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
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
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
            return response('註冊成功!');
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
        // die(var_dump($credentials));
        $token = auth('api')->attempt($credentials);
        // $token = auth();
        // ->claims(["address" => "台中市"]) // 補一筆資料進token
            // ->setTTL(120) // 設置過期時間，單位(整數)分鐘
            // ->attempt($credentials);

        die(var_dump($token));

        if(!$token){
            return response()->json([
                'message' => '未授權，請重新登入'
            ], 401);
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
}
