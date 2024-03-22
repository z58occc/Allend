<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class demmandContentController extends Controller
{
    public function __invoke(Request $request)
    {   
        $demmandID = $request->input('did');
        $diduser = DB::table('demmand')->where('did',$demmandID)->first();

        if($diduser){
            $query = DB::table('demmand')
            ->select('did','d_name','d_type','updated_at','d_amount','d_active_location','d_duration','d_description')
            ->where('did',$demmandID);
            $query_mid = DB::table('demmand')->select('mid')->where('did',$demmandID)->first();
            
            if ($query_mid){
            $establised_query = DB::table('established_case')->select('service_star')->where('mid_demmand',$query_mid->mid);

            $total_start = $establised_query->sum('service_star');
            $count = $establised_query->count();
            $avg = $count > 0 ? $total_start / $count : 0;
            }
            $member_query = DB::table('members')->select('name','last_login')->where('mid',$query_mid->mid);
                //上線時間
                $Last = $member_query->get();
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
        }
        $data_response=[
            'dammand'=>$query->get(),
            'service_star_avg'=>$avg,
            'members'=>$Last,
        ];
        return response()->json($data_response);
    }
}
