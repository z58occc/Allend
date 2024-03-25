<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PublishCaseDeleteController extends Controller
{
    public function __invoke(Request $request)
    {
        if(Auth::guard('api')){
            $userId = Auth::guard('api')->id();

            $selectdemmand = $request->input('did');
            DB::table('demmand')->whereIn('did',$selectdemmand)
                                ->where('mid',$userId)
                                ->delete(); 
                                
            return response()->json(['message'=>'刪除成功']);
        }
    }
}
