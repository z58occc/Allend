<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TalentController extends Controller
{
    public function __invoke(Request $request)
    {
        $userID = $request->input('mid');
        $user = DB::table('members')->where('mid',$userID)->first();
        if($user){
            //人才頁面
            $query = DB::table('members')->select('name','identity','content_us','last_login',)->where('mid',$userID);
            $establised_query = DB::table('established_case')->select('demmand_star','demmand_time','demmand_comment','c_name','compelete_time','mid_demmand')->where('mid_service',$userID);
            $project_query = DB::table('project')->where('mid',$userID);
            $video_query = DB::table('video')->where('mid',$userID);
            $service_query = DB::table('service')->where('mid',$userID);
            //頭像

            //名稱
            if($request->has('name')){
                $query->where('name',$request->name);
            }
            //評價星星
            $total_start = $establised_query->sum('demmand_star');
            $count = $establised_query->count();
            $avg = $count > 0 ? $total_start / $count : 0;

            //接案身分
            if($request->has('identity')){
                $query->where('identity',$request->identity);
            }
            //關於我
            if($request->has('content_us')){
                $query->where('content_us',$request->content_us);
            }
            //作品 最新
            if($request->has('created_at')){
                $project_query->orderBy('created_at','desc');
            }
            //作品 瀏覽數 先跳過

            //作品圖片
            if($request->has('image')){
                $project_query->where('image',$request->image);
            }
            //view先不做
            //發布時間
            if($request->has('created_at')){
                $project_query->where('created_at',$request->created_at);
            }
            //影音網址
            if($request->has('src')){
                $video_query->where('src',);
            }
            //作品名稱
            if($request->has('v_name')){
                $project_query->where('v_name',$request->v_name);
            }

            //提供服務
            //服務圖片
            if($request->has('image')){
                $service_query->where('image',$request->image);
            }
            //服務名稱
            if($request->has('s_name')){
                $service_query->where('s_name',$request->s_name);
            }
            //服務價錢
            if($request->has('s_amount')){
                $service_query->where('s_amount',$request->s_amount);
            }
            if($request->has('created_at')){
                $service_query->where('created_at',$request->created_at);
            }

            //個人頁面評價
            
            //服務名稱
            if($request->has('s_name')){
                $service_query->where('s_name',$request->s_name);
            }
            //服務價格
            if($request->has('s_amount')){
                $service_query->where('s_amount',$request->s_amount);
            }
            //發案人評價
            if($request->has('demmand_comment')){
                $establised_query->where('demmand_comment',$request->demmand_comment);
            }
            //發案人評價日期
            if($request->has('demmand_time')){
                $establised_query->where('demmand_time',$request->demmand_time);
            }
            //成交件數
            if($request->has('mid_demmand')){
                $establised_query->select('mid_demmand',DB::raw('COUNT(*)'))
                ->groupBy('mid_demmand');
            }
            if($request->has('c_name')){
                $establised_query->where('c_name',$request->c_name);
            }
            if($request->has('compelete_time')){
                $establised_query->where('compelete_time',$request->compelete_time);
            }
        }
            //上線時間
            $Last = $query->get();
            foreach($Last as $Last_member){
                $lastAt = new \DateTime($Last_member->last_login);
                $now = new \DateTime('now',new \DateTimeZone('Asia/Taipei'));
                $interval = $lastAt->diff($now);

                if($interval->h < 24 && $interval->d < 1){
                    $difference = '今天';
                }elseif($interval->d =1){
                    $difference = '昨天';
                }else{
                    $difference ='2天以上';
                }
                $Last_member->lasted_login = $difference;
            }
        $Data_response = [
            'member' => $Last,
            'established_case' => $establised_query->get(),
            'avg_star'=>$avg,
            'project' => $project_query->get(),
            'video' => $video_query->get(),
            'service' => $service_query->get(),
        ];
        return response()->json($Data_response);
    }
}
