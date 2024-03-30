<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Pop_QuoteAgreeController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    // 查看報價
    public function getQuote(Request $request)
    {
        $demmandID = $request->input('did');
        if($demmandID){
            $quote = DB::table('demmand')
            ->leftjoin('quote', 'quote.did', '=', 'demmand.did')
            ->join('members', 'quote.mid', '=', 'members.mid')
            ->join('identity', 'members.identity', '=', 'iid')
            ->select('d_name','members.mid', 'name', 'email', 'i_identity as identity', 'q_amount',
            'q_message')
            ->where('quote.did', $demmandID)->get();

            return response()->json($quote);
        }
    }

    // 送出報價表單
    public function sendQuote(Request $request)
    {
        $mid = Auth::guard('api')->id();

        $this->validate($request,[
            'did'=>['required'],
            'q_amount'=>['required'],
            'q_message'=>['required'],
        ]);

        $qoute = DB::table('quote')->insert([
            'mid'=> $mid,
            'did'=> $request->input('did'),
            'q_amount'=> $request->input('q_amount'),
            'q_message' =>$request->input('q_message'),
        ]);
        return response($qoute);

    }
    // 同意報價
    public function agreeQuote(Request $request)
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

    // 拒絕報價
    public function disagreeQuote(Request $request)
    {
        if($request->has('disagree')){
            DB::table('quote')->where('mid',$request->input('mid'))->delete();
            return response()->json(['message'=>'Disagree Success']);
        }
    }
}
