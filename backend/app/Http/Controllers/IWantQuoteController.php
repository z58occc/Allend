<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class IWantQuoteController extends Controller
{
    // 送出報價表單
    public function __invoke(Request $request)
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
}
