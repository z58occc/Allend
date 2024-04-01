<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TalentController extends Controller
{
    public function __invoke(Request $request)
    {
        // 人才頁面
        $mid = $request->input('mid');
        $query = DB::table('members')->select('name','identity','avatar','about','fb','line','last_login')->where('mid',$mid);
        $establised_query = DB::table('established_case')->select('demmand_star','demmand_time','demmand_comment','c_name','compelete_time','mid_demmand')->where('mid_service',$mid);
        $project_query = DB::table('project')->select('pid', 'image', 'p_name', 'p_description', 'created_at')->where('mid',$mid);
        $video_query = DB::table('video')->select('vid', 'v_name', 'v_description', 'src', DB::raw('date_format(updated_at, "%Y/%m/%d") as updated_at'))->where('mid',$mid);
        $service_query = DB::table('service')->select('sid', 's_name', 's_amount', 's_unit', 'image', DB::raw('date_format(updated_at, "%Y/%m/%d") as updated_at'))->where('mid',$mid);

        // 評價星星
        $total_start = $establised_query->sum('demmand_star');
        $count = $establised_query->count();
        $avg = $count > 0 ? $total_start / $count : 0;

        // 成交件數
        $establised_query->select(DB::raw('COUNT(mid_service) as total_completed'))->where('c_status', 2);

        // 上線時間
        $Last = $query->get();
        foreach($Last as $value){
            $lastAt = new \DateTime($value->last_login);
            $now = new \DateTime('now',new \DateTimeZone('Asia/Taipei'));
            $interval = $lastAt->diff($now);

            if($interval->h < 24 && $interval->d < 1){
                $difference = '今天上線';
            }elseif($interval->d == 1){
                $difference = '昨天上線';
            }else{
                $difference = $interval->d . '天前上線';
            }
            $value->last_login = $difference;
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
