<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class AcceptanceIssueController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'verified']);
    }

    //刊登中
    public function getPublishedData(Request $request)
    {
        if(Auth::check()){
        $mid = Auth::id();
        $data = DB::table('demmand')
        ->join('country','d_active_location','=','country_id')
        ->select('did','d_name','d_type','d_amount','country_city','d_duration','d_description')
        ->where('did',$request->input('did'));

        return response()->json($data->get());
        }
    }

    // 刊登的儲存變更
    public function savePublishedData(Request $request){
        $did = $request->input('did');
        DB::table('demmand')->where('did',$did)->update([
            'd_name' => $request->input('d_name'),
            'd_type' => $request->input('d_type'),
            'd_amount' => $request->input('d_amount'),
            'd_active_location' => $request->input('d_active_location'),
            'd_duration' => $request->input('d_duration'),
            'd_description' => $request->input('d_description')
        ]);

        return response()->json(['message'=>'Update Success']);
    }

    //進行中
    public function publishprogressData(Request $request){
        $data = DB::table('established_case')
        ->join('country','c_active_location','=','country_id')
        ->join('members','mid_service','=','mid')
        ->select('cid','c_name','c_type','c_amount','country_city','c_duration','c_description','c_status','name','email','mobile_phone')
        ->where('cid',$request->input('cid'));

        return response()->json($data->get());
    }

    //收到的按鈕
    public function receviceData(Request $request){
        $cid = $request->input('cid');
        DB::table('established_case')->where('cid', $cid)
        ->update(['c_status' => 2]);
    }

    //接案
    public function takegetData(Request $request){
        $did = $request->input('did');
        $data = DB::table('demmand')
        ->join('country','d_active_location','=','country_id')
        ->join('quote','demmand.did','=','quote.did')
        ->select('did','d_name','d_type','country_city','q_amount','q_message')
        ->where('did',$did);
        return response()->json($data->get());
    }

    //接案的儲存變更
    public function takesaveData(Request $request){
        $did = $request->input('did');
        DB::table('quote')->where('did',$did)->update([
            'q_amount' => $request->input('q_amount'),
            'q_message' => $request->input('q_message')
        ]);
        return response()->json(['message'=>'Update Success']);
    }

    //接案中
    public function takeprogressData(Request $request){
        $data = DB::table('established_case')
        ->join('country','c_active_location','=','country_id')
        ->join('members','mid_demmand','=','mid')
        ->select('cid','c_name','c_type','c_amount','country_city','c_duration','c_description','name','email','phone','c_status')
        ->where('cid',$request->input('cid'));

        return response()->json($data->get());
    }

    //提交按鈕
    public function submitData(Request $request){
        $cid = $request->input('cid');
        DB::table('established_case')
        ->where('cid',$cid)
        ->update(['c_status' => 3]);

        return response()->json(['message'=>'Submit Success']);
    }

    // 案主給予接案者評價
    public function publishEvaluation(Request $request){
        $cid = $request->input('cid');
        DB::table('established_case')
        ->where('cid',$cid)
        ->update(['demmand_star' => $request->input('demmand_star')],
                ['demmand_comment'=>$request->input('demmand_comment')],
                ['demmand_time'=>now()]);
        return response()->json(['message'=>'Evaluate Success']);
    }
    // 接案者給予案主評價
    public function takeEvaluation(Request $request){
        $cid = $request->input('cid');
        DB::table('established_case')
        ->where('cid',$cid)
        ->update(['service_star' => $request->input('service_star')],
                ['service_comment'=>$request->input('service_comment')],
                ['service_time'=>now()]);
        return response()->json(['message'=>'Evaluate Success']);
    }
}
