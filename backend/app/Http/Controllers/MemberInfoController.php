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
        $this->middleware(['auth','verified']);
    }

    // 獲取儀錶板
    public function dashboard(Request $request)//:JsonResponse
    {
        $user = Auth::user();
        /* 接案 */
        // 接案數
        $taked = DB::table('service')->select(DB::raw('count(mid) as taked_total'))
                                    ->where('mid', $user->mid)
                                    ->first();
        // 進行中
        $ongoing_service = DB::table('established_case')->select(DB::raw('count(cid) as service_total'))
                                                ->where('mid_service', $user->mid)->where('c_status', 1)
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
                                                ->where('mid_demmand', $user->mid)->where('c_status', 1)
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
        // try{
        //     $payload = JWTAuth::parseToken()->getPayload(); // 直接抓有沒有Bearer token，只能取得payload
        // }catch(Throwable $err){
        //     // 要不要轉址到登入
        //     return response('無效的請求');
        // }
        $user = Auth::user();
        $user_info = DB::table('members')
        ->join('identity', 'members.identity', '=', 'identity.iid')
        ->join('country as c1', 'c1.country_id', '=', 'active_location')
        ->join('country as c2', 'c2.country_id', '=', 'location')
        ->select(['email', 'i_identity as identity', 'seniority as experience',
                'c1.country_city as locations', 'mobile_phone as phone', 'name', 'id_card as idCard',
                'gender','c2.country_city as area',])
        ->where('mid', $user->mid)->first();
        // 確保沒有null值出去
        foreach($user_info as $key => &$value){
            if ($value === null){
                $user_info->$key = "";
            }
        }
        return response()->json($user_info);
    }

    // 修改接案方資料
    public function updateMemInfo(Request $request)
    {
        $user_id = Auth::id();
        $request->validate([
            'identity' => "required",
            'experience' => "required",
            'locations' =>"required",
            'idCard' => "required|max:10",
            'name' => "required",
            'phone' =>"required|max:10",
            'gender' => "required",
            'area' => "required",
        ]);

        try{
            Member::where('mid', $user_id)->update([
                'identity' => $request->identity,
                'seniority' => $request->exprience,
                'active_location' => $request->location,
                'mobile_phone' => $request->phone,
                'name' => $request->name,
                'id_card' => $request->idCard,
                'gender' => $request->gender,
                'location' => $request->area,
                'updated_at' => now(),
            ]);
        }catch(Throwable $err){
            return response()->json([
                'message' => '修改失敗'
            ]);
        }
        return response()->json([
            'message' => '修改成功'
        ]);
    }

    // 獲取發案方資料
    public function getDemmandInfo()
    {
        $user = Auth::user();
        $user_info = DB::table('members')
        ->select(['email', 'mobile_phone as phone', 'name',])
        ->where('mid', $user->mid)->first();
        // 確保沒有null值出去
        foreach($user_info as $key => &$value){
            if ($value === null){
                $user_info->$key = "";
            }
        }
        return response()->json($user_info);
    }

    // 修改發案方資料
    public function updateDemmandInfo(Request $request)
    {
        $user_id = Auth::id();
        $request->validate([
            'phone' => 'required',
            'name' => 'required',
        ]);

        try{
            Member::where('mid', $user_id)->update([
                'mobile_phone' => $request->phone,
                'name' => $request->name,
                'updated_at' => now(),
            ]);
        }catch(Throwable $err){
            return response()->json([
                'message' => '修改失敗'
            ]);
        }
        return response()->json([
            'message' => '修改成功'
        ]);
    }
    // public function update(ProfileUpdateRequest $request): RedirectResponse
    // {
    //     // 會跑去檢查rules，回傳json字串，fill()參考User內的$fillable對應值傳入資料庫
    //     $validated = $request->validated();
    //     if (isset($request->image)){
    //         $data = $request->image->get();
    //         $mime_type = $request->image->getMimeType(); // 回傳格式字串
    //         $imageData = base64_encode($data);
    //         $src = "data: $mime_type;base64, $imageData";// img tag 所需的標籤格式
    //         $validated['image'] = $src; // 補上image資料，跳過驗證
    //     }
    //     $request->user()->fill($validated);

        // if ($request->user()->isDirty('email')) {
        //     $request->user()->email_verified_at = null;
        // }

    //     $request->user()->save();

    //     return Redirect::route('profile.edit')->with('status', 'profile-updated');
    // }

    // 修改密碼
    public function updatePassword(Request $request)
    {
        $user = Auth::user();
        try{
            $request->validate([
                'oldpassword' => ['required'],
                'password' => ['required', 'confirmed', ]
            ]);
        }catch (Throwable $err){
            return response()->json([
                'message' => '資料不正確，重新輸入'
            ]);
        }

        if(Hash::check($request->oldpassword, $user->password)){
            DB::update([
                'password' => Hash::make($request->password)
            ]);
        }else{
            return response()->json([
                'message' => '舊密碼有誤，請重新輸入'
            ]);
        }
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
        try{
            $request->validate([
            'image' => ['required', 'mimes:jpg,png,svg', 'file']
        ]);
        }catch(Throwable $err){
            return response()->json([
                'error' => '圖片不符合格式'
            ]);
        }

        if ($request->image !== null && $mid = Auth::id())
        {
            DB::table('members')->where('mid', $mid)->update(['avatar' => $request->image]);
            return response()->json([
                'message' => '更新成功'
            ]);
        }
        return response()->json([
            'message' => '更新失敗'
        ]);
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
        ->whereIn('c_status',[1, 3]);

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
            $request->validate([
                'amount' => 'required'
            ]);

            $new = DB::table('quote')->where('did', $request->did)
            ->where('qid', $request->qid)
            ->update([
                'q_amount' => $request->amount,
                'q_message' => $request->message !== null ? $request->message : "",
                'updated_at' => now(),
            ]);
        }
        return response()->json([
            'message' => '更新成功'
        ]);
    }

    // 刪除接案紀錄
    public function delTakeCase(Request $request)
    {
        $mid = Auth::id();
        if($mid){
            $selectQuote = $request->input('qid');
            DB::table('quote')
            ->where('mid',$mid)
            ->where('qid',$selectQuote)->delete();
        }
    }

    // 獲取發案紀錄
    public function getPublishCase(Request $request)
    {
        $mid = Auth::id();
        if(Auth::id()){
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
            ->where('mid_demmand',$mid)->whereIn('c_status',[1, 3])
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
                $demmand_query->where('d_name','like','%'.$request->input('demmandSearch').'%');
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
        $request->validate([
            'index' => 'required',
            'case_name' => 'required',
            'type' => 'required',
            'amount' => 'required',
            'unit' => 'required',
            'duration' => 'required',
            'location' => 'required',
            'details' => 'required | min:10',
            'contact_name' => 'required',
            'email' => 'required',
            'phone' => 'required | max:10',
        ]);
        $type = DB::table('category')->where('type', $request->type)->value('catid');
        $location = DB::table('country')->where('country_city', $request->location)->value('country_id');

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
        ]);
    }
    }

    // 刪除發案刊登紀錄
    public function delPublishCase(Request $request)
    {
        if(Auth::id()){
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
        $mid = Auth::id();
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
        $this->validate($request,[
            's_name'=>['required'], //服務名稱
            's_type'=>['required'], //類別
            's_description'=>['required'],//描述
            's_amount'=>['required'],//金額
            's_unit'=>['required'],//單位
            's_active_location'=>['required'],//地點
        ]);
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
        $update = DB::table('service')->where('sid', $request->sid)
        ->update([
            'image' => $imageData,
        ]);

        return response($update);
    }

    // 刪除服務
    public function delService(Request $request)
    {
        if(Auth::id()){
            $userId = Auth::id();

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
        $mid = Auth::id();
        $this->validate($request,[
            'p_name'=>['required'],
            'image'=>['required', 'mimes:jpg,png,svg,webp,bmp', 'file'],
            'p_description'=>['required'],
        ]);

        if(isset($request->image)){
            $data = $request->image->get();
            // $mime_type = $request->image->getMimeType();
            $imageData = base64_encode($data);
            // $src = "data: $mime_type;base64,$imageData";
        }
        $work = DB::table('project')->insert([
            'p_name'=>$request['p_name'],
            'p_description'=>$request['p_description'],
            'mid'=>$mid,
            'image'=>$imageData,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        return response($work);
    }

    // 編輯作品
    public function updateWork(Request $request){
        $mid = Auth::id();
        $request->validate([
            'pid' => ['required'],
            'image'=>['required', 'mimes:jpg,png,svg,webp,bmp', 'file'],
            'p_name'=>['required'],
            'p_description'=>['required'],
        ]);

        if (isset($request->image)) {
            $data = $request->image->get();
            // $mime_type = $request->image->getMimeType();
            $imageData = base64_encode($data);
            // $src = "data: $mime_type;base64,$imageData";
        }

        $result = DB::table('project')->where('mid', $mid)->where('pid', $request->pid)
        ->update([
            'p_name' => $request->p_name,
            'p_description' => $request->p_description,
            'image' => $imageData,
            'updated_at' => now()
        ]);
        return response()->json($result ? ['message' => '編輯成功'] : ['message' => '編輯失敗']);
    }

    // 新增影音
    public function addVideo(Request $request)
    {
        $mid = Auth::id();
        $this->validate($request,[
            'v_name'=>['required'],
            'v_description'=>['required'],
            'src'=>['required']
        ]);

        $video = DB::table('video')->insert([
            'v_name'=> $request['v_name'],
            'v_description' =>$request['v_description'],
            'src'=>$request['src'],
            'mid'=>$mid,
            'created_at'=>now(),
            'updated_at'=>now(),
        ]);
        return response($video);
    }

    // 編輯影音
    public function updateVideo(Request $request){
        $mid = Auth::id();

        $request->validate([
            'v_name'=>['required'],
            'v_description'=>['required'],
            'src'=>['required']
        ]);

        $result = DB::table('video')->where('mid', $mid)
        ->update([
            'v_name' => $request->v_name,
            'v_description' => $request->v_description,
            'src' => $request->src,
            'updated_at' => now()
        ]);
        return response()->json($result ? ['message' => '編輯成功'] : ['message' => '編輯失敗']);
    }

    // 獲取我的收藏
    public function getCollection(){

    }
}


