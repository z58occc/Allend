<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Throwable;

class MemberInfoController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware(['auth','verified',]);
    }

    // 獲取儀錶板
    public function dashboard(Request $request)
    {
        $user = Auth::user();
        /* 接案 */
        // 接案數
        $taked = DB::table('service')->select(DB::raw('count(mid) as taked_total'))
                                    ->where('mid', $user->mid)
                                    ->first();
        // 進行中
        $ongoing_service = DB::table('established_case')->select(DB::raw('count(cid) as service_total'))
                                                ->where('mid_service', $user->mid)->whereIn('c_status', [1, 3, 4])
                                                ->first();
        // 結案數
        $closed_service = DB::table('established_case')->select(DB::raw('count(cid) as closed_service_total'))
                                                        ->where('mid_service', $user->mid)->where('c_status', 2)
                                                        ->first();

        /* 發案 */
        // 刊登數
        $published = DB::table('demmand')->select(DB::raw('count(mid) as published_total'))
                                            ->where('mid', $user->mid)
                                            ->first();
        // 進行中
        $ongoing_demmand = DB::table('established_case')->select(DB::raw('count(cid) as demand_total'))
                                                ->where('mid_demmand', $user->mid)->whereIn('c_status', [1, 3, 4])
                                                ->first();
        // 結案數
        $closed_demmand = DB::table('established_case')->select(DB::raw('count(cid) as closed_demmand_total'))
                                                ->where('mid_demmand', $user->mid)->where('c_status', 2)
                                                ->first();

        // 作為接案方的評價星數
        if (DB::table('established_case')->where('mid_service', $user->mid)->where('c_status', 2)->exists()){
        $service_rating = DB::table('established_case')->select(DB::raw('round(avg(ifnull(demmand_star, 0))) as service_rating'))
                                                        ->where('mid_service', $user->mid)->where('c_status', 2)
                                                        ->first();
                                                    }
        else {$service_rating = ['service_rating' => 0];}
        // 作為接案方評價則數
        $service_comt = DB::table('established_case')->select(DB::raw('count(mid_service) as service_cmt'))
                                                      ->where('mid_service', $user->mid)->where('c_status', 2)
                                                      ->first();

        // 作為發案方的評價星數
        if (DB::table('established_case')->where('mid_demmand', $user->mid)->where('c_status', 2)->exists()){
        $demmand_rating = DB::table('established_case')->select(DB::raw('round(avg(ifnull(service_star, 0))) as demmand_rating'))
                                                        ->where('mid_demmand', $user->mid)->where('c_status', 2)
                                                        ->first();}
        else {$demmand_rating = ['demmand_rating' => 0];}

        // 作為發案方評價則數
        $demmand_comt = DB::table('established_case')->select(DB::raw('count(mid_demmand) as demmand_cmt'))
                                                        ->where('mid_demmand', $user->mid)->where('c_status', 2)
                                                        ->first();

        $data = [
            $taked,
            $ongoing_service,
            $closed_service,
            $published,
            $ongoing_demmand,
            $closed_demmand,
            $service_rating,
            $service_comt,
            $demmand_rating,
            $demmand_comt
        ];
        foreach ($data as $value){
            if($value === null){
                $value = 0;
            }
        }
        return response()->json($data);
    }

    // 獲取接案方資料
    public function getMemInfo(Request $request)
    {
        $mid = Auth::id();

        $user_info = DB::table('members')
        ->leftJoin('identity', 'members.identity', '=', 'identity.iid')
        ->leftJoin('country as c1', 'c1.country_id', '=', 'active_location')
        ->leftJoin('country as c2', 'c2.country_id', '=', 'location')
        ->select(['email', DB::raw('ifnull(i_identity, "") as identity'), DB::raw('ifnull(seniority, "") as experience'),
                DB::raw('ifnull(c1.country_city, "") as location'), DB::raw('ifnull(mobile_phone, "") as phone'),
                DB::raw('ifnull(name, "") as name'), DB::raw('ifnull(id_card, "") as idCard'),
                DB::raw('ifnull(gender, "") as gender'),DB::raw('ifnull(c2.country_city, "") as area'),
                DB::raw('ifnull(fb, "") as fb'), DB::raw('ifnull(line, "") as line')])
        ->where('mid', $mid)->first();

        return response()->json($user_info);
    }

    // 修改接案方資料
    public function updateMemInfo(Request $request)
    {
        $user_id = Auth::id();
        try{
            $request->validate([
                'identity' => "required",
                'experience' => "required",
                'location' => "required",
                'idCard' => "max:10",
                'name' => "required",
                'phone' => "required|max:10",
            ], [
                'identity.required' => '身分為必填欄位',
                'experience.required' => '年資為必填欄位',
                'location.required' => '接案地點為必填欄位',
                'idCard.max' => '身分證號請填寫10位',
                'name.required' => '姓名為必填欄位',
                'phone.required' => '手機號碼為必填欄位',
                'phone.max' => '手機號碼必須為10位'
            ]);
        } catch (ValidationException $exception){
            return response()->json($exception->errors(), 422);
        }

        $identity = DB::table('identity')->where('i_identity', $request->identity)->value('iid');
        $active_location = DB::table('country')->where('country_city', $request->location)->value('country_id');
        $location = DB::table('country')->where('country_city', $request->area)->value('country_id');

        try{
            Member::where('mid', $user_id)->update([
                'identity' => $identity,
                'seniority' => $request->experience,
                'active_location' => $active_location,
                'mobile_phone' => $request->phone,
                'name' => $request->name,
                'id_card' => $request->idCard !== null ? $request->idCard : null,
                'gender' => $request->gender !== null ? $request->gender : null,
                'location' => $location !== null ? $location : null,
                'fb' => $request->fb !== null ? $request->fb : null,
                'line' => $request->line !== null ? $request->line : null,
                'updated_at' => now(),
            ]);
            return response()->json([
                'error' => '修改成功'
            ], 200);
        }catch(Throwable $err){
            return response()->json([
                'error' => '修改失敗'
            ]);
        }
    }

    // 獲取發案方資料
    public function getDemmandInfo()
    {
        $user = Auth::user();
        $user_info = DB::table('members')
        ->select(['email', DB::raw('ifnull(mobile_phone, "") as phone'), DB::raw('ifnull(name, "") as name')])
        ->where('mid', $user->mid)->first();

        return response()->json($user_info);
    }

    // 修改發案方資料
    public function updateDemmandInfo(Request $request)
    {
        $user_id = Auth::id();
        try{
            $request->validate([
                'phone' => 'required',
                'name' => 'required',
            ]);
        } catch (ValidationException $exception){
            return response()->json([
                'error' => '缺少必填欄位'
            ], 422);
        }

        try{
            Member::where('mid', $user_id)->update([
                'mobile_phone' => $request->phone,
                'name' => $request->name,
                'updated_at' => now(),
            ]);
        }catch(Throwable $err){
            return response()->json([
                'error' => '修改失敗'
            ], 409);
        }
        return response()->json([
            'error' => '修改成功'
        ], 200);
    }

    // 修改密碼
    public function updatePassword(Request $request)
    {
        $user = Auth::user();
        try{
            $request->validate([
                'oldpassword' => ['required'],
                'password' => ['required', 'confirmed', 'min:8']
            ],[
                'oldpassword' => '舊密碼為必填欄位',
                'password' => '新密碼為必填欄位',
                'password.confirmed' => "新密碼與確認新密碼不一致",
                'password.min' => '新密碼至少8個字元'
            ]);
        }catch (ValidationException $exception){
            return response()->json($exception->errors(), 422);
        }

        if(Hash::check($request->oldpassword, $user->password)){
            Member::where('mid', $user->mid)->update(['password' => Hash::make($request->password)]);

            return response()->json([
                'message' => '修改密碼成功'
            ],200);
        }
        return response()->json([
            'error' => '舊密碼有誤，請重新輸入'
        ],409);
    }

    // 獲取頭像、姓名
    public function getAvatar(Request $request)
    {
        $mid = Auth::id();
        $result = DB::table('members')->where('mid', $mid)
        ->select(DB::raw('ifnull(avatar, "") as image'), DB::raw('ifnull(name, "") as name'))->get();

        return response()->json($result);
    }

    // 修改頭像
    public function updateAvatar(Request $request)
    {
        // $request->validate([
        //     'image' => 'required|mimes:jpeg,png'
        // ]);

        // $a = base64_encode(file_get_contents($request->file('image')->getRealPath()));

        if ($request->image !== null && $mid = Auth::id())
        {
            DB::table('members')->where('mid', $mid)->update(['avatar' => $request->image]);
            return response()->json([
                'message' => '更新成功'
            ], 200);
        }
        return response()->json([
            'error' => '更新失敗'
        ], 409);
    }

    // 獲取接案紀錄
    public function getTakeCase(Request $request)
    {
        $mid = Auth::id();

        // 報價但尚未被接受的紀錄
        $Quote_query = DB::table('quote')
        ->join('demmand','quote.did','=','demmand.did')
        ->join('category', 'catid', '=', 'demmand.d_type')
        ->join('country', 'country_id', '=', 'd_active_location')
        ->select('qid', 'd_name','type','q_amount','d_unit', 'q_message','demmand.did' ,'d_duration', 'country_city as active_location', 'd_description',
        'd_contact_name', 'd_email', 'd_mobile_phone', DB::raw('date_format(created_at, "%Y/%m/%d") as created_at'))
        ->where('quote.mid',$mid);

        // 接案進行中
        $Case_in_progress_query = DB::table('established_case')
        ->join('category', 'catid', '=', 'c_type')
        ->join('country', 'country_id', '=', 'c_active_location')
        ->select('cid', 'c_name','type', 'c_status', 'c_amount','c_unit','c_duration','country_city as active_location',
        'c_description','c_contact_name', 'c_email', 'c_mobile_phone',DB::raw('date_format(created_at, "%Y/%m/%d") as created_at'))
        ->where('mid_service',$mid)
        ->whereIn('c_status',[1, 3 ,4]);

        // 接案已結案
        $Case_completed_query = DB::table('established_case')
        ->join('category', 'catid', '=', 'c_type')
        ->join('country', 'country_id', '=', 'c_active_location')
        ->select('cid', 'c_name','type','c_amount','c_unit','c_contact_name', 'c_email', 'c_mobile_phone',DB::raw('ifnull(demmand_star, "") asdemmand_star'),
        DB::raw('ifnull(demmand_comment, "") as demmand_comment'),DB::raw('ifnull(date_format(demmand_time, "%Y/%m/%d"), "") as demmand_time'),
        DB::raw('ifnull(service_star, "") as service_star'),DB::raw('ifnull(service_comment, "") as service_comment'),DB::raw('ifnull(date_format(service_time, "%Y/%m/%d"), "") as service_time'),
        DB::raw('date_format(created_at, "%Y/%m/%d") as created_at'),DB::raw('date_format(completed_time, "%Y/%m/%d") as completed_time'))
        ->where('mid_service',$mid)
        ->where('c_status',2);

        // 接案搜尋
        if($request->has('QuoteSearch')){
            $Quote_query->where('d_name','like','%'.$request->input('QuoteSearch').'%');
        }
        // 接案進行中搜尋
        if($request->has('CaseInProgressSearch')){
            $Case_in_progress_query->where('c_name','like','%'.$request->input('CaseInProgressSearch').'%');
        }
        // 接案結案搜尋
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

    // 編輯接案紀錄
    public function updateTakeCase(Request $request)
    {
        if(Auth::id()){
            try{
                $request->validate([
                    'amount' => 'required'
                ]);
            } catch (ValidationException $exception){
                return response()->json([
                    'error' => '金額為必填欄位'
                ], 422);
            }
            try{
                $new = DB::table('quote')->where('did', $request->did)
                ->where('qid', $request->qid)
                ->update([
                    'q_amount' => $request->amount,
                    'q_message' => $request->message !== null ? $request->message : "",
                ]);
                return response()->json([
                    'message' => '更新成功'
                ], 200);
            }catch (Throwable $err){
                return response()->json([
                    'error' => '更新失敗'
                ], 409);
            }
        }
    }

    // 刪除接案紀錄
    public function delTakeCase(Request $request)
    {
        $mid = Auth::id();
        if($mid){
            try {
                $request->validate([
                    'qid' => 'required'
                ]);
            }catch(ValidationException $exception){
                return response()->json([
                    'error' => $exception->errors()
                ], 422);
            }
            $selectQuote = $request->input('qid');
            try{
                DB::table('quote')
                ->where('mid',$mid)
                ->where('qid',$selectQuote)->delete();
                return response()->json([
                    'error' => '刪除成功'
                ], 200);
            }catch (Throwable $err){
                return response()->json([
                    'error' => '刪除失敗'
                ], 409);
            }
        }
    }

    // 獲取發案紀錄
    public function getPublishCase(Request $request)
    {
        $mid = Auth::id();
        if($mid){
            // 刊登紀錄
            $demmand_query = DB::table('demmand')
            ->join('category', 'catid', '=', 'd_type')
            ->join('country', 'country_id', '=', 'd_active_location')
            ->select('did','d_name','type','d_amount','d_unit','d_duration', 'country_city as active_location','d_description',
            'd_contact_name', 'd_email', 'd_mobile_phone', DB::raw('date_format(created_at, "%Y/%m/%d") as created_at'),
            DB::raw('date_format(updated_at, "%Y/%m/%d") as updated_at'))
            ->where('mid',$mid)->orderBy('updated_at', 'desc')->orderBy('did', 'desc');
            // 發案進行中
            $demmand_progress_query = DB::table('established_case')
            ->join('category', 'catid', '=', 'c_type')
            ->join('country', 'country_id', '=', 'c_active_location')
            ->select('cid', 'c_name','type', 'c_status', 'c_amount','c_unit','c_duration','country_city as active_location',
            'c_description','c_contact_name', 'c_email', 'c_mobile_phone',DB::raw('date_format(created_at, "%Y/%m/%d") as created_at'))
            ->where('mid_demmand',$mid)->whereIn('c_status',[1, 3, 4])
            ->orderBy('created_at', 'desc')->orderBy('cid', 'desc');

            // 發案已結案
            $demmand_completed_query = DB::table('established_case')
            ->join('category', 'catid', '=', 'c_type')
            ->join('country', 'country_id', '=', 'c_active_location')
            ->select('cid', 'c_name','type','c_amount','c_unit','c_contact_name', 'c_email', 'c_mobile_phone','service_star',DB::raw('ifnull(demmand_star, "") asdemmand_star'),
            DB::raw('ifnull(demmand_comment, "") as demmand_comment'),DB::raw('ifnull(date_format(demmand_time, "%Y/%m/%d"), "") as demmand_time'),
            DB::raw('ifnull(service_star, "") as service_star'),DB::raw('ifnull(service_comment, "") as service_comment'),DB::raw('ifnull(date_format(service_time, "%Y/%m/%d"), "") as service_time'),
            DB::raw('date_format(created_at, "%Y/%m/%d") as created_at'),DB::raw('date_format(completed_time, "%Y/%m/%d") as completed_time'))
            ->where('mid_demmand',$mid)->where('c_status',2)
            ->orderBy('completed_time', 'desc')->orderBy('cid', 'desc');

            // 發案刊登搜尋
            if($request->has('demmandSearch')){
                $demmand_query
                ->where('d_name','like','%'.$request->input('demmandSearch').'%');
            }
            // 發案進行中搜尋
            if($request->has('demmandProgressSearch')){
                $demmand_progress_query->where('c_name','like','%'.$request->input('demmandProgressSearch').'%');
            }
            // 發案結案搜尋
            if($request->has('demmandCompletedSearch')){
                $demmand_completed_query->where('c_name','like','%'.$request->input('demmandCompletedSearch').'%');
            }

            return response()->json([
                'demmand_published' => $demmand_query->get(),
                'demmand_progress' => $demmand_progress_query->get(),
                'demmand_completed' => $demmand_completed_query->get()
            ]);
        }
    }

    // 編輯發案刊登
    public function updatePublishCase(Request $request)
    {
        if(Auth::id()){
        try{
            $request->validate([
                'index' => 'required',
                'case_name' => 'required',
                'type' => 'required',
                'amount' => 'required',
                'unit' => 'required|string',
                'duration' => 'required',
                'location' => 'required',
                'details' => 'required | min:10',
                'contact_name' => 'required',
                'email' => 'required',
                'phone' => 'required | max:10',
            ], [
                'case_name.required' => '案件名稱為必填欄位',
                'type.required' => '案件類型為必填欄位',
                'amount.required' => '金額為必填欄位',
                'unit.required' => '單位為必填欄位',
                'unit.string' => '單位為字串',
                'duration.required' => '案件期程為必填欄位',
                'location.required' => '案件地點為必填欄位',
                'details.required' => '案件描述為必填欄位',
                'details.min' => '案件描述至少十個字',
                'contact_name.required' => '聯絡人姓名為必填欄位',
                'email.required' => '電子郵件為必填欄位',
                'phone.required' => '手機號碼為必填欄位',
                'phone.max' => '手機號碼至多為10位'
            ]);
        }catch (ValidationException $exception){
            return response()->json($exception->errors(), 422);
        }

        $type = DB::table('category')->where('type', $request->type)->value('catid');
        $location = DB::table('country')->where('country_city', $request->location)->value('country_id');

        try{
            $new = DB::table('demmand')->where('did', $request->index)
            ->update([
                'd_name' => $request->case_name,
                'd_type' => $type,
                'd_duration' => $request->duration,
                'd_description' => $request->details,
                'd_amount' => $request->amount,
                'd_unit' => $request->unit,
                'd_active_location' => $location,
                'd_contact_name' => $request->contact_name,
                'd_email' => $request->email,
                'd_mobile_phone' => $request->phone,
                'updated_at' => now(),
            ]);
            return response()->json([
                'mnessage' => '更新成功'
            ], 200);
        }catch(Throwable $err){
            return response()->json([
                'error' => '更新失敗'
            ], 409);
        }
    }
    }

    // 刪除發案刊登紀錄
    public function delPublishCase(Request $request)
    {
        if($userId = Auth::id()){
            try{
                $request->validate([
                    'did' => 'requierd'
                ]);
            }catch(ValidationException $exception){
                return response()->json([
                    'error' => $exception->errors()
                ]);
            }

            $selectdemmand = $request->input('did');
            try{
                DB::table('demmand')->whereIn('did',[$selectdemmand])
                                    ->where('mid',$userId)
                                    ->delete();

                return response()->json(['message'=>'刪除成功']);
            }catch (Throwable $err){
                return response()->json([
                    'error' => '刪除失敗'
                ]);
            }
        }
    }

    // 獲取服務管理頁面(服務、作品、影音)
    public function getServicePage(Request $request)
    {
        $mid = Auth::id();
        if($mid){
            $service_query = DB::table('service')
            ->join('category', 'catid', '=', 's_type')
            ->join('country', 'country_id', '=', 's_active_location')
            ->select('sid', 'image', 's_name', 'type', 's_description', 's_amount', 's_unit',
            'country_city as s_active_location', DB::raw('date_format(updated_at, "%Y/%m/%d") as updated_at'))
            ->where('mid',$mid);

            $project_query = DB::table('project')->select('pid','image','p_name','p_description',
            DB::raw('date_format(updated_at, "%Y/%m/%d") as updated_at')) ->where('mid',$mid);

            $video_query = DB::table('video')->select('vid','src','v_name','v_description',
            DB::raw('date_format(updated_at, "%Y/%m/%d") as updated_at'))->where('mid',$mid);

            // 服務搜尋
            if($request->has('servicesearch')){
                $service_query->where('s_name','like','%'.$request->input('servicesearch').'%');
            }
            // 作品搜尋
            if($request->has('projectsearch')){
                $project_query->where('p_name','like','%'.$request->input('projectsearch').'%');
            }
            // 影音搜尋
            if($request->has('videosearch')){
                $video_query->where('v_name','like','%'.$request->input('videosearch').'%');
            }

            // 分頁顯示
            // $service_results = $service_query->paginate(4);
            // $project_results =  $project_query->paginate(6);
            // $video_results = $video_query->paginate(6);
            return response()->json([
                'service' => $service_query->get(),
                'project' => $project_query->get(),
                'video' => $video_query->get(),
            ]);
        }
    }

    // 新增服務
    public function addService(Request $request)
    {
        $mid = Auth::id();
        try{
            $this->validate($request,[
                's_name'=>['required'], //服務名稱
                's_type'=>['required'], //類別
                's_description'=>['required'],//描述
                's_amount'=>['required'],//金額
                's_unit'=>['required'],//單位
                's_active_location'=>['required'],//地點
            ]);
        }catch (ValidationException $exception){
            return response()->json([
                'error' => $exception->errors()
            ]);
        }

        $imageData = "";
        if(isset($request->image)){
            $data = $request->image ->get();
            $mime_type = $request->image->getMimeType();
            $imageData = base64_encode($data);

            // $src = "data: $mime_type;base64,$imageData";
        }

        $type = $request['s_type'];
        $catid = DB::table('category')->where('type',$type)->value('catid');

        $active_location = $request['s_active_location'];
        $country = DB::table('country')->where('country_city',$active_location)->value('country_id');

        try{
            $service = DB::table('service')->insert([
                'mid' => $mid,
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
            return response()->json([
                'message' => '新增成功'
            ]);
        }catch(Throwable $err){
            return response()->json([
                'error' => '新增失敗'
            ]);
        }
    }

    // 編輯服務
    public function updateService(Request $request){
        try{
            $request->validate([
                'image' => ['required', 'mimes:jpg,png,svg', 'file']
            ]);
        }catch (ValidationException $exception){
            return response()->json([
                'error' => $exception->errors()
            ]);
        }

        if(isset($request->image)){
            $data = $request->image ->get();
            $mime_type = $request->image->getMimeType();
            $imageData = base64_encode($data);
            // $src = "data: $mime_type;base64,$imageData";
        }
        try{
            $update = DB::table('service')->where('sid', $request->sid)->update(['image' => $imageData]);

            return response()->json([
                'message' => '編輯成功'
            ]);
        }catch(Throwable $err){
            return response()->json([
                'error' => '編輯失敗'
            ]);
        }
    }

    // 刪除服務
    public function delService(Request $request)
    {
        if(Auth::id()){
            $userId = Auth::id();
            try{
                $request->validate([
                    'sid' => 'required'
                ]);
            }catch (ValidationException $exception){
                return response()->json([
                    'error' => '未選擇要刪除的服務'
                ]);
            }
            try{
                $del = DB::table('service')
                ->whereIn('sid',[$request->input('sid')])->where('mid',$userId)
                ->delete();

                return response()->json(['message'=>'刪除服務成功']);
            }catch (Throwable $err){
                return response()->json([
                    'error' => '刪除服務失敗'
                ]);
            }
        }
    }

    // 新增作品
    public function addWork(Request $request)
    {
        $mid = Auth::id();
        try{
            $this->validate($request,[
                'p_name'=>['required'],
                'image'=>['required'],
                'p_description'=>['required'],
            ]);
        }catch (ValidationException $exception){
            return response()->json($exception->errors(),422);
        }

        if($request->hasFile('image')){
            $data = $request->image->get();
            $imageData = base64_encode($data);
        }
        try {
            $work = DB::table('project')->insert([
                'p_name'=>$request['p_name'],
                'p_description'=>$request['p_description'],
                'mid'=>$mid,
                'image'=>$imageData,
                'created_at'=>now(),
                'updated_at'=>now()
            ]);
            return response()->json([
                'message' => '新增成功'
            ]);
        }catch (Throwable $err){
            return response()->json([
                'error' => '新增失敗'
            ]);
        }
    }

    // 編輯作品
    public function updateWork(Request $request){
        $mid = Auth::id();
        try{
            $request->validate([
                'pid' => ['required'],
                'image'=>['required'],
                'p_name'=>['required'],
                'p_description'=>['required'],
            ]);
        }catch (ValidationException $exception){
            return response()->json($exception->errors());
        }

        if (isset($request->image)) {
            $data = $request->image->get();
            $imageData = base64_encode($data);
        }
        try{
            $result = DB::table('project')->where('mid', $mid)->where('pid', $request->pid)
            ->update([
                'p_name' => $request->p_name,
                'p_description' => $request->p_description,
                'image' => $imageData,
                'updated_at' => now()
            ]);
            return response()->json([
                'message' => '編輯成功'
            ]);
        }catch (Throwable $err){
            return response()->json([
                'error' => '編輯失敗'
            ]);
        }
    }

    // 刪除作品
    public function delWork(Request $request)
    {
        $mid = Auth::id();

        try{
            $request->validate([
            'pid' => 'required'
            ]);
        }catch (ValidationException $exception){
            return response()->json(
                // 'error' => '未選擇要刪除的作品'
                $exception->errors()
            );
        }
        try{
            $del = DB::table('project')
            ->whereIn('pid', [$request->input('pid')])->where('mid', $mid)
            ->delete();

            return response()->json([
                'message' => '刪除作品成功'
            ]);
        }catch(Throwable $err){
            return response()->json([
                'error' => '刪除作品失敗'
            ]);
        }
    }

    // 新增影音
    public function addVideo(Request $request)
    {
        $mid = Auth::id();
        try{
            $this->validate($request,[
                'v_name'=>['required'],
                'v_description'=>['required'],
                'src'=>['required']
            ]);
        }catch(ValidationException $exception){
            return response()->json([
                'error' => $exception->errors()
            ]);
        }
        try{
            $video = DB::table('video')->insert([
                'v_name'=> $request->input('v_name'),
                'v_description' =>$request->input('v_description'),
                'src'=>$request->input('src'),
                'mid'=>$mid,
                'created_at'=>now(),
                'updated_at'=>now(),
            ]);
            return response()->json([
                'message' => '新增影音成功'
            ]);
        }catch(Throwable $err){
            return response()->json([
                'error' => '新增影音失敗'
            ]);
        }
    }

    // 編輯影音
    public function updateVideo(Request $request){
        $mid = Auth::id();
        try{
            $request->validate([
                'vid' => ['required'],
                'v_name'=>['required'],
                'v_description'=>['required'],
                'src'=>['required']
            ]);
        }catch(ValidationException $exception){
            return response()->json([
                'error' => $exception->errors()
            ]);
        }
        try{
            $result = DB::table('video')->where('mid', $mid)->where('vid', $request->vid)
            ->update([
                'v_name' => $request->v_name,
                'v_description' => $request->v_description,
                'src' => $request->src,
                'updated_at' => now()
            ]);
            return response()->json([
                'message' => '編輯影音成功'
            ]);
        }catch(Throwable $err){
            return response()->json([
                'error' => '編輯影音失敗'
            ]);
        }
    }

    // 刪除影音
    public function delVideo(Request $request)
    {
        $mid = Auth::id();

        try{
            $request->validate([
                'vid' => 'required'
            ]);
        }catch (ValidationException $exception){
            return response()->json([
                'error' => '未選擇要刪除的影音'
            ], 422);
        }

        try{
            $del = DB::table('video')
            ->whereIn('vid',[$request->input('vid')])->where('mid',$mid)
            ->delete();
            return response()->json([
                'message' => '刪除影音成功'
            ]);
        }catch(Throwable $err){
            return response()->json([
                'error' => '刪除影音失敗'
            ]);
        }
    }

    // 獲取我的收藏
    public function getCollection(Request $request)
    {
        $mid = Auth::id();
        if($mid){
            // 案件收藏
            $case_collections = DB::table('collection')
            ->join('demmand', 'demmand.did', '=', 'collection.did')
            ->join('members', 'demmand.mid', '=', 'members.mid')
            ->select('fid', 'collection.did','demmand.mid', 'name','d_name','d_duration','d_amount', 'd_unit',
            DB::raw('date_format(collection.created_at, "%Y/%m/%d") as created_at'))
            ->where('collection.mid', $mid)->orderBy('created_at', 'desc')->orderBy('fid', 'desc');

            // 服務收藏
            $service_collections = DB::table('collection')
            ->join('service', 'service.sid', '=', 'collection.sid')
            ->join('members', 'service.mid', '=', 'members.mid')
            ->select('fid','collection.sid','service.mid', 'name','s_name','s_amount', 's_unit',
            DB::raw('date_format(collection.created_at, "%Y/%m/%d") as created_at'))
            ->where('collection.mid', $mid)->orderBy('created_at', 'desc')->orderBy('fid', 'desc');

            // 案件收藏搜尋
            if($request->has('casecollectionsearch')){
                $case_collections->where('d_name','like','%'.$request->input('casecollectionsearch').'%');
            }
            // 服務收藏搜尋
            if($request->has('servicecollectionsearch')){
                $service_collections->where('s_name','like','%'.$request->input('servicecollectionsearch').'%');
            }

            // 分頁顯示
            // $service_results = $service_query->paginate(4);
            // $project_results =  $project_query->paginate(6);
            // $video_results = $video_query->paginate(6);
            return response()->json([
                'case' => $case_collections->get(),
                'service' => $service_collections->get(),
            ]);
        }
    }

    // 新增收藏
    public function addCollection(Request $request)
    {
        $mid = Auth::id();
        if ($request->did !== null){
            try{
                $request->validate([
                    'did' => 'required'
                ]);
            }catch(ValidationException $exception){
                return response()->json([
                    'error' => '未選擇要收藏的案件'
                ], 422);
            }

            try{
                DB::table('ocllection')->insert([
                    'did' => $request->input('did'),
                    'mid' => $mid
                ]);
                return response()->json([
                    'message' => '收藏成功'
                ]);
            }catch (Throwable $err){
                return response()->json([
                    'error' => '收藏服務失敗'
                ], 409);
            }
        }elseif($request->sid !== null){
             try{
                 $request->validate([
                     'sid' => 'required'
                 ]);
             }catch(ValidationException $exception){
                 return response()->json([
                     'error' => '未選擇要收藏的服務'
                 ], 422);
             }
             try{
                DB::table('ocllection')->insert([
                    'sid' => $request->input('sid'),
                    'mid' => $mid
                ]);
                return response()->json([
                    'message' => '收藏成功'
                ]);
            }catch (Throwable $err){
                return response()->json([
                    'error' => '收藏服務失敗'
                ], 409);
            }
         }

    }

    // 取消收藏
    public function delCollection(Request $request)
    {
        $mid = Auth::id();
        try {
            $request->validate([
                'fid' => 'required'
            ]);
        }catch (ValidationException $exception){
            return response()->json([
                'error' => '未選擇要取消的收藏'
            ]);
        }

        try{
            DB::table('collection')->where('fid', $request->input('fid'))->delete();
            return response()->json([
                'message' => '取消收藏成功'
            ]);
        }catch (Throwable $err){
            return response()->json([
                'error' => '取消收藏失敗'
            ]);
        }
    }
}


