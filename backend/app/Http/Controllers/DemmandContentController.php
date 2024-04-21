<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DemmandContentController extends Controller
{
    public function __invoke($did)
    {
        // 呈現案件詳細訊息
        if($mid = Auth::id()){
            $query = DB::table('demmand as d')
            ->join('country', 'country_id', '=', 'd_active_location')
            ->join('category', 'catid', '=', 'd_type')
            ->select('did','d_name','type as d_type','d_amount','country_city as d_active_location','d_duration',
            'd_description','d_unit',DB::raw('date_format(updated_at, "%Y/%m/%d") as updated_at'))
            ->selectRaw('(select fid from collection c where c.did = d.did and c.mid = ? and collect = 1) as fid', [$mid])
            ->where('did', $did);
        }else{
            $query = DB::table('demmand')
            ->join('country', 'country_id', '=', 'd_active_location')
            ->join('category', 'catid', '=', 'd_type')
            ->select('did','d_name','type as d_type','d_amount','country_city as d_active_location','d_duration',
            'd_description','d_unit',DB::raw('date_format(updated_at, "%Y/%m/%d") as updated_at'))
            ->where('did', $did);
        }

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

        // 相同類型案件
        $sameTypeCase = DB::table('demmand')
        ->join('country', 'country_id', '=', 'd_active_location')
        ->select('did', 'd_name', 'd_amount', 'd_unit', 'country_city', DB::raw('date_format(created_at, "%Y/%m/%d") as created_at'))
        ->where('d_type', DB::table('demmand')->where('did', $did)->value('d_type'))
        ->inRandomOrder()->limit(3)->distinct()->get();

        if($interval->h < 24 && $interval->days < 1){
            $difference = '今天';
        }elseif($interval->days == 1){
            $difference = '昨天';
        }else{
            $difference ='2天以上';
        }
        $lastLoginTime->last_login = $difference;

        $data_response = [
            'dammand' => $query->first(),
            'service_star_avg' => $avg,
            'members' => $lastLoginTime,
            'sameCase' => $sameTypeCase
        ];
        return response()->json($data_response);

    }
}
