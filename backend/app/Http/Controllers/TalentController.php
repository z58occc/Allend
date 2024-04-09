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
        $sid = $request->input('sid');

        $query = DB::table('members')
                    ->join('identity','iid','=','identity')
                    ->join('country','country_id','=','active_location')
                    ->select('avatar','name','i_identity','about','fb','line','last_login','country_city')
                    ->where('mid',$mid);

        $case_complete = DB::table('established_case')
                    ->select('demmand_star', DB::raw('COUNT(*) AS total_completed'))
                    ->where('c_status', 2)
                    ->where('mid_service', $mid)
                    ->groupBy('demmand_star')
                    ->get()
                    ->count();
        $establised_query = DB::table('established_case')
                                ->select('demmand_star', 'demmand_time', 'demmand_comment', 'c_name', 'completed_time', 'mid_demmand','service_comment','service_time')
                                // ->joinSub($subquery, 'sub', function ($join) {
                                //     $join->on('established_case.mid_service', '=', 'sub.mid_service');
                                // })
                    ->where('established_case.mid_service', $mid)
                    ->whereNotNull('demmand_star') // 如果 demmand_star 是 NULL，將其排除
                    ->whereNotNull('demmand_time')
                    ->whereNotNull('demmand_comment')
                    ->whereNotNull('c_name')
                    ->whereNotNull('completed_time')
                    ->whereNotNull('mid_demmand')
                    ->whereNotNull('service_comment')
                    ->whereNotNull('service_time');
        $project_query = DB::table('project')->select('pid', 'image', 'p_name', 'p_description', 'created_at')->where('mid',$mid);
        $video_query = DB::table('video')->select('vid', 'v_name', 'v_description', 'src', DB::raw('date_format(updated_at, "%Y/%m/%d") as updated_at'))->where('mid',$mid);
        $service_query = DB::table('service')->select('sid', 's_name', 's_amount', 's_unit', 'image', DB::raw('date_format(updated_at, "%Y/%m/%d") as updated_at'))->where('mid',$mid);
        $case_member_count = DB::table('established_case')
                            ->where('c_status',2)
                            ->where('mid_service', $mid)
                            ->count();
        $case_member = DB::table('established_case as e')
                            ->join('members as m','m.mid', '=','e.mid_service')
                            ->select('e.c_name','completed_time','m.name')
                            ->where('mid_service', $mid)
                            ->where('c_status',2);

        // 平均星星
        $total_start = $establised_query->sum('demmand_star');
        $count = $establised_query->count();
        $avg = $count > 0 ? $total_start / $count : 0;

        //單服務平均星星
        if(!empty($sid)){
            $avgserve_start = $establised_query
            ->where('sid', $sid)
            ->sum('demmand_star');
            $countserve = $establised_query->count();
            $avgserve = $countserve > 0 ? $avgserve_start / $countserve : 0;
        }else{
            $avgserve = 0;
        }

        // 上線時間
        $Last = $query->get();
        foreach($Last as $value){
            $lastAt = new \DateTime($value->last_login);
            $now = new \DateTime('now',new \DateTimeZone('Asia/Taipei'));
            $interval = $lastAt->diff($now);

            if($interval->h < 24 && $interval->d < 1){
                $difference = '今天';
            }elseif($interval->d == 1){
                $difference = '昨天';
            }else{
                $difference = $interval->d . '天前';
            }
            $value->last_login = $difference;
            // 身分轉中文
            switch($value->i_identity)
            {
                case "freelancer":
                    $value->i_identity = "個人";
                    break;
                case "company":
                    $value->i_identity = "公司";
                    break;
                case "studio":
                    $value->i_identity = "工作室";
                    break;
            }
        }

        $Data_response = [
            'member' => $Last,
            'case_complete'=>$case_complete,
            'established_case' => $establised_query->get(),
            'avg_star'=>$avg,
            'project' => $project_query->get(),
            'video' => $video_query->get(),
            'service' => $service_query->get(),
            'case_member_count' => $case_member_count,
            'case_member' => $case_member->get(),
            'avgserve_star'=>$avgserve,
        ];

        return response()->json($Data_response);
    }
}
