<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IFindPeopleController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = DB::table('service');
        
        if($request->has('s_type')){
            $query->where('s_type',$request->s_type);
        }
        if($request->has('s_type')){
            $query->whereIn('s_type',explode(',',$request->s_type));
        }
        //接案身分 位打

        
    }
}
