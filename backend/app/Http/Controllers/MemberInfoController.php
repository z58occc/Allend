<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Throwable;

class MemberInfoController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    // }

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
            ->select('d_name','q_amount')->where('quote.mid',$mid);

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

    //  刪除接案紀錄
    public function delTakeCase(Request $request)
    {
        // $mid = Auth::guard('api')->id();
        $mid = $request->input('mid');
        if($mid){
            $selectQuote = $request->input('qid');
            DB::table('quote')
            ->where('mid',$mid)
            ->whereIn('qid',$selectQuote)->delete();
        }

    }

    // 獲取發案紀錄
    public function getPublishCase(Request $request)
    {
        $mid = $request->input('mid');
        if($mid){
            //發案
            $demmand_query = DB::table('demmand')
            ->select('d_name','d_required','d_amount','d_unit','created_at')
            ->where('mid',$mid);

            //發案進行中
            $demmand_progress_query = DB::table('established_case')
            ->select('c_name','c_amount','created_at')
            ->where('mid_service',$mid)
            ->where('c_status',1);

            //案件完成
            $demmand_completed_query = DB::table('established_case')
            ->select('c_name','c_amount','created_at')
            ->where('mid_service',$mid)
            ->where('c_status',2);

            if($request->has('demmandSearch')){
                $demmand_query->where('d_name','like','%'.$request->input('demmandSearch').'%');
            }

            if($request->has('demmandProgressSearch')){
                $demmand_progress_query->where('c_name','like','%'.$request->input('demmandProgressSearch').'%');
            }

            if($request->has('demmandCompletedSearch')){
                $demmand_completed_query->where('c_name','like','%'.$request->input('demmandCompletedSearch').'%');
            }

            $demmand_results = $demmand_query->get();
            $demmand_progress_results = $demmand_progress_query->get();
            $demmand_completed_results = $demmand_completed_query->get();

            if($demmand_results->count()<6){
                $demmand_paginated_results = $demmand_results;
            }else{
                $demmand_paginated_results = $demmand_query->paginate(6);
            }
            if($demmand_progress_results->count()<6){
                $demmand_progress_paginated_results = $demmand_progress_results;
            }else{
                $demmand_progress_paginated_results = $demmand_progress_query->paginate(6);
            }
            if($demmand_completed_results->count()<6){
                $demmand_completed_paginated_results = $demmand_completed_results;
            }else{
                $demmand_completed_paginated_results = $demmand_completed_query->paginate(6);
            }
            return response()->json([
                'demmand' => $demmand_paginated_results,
                'demmand_progress' => $demmand_progress_paginated_results,
                'demmand_completed' => $demmand_completed_paginated_results
            ]);

        }

    }

    // 刪除發案紀錄
    public function delPublishCase(Request $request)
    {
        if(Auth::guard('api')){
            $userId = Auth::guard('api')->id();

            $selectdemmand = $request->input('did');
            DB::table('demmand')->whereIn('did',$selectdemmand)
                                ->where('mid',$userId)
                                ->delete();

            return response()->json(['message'=>'刪除成功']);
        }

    }

    // 獲取服務管理頁面
    public function getService(Request $request)
    {
        // $mid = Auth::user()->mid;
        $mid = $request->input('mid');
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

    // 新增服務
    public function addService(Request $request)
    {
        // $Service_name = $request->Case_name;
        // $Service_type = $request->Case_type;
        // $LenghDate =$request->LenghDate;
        // $Money = $request->Money;
        // $Place = $request ->Place;

        $this->validate($request,[
            's_name'=>['required'], //服務名稱
            's_type'=>['required'], //類別
            's_description'=>['required'],//描述
            's_amount'=>['required'],//金額
            's_unit'=>['required'],//單位
            's_active_location'=>['required'],//地點
        ]);

        if(isset($request->image)){
            $data = $request->image ->get();
            $mime_type = $request->image->getMimeType();
            $imageData = base64_encode($data);
            // $src = "data: $mime_type;base64,$imageData";
        }

        $type = $request['s_type'];
        $catid = DB::table('category')->where('type',$type)->Value('catid');

        $active_location = $request['s_active_location'];
        $country = DB::table('country')->where('country_city',$active_location)->value('country_id');

        $service = DB::table('service')->insert([
            's_name'=>$request['s_name'],
            's_type'=>$catid,
            's_description'=>$request['s_description'],
            's_amount'=>$request['s_amount'],
            's_unit'=>$request['s_unit'],
            's_active_location'=>$country,
            'image'=>$imageData,
            'created_at'=>now(),
            'updated_at'=>now(),
        ]);
        return response($service);

    }

    // 刪除服務
    public function delService(Request $request)
    {
        if(Auth::guard('api')->id()){
            $userId = Auth::guard('api')->id();

            $selectservice = $request->input('sid');
            DB::table('service')->whereIn('sid',$selectservice)
                                ->where('mid',$userId)
                                ->delete();
            $selectproject = $request->input('pid');
            DB::table('project')->whereIn('pid',$selectproject)
                                ->where('mid',$userId)
                                ->delete();

            $selectvideo = $request->input('vid');
            DB::table('video')->whereIn('vid',$selectvideo)
                            ->where('mid',$userId)
                            ->delete();

            return response()->json(['message'=>'刪除成功']);
        }
    }

    // 新增作品
    public function addWork(Request $request)
    {
        $this->validate($request,[
            'p_name'=>['required'],
            'p_description'=>['required'],
            'mid'=>['required'],
        ]);

        if(isset($request->image)){
            $data = $request->image->get();
            $mime_type = $request->image->getMimeType();
            $imageData = base64_encode($data);
            // $src = "data: $mime_type;base64,$imageData";
        }
        $work = DB::table('project')->insert([
            'p_name'=>$request['p_name'],
            'p_description'=>$request['p_description'],
            'mid'=>$request['mid'],
            'image'=>$imageData,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        return response($work);

    }

    // 新增影音
    public function addVideo(Request $request)
    {
        $this->validate($request,[
            'v_name'=>['required'],
            'mid'=>['required'],
            'v_description'=>['required'],
            'src'=>['required']
        ]);

        $video = DB::table('video')->insert([
            'v_name'=> $request['v_name'],
            'v_description' =>$request['v_description'],
            'src'=>$request['src'],
            'mid'=>$request['mid'],
            'created_at'=>now(),
            'updated_at'=>now(),
        ]);
        return response($video);

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

