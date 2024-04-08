<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ClosethecaseController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    // 接案者提交成果按鈕 (接案者按鈕轉成等待中，發案者接收按鈕轉亮)
    public function submitData(Request $request){
        $cid = $request->input('cid');
        DB::table('established_case')
        ->where('cid',$cid)
        ->update(['c_status' => 3]);

        return response()->json(['message'=>'提交成功']);
    }

    // 發案者確認結果的按鈕 (發案者接受提交，雙方狀態轉成已結案，並且可以同時互相評價)
    public function receviceData(Request $request){
        $cid = $request->input('cid');
        DB::table('established_case')->where('cid', $cid)
        ->update(['c_status' => 2]);

        return response()->json([
            'message' => '已確認案件結果'
        ]);
    }

    // 案主給予接案者評價按鈕
    public function publishEvaluation(Request $request){
        $mid = Auth::id();
        $cid = $request->input('cid');
        DB::table('established_case')
        ->where('cid',$cid)->where('mid_demmand', $mid)
        ->update([
            'demmand_star' => $request->input('demmand_star'),
            'demmand_comment' => $request->input('demmand_comment'),
            'demmand_time' => now()
        ]);

        return response()->json(['message'=>'案主評價成功']);
    }

    // 獲取案主給接案者的評價
    // public function takeClose(Request $request){
    //     $mid = Auth::id();
    //     if($mid){
    //         $query = DB::table('established_case')
    //         ->join('country','c_active_location','=','country_id')
    //         ->join('members','established_case.mid_service','=','members.mid')
    //         ->select('c_name','name','eamil','mobile_phone','country_city','c_amount',
    //         'demmand_star','demmand_comment');

    //         return response()->json($query->get());
    //     }
    // }

    // 接案者給予案主評價
    public function takeEvaluation(Request $request){
        $mid = Auth::id();
        $cid = $request->input('cid');
        DB::table('established_case')
        ->where('cid',$cid)->where('mid_service', $mid)
        ->update([
            'service_star' => $request->input('service_star'),
            'service_comment' => $request->input('service_comment'),
            'service_time' =>now(),
        ]);

        return response()->json(['message'=>'接案者評價成功']);
    }

    // 獲取接案者給案主的評價
    // public function publishClose(Request $request){
    //     $mid = $request->input('mid');
    //     if($mid){
    //         $query = DB::table('established_case')
    //         ->join('country','c_active_location','=','country_id')
    //         ->join('members','established_case.mid_demmand','=','members.mid')
    //         ->select('c_name','name','eamil','mobile_phone','country_city','c_amount','service_star','service_comment');

    //         return response()->json($query->get());
    //     }
    // }
}
