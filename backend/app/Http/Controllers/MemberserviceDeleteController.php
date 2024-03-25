<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MemberserviceDeleteController extends Controller
{
    public  function __invoke(Request $request)
    {
        // $mid = Auth::guard('api')->id();
        $mid = $request->input('mid');
        if($mid){
            $selectservice = $request->input('sid');
            DB::table('service')->whereIn('sid',$selectservice)->delete();
            
            $selectproject = $request->input('pid');
            DB::table('project')->whereIn('pid',$selectproject)->delete();

            $selectvideo = $request->input('vid');
            DB::table('video')->whereIn('vid',$selectvideo)->delete();
            
            return response()->json(['message'=>'刪除成功']);
        }
    }
}
