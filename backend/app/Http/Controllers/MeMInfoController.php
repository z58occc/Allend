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
        /* 發案 */
        // 刊登數
        $published = DB::table('demmand')->select(DB::raw('count(mid) as published_total'))
                                            ->where('mid', $user->mid)
                                            ->first();
        // 進行中
        $ongoing_demmand = DB::table('established_case')->select(DB::raw('count(cid) as demand_total'))
                                                ->where('mid_demmand', $user->mid)->where('c_status', 0)
                                                ->first();
        // 結案數
        $closed_demmand = DB::table('established_case')->select(DB::raw('count(cid) as closed_demmand_total'))
                                                ->where('mid_demmand', $user->mid)->where('c_status', 1)
                                                ->first();
        /* 接案 */
        // 接案數
        $taked = DB::table('service')->select(DB::raw('count(mid) as taked_total'))
                                        ->where('mid', $user->mid)
                                        ->first();
        // 進行中
        $ongoing_service = DB::table('established_case')->select(DB::raw('count(cid) as service_total'))
                                                ->where('mid_service', $user->mid)->where('c_status', 0)
                                                ->first();
        // 結案數
        $closed_service = DB::table('established_case')->select(DB::raw('count(cid) as closed_service_total'))
                                                        ->where('mid_service', $user->mid)->where('c_status', 1)
                                                        ->first();
        // 作為接案方的評價
        $service_rating = DB::table('established_case')->select(DB::raw('avg(demmand_star) as service_rating'))
                                                        ->where('mid_service', $user->mid)->where('c_status', 1)
                                                        ->first();
        // 作為發案方的評價
        $demmand_rating = DB::table('established_case')->select(DB::raw('avg(service_star) as demmand_rating'))
                                                        ->where('mid_demmand', $user->mid)->where('c_status', 1)
                                                        ->first();
        return response()->json([
            $published,
            $ongoing_demmand,
            $closed_demmand,
            $taked,
            $ongoing_service,
            $closed_service,
            $service_rating,
            $demmand_rating
        ]);
    }

    // 獲取會員資料
    public function getMemInfo(Request $request){
        try{
            $payload = JWTAuth::parseToken()->getPayload(); // 直接抓有沒有Bearer token，只能取得payload
        }catch(Throwable $err){
            // 要不要轉址到登入
            return response('無效的請求');
        }
        $user = Auth::user();
        $user_info = DB::table('members')->select(['email',
                                                    'identity',
                                                    'nickname',
                                                    'seniority',
                                                    'active_location',
                                                    'mobile_phone',
                                                    'name',
                                                    'id_card',
                                                    'gender',
                                                    'location',
                                                    ])
                                        ->where('mid', $user->mid)->first();
        return response()->json([
            // 看要撈什麼資料
            $user_info
        ]);
    }


    // 服務管理頁面
    public function getService(){

    }

    // 我的收藏
    public function getCollection(){

    }
}
        // identity: "",
        // experience: "",
        // location: "",
        // idCard: "",
        // email: "",
        // name: "",
        // phone: "",
        // gender: "",
        // area: "",
        // selectedDate: new Date(),


