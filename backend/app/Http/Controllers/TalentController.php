<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TalentController extends Controller
{
    public function __invoke(Request $request)
    {
        //人才頁面
        $query = DB::table('members');
        $establised_query = DB::table('establised_case');
        $project_query = DB::table('project');
        $video_query = DB::table('video');
        $service_query = DB::table('service');
        $establised_query = DB::table('establised_case');
        //頭像

        //名稱
        if($request->has('name')){
            $query->where('name',$request->name);
        }
        //評價星星
        if($request->has('demmand_star')){
            $establised_query->select(DB::raw('ROUND(AVG(demmand_star))'));
        }
        //接案身分
        if($request->has('identity')){
            $query->where('identity',$request->identity);
        }
        //上線時間
        foreach($query as $Last_menber){
            $lastAt = new \DateTime($Last_menber->last_login);
            $now = new \DateTime('now',new \DateTimeZone('Asia/Taipei'));
            $interval = $lastAt->diff($now);

            if($interval->h < 24 && $interval->d < 1){
                $difference = '今天';
            }elseif($interval->d =1){
                $difference = '昨天';
            }else{
                $difference ='2天以上';
            }
            $Last_menber->lasted_login = $difference;
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
        //案主給的星星
        if($request->has('demmand_star')){
            $establised_query->where('demmand_star',$request->demmand_star);
        }
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
        if($request->has('est_count')){
            $establised_query->select('id_demmand',DB::raw('COUNT(*)'))
            ->groupBy('id_demmand');
        }
        if($request->has('c_name'))
    }
}
