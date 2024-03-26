<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Pop_QuoteAgreeController extends Controller
{
    public function Agree(Request $request)
    {
        if($request->has('agree')){
            $agree = DB::table('demmand')
                    ->join('quote','demmand.did','=','quote.did')
                    ->select('demmand.mid as demmand_mid','quote.mid as quote_mid','d_name','d_type','d_duration','d_description','d_active_location','q_amount')
                    ->where('quote.mid',$request->input('mid'))
                    ->get();

            foreach($agree as $row){
                DB::table('established_case')->insert([
                    'mid_demmand' => $row->demmand_mid,
                    'mid_service' => $row->quote_mid,
                    'c_name'=>$row->d_name,
                    'c_type'=>$row->d_type,
                    'c_duration'=>$row->d_duration,
                    'c_description'=>$row->d_description,
                    'c_active_location'=>$row->d_active_location,
                    'c_amount'=>$row->q_amount,
                    'c_status'=>1
                ]);
            }
            DB::table('quote')->where('mid',$request->input('mid'))->delete();

            return response()->json(['message'=>'Agree Success']);
        }
    }
    public function Disagree(Request $request)
    {
        if($request->has('disagree')){
            DB::table('quote')->where('mid',$request->input('mid'))->delete();
            return response()->json(['message'=>'Disagree Success']);
        }
    }
}
