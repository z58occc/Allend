<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServiceContent extends Controller
{
    public function __invoke(Request $request)
    {
        $serviceID = $request->input('sid');
        $service = DB::table('service')->where('sid',$serviceID)->first();
        if($service){

            //服務內容
            $query = DB::table('service')
            ->join('members','service.mid','=','members.mid')
            ->select('s_name','s_amount','s_unit','s_active_location','image','s_description','members.name')
            ->where('sid',$serviceID);

            //平均評價
            $avg_star = DB::table('established_case')
            ->join('service','established_case.mid_service','=','service.mid')
            ->where('sid',$serviceID)
            ->avg('demmand_star');
            
            //案件評價
            $established_query = DB::table('established_case')
            ->join('members','established_case.mid_demmand','=','members.mid')
            ->join('service','established_case.mid_service','=','service.mid')
            ->select('demmand_star','demmand_comment','compelete_time','members.name')
            ->where('sid',$serviceID);
            
            $data_response = [
                'service' => $query->get(),
                'avg_star' => $avg_star,
                'established_case' => $established_query->get()
            ];

            return response()->json($data_response);
        }
    }
}
