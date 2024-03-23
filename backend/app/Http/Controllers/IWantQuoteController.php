<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class IWantQuoteController extends Controller
{
    public function __invoke(Request $request)
    {  

        
        $this->validate($request,[
            'mid'=>['required'],
            'did'=>['required'],
            'q_amount'=>['require'],
            'q_content'=>['require'],
        ]);

        $mid = Auth::id();
        $qoute = DB::table('qoute')->insert([
            'mid'=> $mid,
            'did'=> $request['did'],
            'q_amount'=> $request->input('q_amount'),
            'q_content' =>$request->input('q_content'),
        ]);
        return response($qoute);
}
}