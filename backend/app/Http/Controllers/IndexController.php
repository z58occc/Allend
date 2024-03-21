<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    public function __invoke(Request $request)
    {
        //最新服務
        $query = DB::table('service');
        $member_query = DB::table('members');
        //圖片
        if($request->has('image')){
            $query->where('image',$request->image);
        }
        //服務名稱
        if($request->has('s_name')){
            $query->where('s_name',$request->s_name);
        }
        //價錢
        if($request->has('s_amount')){
            $query->where('s_amount',$request->s_amount);
        }
        //服務人名稱
        if($request->has('name')){
            $member_query->where('name',$request->name);
        }
        if($request->has('created_at')){
            $query->where('created_at',$request->created_at);
        }

        //最新刊登
        $dammand_query = DB::table('demmand');
        //發案名稱
        if($request->has('d_name')){
            $dammand_query->where('d_name',$request->d_name);
        }
        //價錢
        if($request->has('d_amount')){
            $dammand_query->where('d_amount',$request->d_amount);
        }
        //地點
        if($request->has('d_active_location')){
            $dammand_query->where('d_active_location',$request->d_active_location);
        }


        //作品
        $project_query = DB::table('project');
        //圖片
        if($request->has('image')){
            $project_query->where('image',$request->image);
        }
        $Date_response = [
            'service' => $query->get(),
            'members'=>$member_query->get(),
            'demmand'=>$dammand_query->get(),
            'project'=>$project_query->get(),

        ];
        return response()->json($Date_response);
    }
}
