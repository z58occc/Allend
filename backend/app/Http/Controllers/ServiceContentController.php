<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServiceContentController extends Controller
{
    public function __invoke(Request $request)
    {
        $sid = $request->input('sid');
        $mid = $request->input('mid');
        // 服務內容
        $query = DB::table('service')
        ->join('members','service.mid','=','members.mid')
        ->Join('country', 'service.s_active_location', '=', 'country.country_id')
        ->select('s_name','s_amount','s_unit','country_city','image','s_description','members.name')
        ->where('sid',$sid)->get();

        // 平均評價
        $avg_star = DB::table('established_case')
        ->join('service','established_case.c_name','=','service.s_name')
        ->where('service.sid',$sid)
        ->avg('demmand_star');
        $rounded_avg_star = round($avg_star);

        // 案件評價
        $established_query = DB::table('established_case')
        ->join('members','established_case.mid_demmand','=','members.mid')
        ->join('service','established_case.c_name','=','service.s_name')
        ->select('demmand_star','demmand_comment','completed_time','members.name')
        ->where('c_status',2)
        ->where('service.sid',$sid)->get();

        $other_serve = DB::table('service')
        ->select('sid','s_name','s_amount','s_unit','image')
        ->where('mid',$mid)
        ->whereNotIn('sid',[$sid])->get();

        $data_response = [
            'service' => $query,
            'avg_star' => $rounded_avg_star,
            'service_comments' => $established_query,
            'other_serve' => $other_serve,
        ];

        return response()->json($data_response);
    }
}
