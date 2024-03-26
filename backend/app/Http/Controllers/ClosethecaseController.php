<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClosethecaseController extends Controller
{
    public function publishClose(Request $request){
        $mid = $request->input('mid');
        if($mid){
            $query = DB::table('established_case')
            ->join('country','c_active_location','=','country_id')
            ->join('members','established_case.mid_demmand','=','members.mid')
            ->select('c_name','name','eamil','mobile_phone','country_city','c_amount','service_star','service_comment');
            
            return response()->json($query->get());
        }

    }
    public function takeClose(Request $request){
        $mid = $request->input('mid');
        if($mid){
            $query = DB::table('established_case')
            ->join('country','c_active_location','=','country_id')
            ->join('members','established_case.mid_service','=','members.mid')
            ->select('c_name','name','eamil','mobile_phone','country_city','c_amount','demmand_star','demmand_comment');
            
            return response()->json($query->get());
        }
    }
}
