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

    // 獲取儀錶板
    public function dashboard(Request $request):JsonResponse
    {
        return "OK";
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

    // 獲取接案紀錄
    public function getTakeCase(Request $request)
    {
        // $mid = Auth::guard('api')->id();
        $mid = $request->input('mid');
        if($mid){
            $Quote_query = DB::table('quote')
            ->join('demmand','quote.did','=','demmand.did')
            ->select('demmand.d_name','q_amount')->where('quote.mid',$mid);

            $Case_in_progress_query = DB::table('established_case')
            ->select('c_name','c_amount')
            ->where('mid_service',$mid)
            ->where('c_status',1);

            $Case_completed_query = DB::table('established_case')
            ->select('c_name','c_amount')
            ->where('mid_service',$mid)
            ->where('c_status',2);

            //接案搜尋
            if($request->has('QuoteSearch')){
                $Quote_query->where('d_name','like','%'.$request->input('QuoteSearch').'%');
            }
            //接案進行中搜尋
            if($request->has('CaseInProgressSearch')){
                $Case_in_progress_query->where('c_name','like','%'.$request->input('CaseInProgressSearch').'%');
            }

            if($request->has('CaseCompletedSearch')){
                $Case_completed_query->where('c_name','like','%'.$request->input('CaseCompletedSearch').'%');
            }

            //分頁顯示
            $Quote_results = $Quote_query->get();
            $Case_in_progress_results = $Case_in_progress_query->get();
            $Case_completed_results = $Case_completed_query->get();

            if($Quote_results->count()<6){
                $Quote_paginated_results = $Quote_results;
            }else{
                $Quote_paginated_results = $Quote_query->paginate(6);
            }

            if($Case_in_progress_results->count()<6){
                $Case_in_progress_paginated_results = $Case_in_progress_results;
            }else{
                $Case_in_progress_paginated_results = $Case_in_progress_query->paginate(6);
            }
            if($Case_completed_results->count()<6){
                $Case_completed_paginated_results = $Case_completed_results;
            }else{
                $Case_completed_paginated_results = $Case_completed_query->paginate(6);
            }
            return response()->json([
                'Quote' => $Quote_paginated_results,
                'CaseInProgress' => $Case_in_progress_paginated_results,
                'CaseCompleted' => $Case_completed_paginated_results,
            ]);

        }

    }

    // 獲取發案紀錄
    public function getCommitCase(Request $request)
    {
        $mid = Auth::user()->mid;

    }

    // 獲取服務管理頁面
    public function getService(Request $request)
    {
        $mid = Auth::user()->mid;
        // $mid = $request->input('mid');
        if($mid){
            $service_query = DB::table('service')->select('s_name')->where('mid',$mid);

            $project_query = DB::table('project')->select('p_name','image')->where('mid',$mid);

            $video_query = DB::table('video')->select('v_name','src')->where('mid',$mid);

            //服務搜尋
            if($request->has('servicesearch')){
                $service_query->where('s_name','like','%'.$request->input('servicesearch').'%');
            }
            //作品搜尋
            if($request->has('projectsearch')){
                $project_query->where('p_name','like','%'.$request->input('projectsearch').'%');
            }
            //影音搜尋
            if($request->has('videosearch')){
                $video_query->where('v_name','like','%'.$request->input('videosearch').'%');
            }

            //分頁顯示
            $service_results = $service_query->paginate(4);
            $project_results =  $project_query->paginate(6);
            $video_results = $video_query->paginate(6);
            return response()->json([
                'service' => $service_results,
                'project' => $project_results,
                'video' => $video_results,
            ]);
        }
    }

    // 刪除服務
    public function delService(Request $request)
    {
        $mid = Auth::user()->mid;
        // $mid = $request->input('mid');
        if($mid){
            $selectservice = $request->input('sid');
            DB::table('service')->whereIn('sid',$selectservice)->delete();

            $selectproject = $request->input('pid');
            DB::table('project')->whereIn('pid',$selectproject)->delete();

            $selectvideo = $request->input('vid');
            DB::table('video')->whereIn('vid',$selectvideo)->delete();

            return response()->json(['message'=>'刪除成功']);
        }
    }

    // 獲取我的收藏
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


