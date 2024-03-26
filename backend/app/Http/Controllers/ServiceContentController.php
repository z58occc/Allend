<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServiceContentController extends Controller
{
    public function __invoke($sid)
    {
        $service = DB::table('service')->where('sid',$sid)->first();
        // 服務內容
        $query = DB::table('service')
        ->join('members','service.mid','=','members.mid')
        ->Join('country', 'service.s_active_location', '=', 'country.country_id')
        ->select('s_name','s_amount','s_unit','country_city','image','s_description','members.name')
        ->where('sid',$sid);

        // 平均評價
        $avg_star = DB::table('established_case')
        ->join('service','established_case.mid_service','=','service.mid')
        ->where('service.sid',$sid)
        ->avg('demmand_star');

        //案件評價
        $established_query = DB::table('established_case')
        ->join('members','established_case.mid_demmand','=','members.mid')
        ->join('service','established_case.mid_service','=','service.mid')
        ->select('demmand_star','demmand_comment','compelete_time','members.name')
        ->where('service.sid',$sid);

        $data_response = [
            'service' => $query->get(),
            'avg_star' => $avg_star,
            'service_comments' => $established_query->get()
        ];

        return response()->json($data_response);
        
    }
}
