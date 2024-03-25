<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Pop_QuoteContorller extends Controller
{
    public function __invoke(Request $request)
    {
        $userID = $request->input('mid');
        if($userID){
            $member = DB::table('members')
            ->join('quote','members.mid','=','quote.mid')
            ->join('demmand','quote.did','=','demmand.did')
            ->select('d_name','name','identity','email','q_amount')
            ->where('quote.mid',$userID);

            $quote = $member->get();
            return response()->json($quote);
        }
    }
}
