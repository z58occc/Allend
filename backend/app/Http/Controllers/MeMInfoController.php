<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Throwable;

class MeMInfoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    // 儀錶板
    public function dashboard(Request $request):JsonResponse
    {
        try{
            $payload = JWTAuth::parseToken()->getPayload(); // 直接抓有沒有Bearer token，只能取得payload
        }catch(Throwable $err){
            // 要不要加轉址
            return response('無效的請求');
        }
        $user = Auth::user();
        // 刊登數
        $published = DB::table('demmand')->select(DB::raw('Count(mid) as total'))
                                            ->where('mid', 20)
                                            ->first();
        //
        return response()->json([
            '刊登數' => $published->total
        ]);
    }
    // 獲取會員資料
    public function acquire(Request $request){
        try{
            $payload = JWTAuth::parseToken()->getPayload(); // 直接抓有沒有Bearer token，只能取得payload
        }catch(Throwable $err){
            // 要不要加轉址
            return response('無效的請求');
        }
        $user = Auth::user();
        return response()->json([
            'user' => $user->id,
        ]);
    }
}
