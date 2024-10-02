<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MemberTakeCaseDeleteController extends Controller
{
    public function __invoke(Request $request)
    {
        $mid = $request->input('mid');
        if($mid){
            $selectQuote = $request->input('qid');
            DB::table('quote')
            ->where('mid',$mid)
            ->whereIn('qid',$selectQuote)->delete();
        }
    }
}
