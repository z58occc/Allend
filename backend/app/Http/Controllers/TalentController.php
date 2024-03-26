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

            //評價星星
            $total_start = $establised_query->sum('demmand_star');
            $count = $establised_query->count();
            $avg = $count > 0 ? $total_start / $count : 0;



            //成交件數
            if($request->has('mid_demmand')){
                $establised_query->select('mid_demmand',DB::raw('COUNT(*)'))
                ->groupBy('mid_demmand');
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
}
