<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MemberserviceDeleteController extends Controller
{
    public  function __invoke(Request $request)
    {
        if(Auth::guard('api')->id()){
            $userId = Auth::guard('api')->id();

            $selectservice = $request->input('sid');
            DB::table('service')->whereIn('sid',$selectservice)
                                ->where('mid',$userId)
                                ->delete();
            $selectproject = $request->input('pid');
            DB::table('project')->whereIn('pid',$selectproject)
                                ->where('mid',$userId)
                                ->delete();

            $selectvideo = $request->input('vid');
            DB::table('video')->whereIn('vid',$selectvideo)
                            ->where('mid',$userId)
                            ->delete();
            
            return response()->json(['message'=>'刪除成功']);
        }
    }
}
