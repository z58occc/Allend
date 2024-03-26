<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DemmandContentController extends Controller
{
    public function __invoke($did)
    {
        // 呈現案件詳細訊息
        $query = DB::table('demmand')
        ->select('did','d_name','d_type','updated_at','d_amount','d_active_location','d_duration','d_description')
        ->where('did', $did);

        $query_mid = DB::table('demmand')->select('mid')->where('did',$did)->first();
        // 該案主星數
        $establised_query = DB::table('established_case')->select('service_star')->where('mid_demmand', $query_mid->mid);
        $total_start = $establised_query->sum('service_star');
        $count = $establised_query->count();
        $avg = $count > 0 ? $total_start / $count : 0;


        // 案主的資料
        $member_query = DB::table('members')->select('name', 'avatar','last_login')->where('mid',$query_mid->mid);

        // 判斷呈現的上線時間
        $lastLoginTime = $member_query->first();
        $lastAt = new \DateTime($lastLoginTime->last_login);
        $now = new \DateTime('now',new \DateTimeZone('Asia/Taipei'));
        $interval = $lastAt->diff($now);

        if($interval->h < 24 && $interval->d == 0){
            $difference = '今天';
        }elseif($interval->d == 1){
            $difference = '昨天';
        }else{
            $difference ='2天以上';
        }
        $lastLoginTime->last_login = $difference;

        $data_response=[
            'dammand'=>$query->first(),
            'service_star_avg'=>$avg,
            'members'=>$lastLoginTime,
        ];
        return response()->json($data_response);

    }
}
