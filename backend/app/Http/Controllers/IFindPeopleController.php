<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IFindPeopleController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = DB::table('service');
        $member_query = DB::table('members');
        $establised_query = DB::table('establised_case');
        $project_query = DB::table('project');
        
        //給類別
        if($request->has('s_type')){
            $query->where('s_type',$request->s_type);
        }
        //接案身分 
        if($$request->has('identity')){
            $member_query->whereIn('identity',explode(',',$request->identity));
        }
        //給年資
        if($request->has('seniority')){
            $member_query->whereIn('seniority',explode(',',$request->seniority));
        }
        //給地點
        if($request->has('s_acitve_location')){
            $query->whereIn('s_acitve_location',explode(',',$request->s_acitve_location));
        }
        //排序
        if($request->has('order')){
            $order = $request->order;
            switch($order){
                //評價
                case '1':
                    $establised_query->select(DB::raw('ROUND(AVG(demmand_star)) as avg_star'))
                    ->orderBy('avg_star');
                    break;
                //成交數量
                case'2':
                    $establised_query->select('id_demmand',DB::raw('COUNT(*)'))
                    ->groupBy('id_demmand');
                //計算作品數量
                case '3':
                    $project_query->select('uid',DB::raw('COUNT(*)'))
                    ->groupBy('uid')
                    ->get();
                    break;
                //上線時間
                case'4':
                    $member_query->orderBy('last_login','desc');
                    break;
                default:
                    $member_query->orderBy('last_login','desc');
            }
        }else{
                $member_query->orderBy('last_login','desc');
            }
        
        $Data_response=[
            'service'=>$query->get(),
            'members'=>$member_query->get(),
            'establised_case'=>$establised_query->get(),
            'project'=>$project_query->get(),
        ];

        return response()->json($Data_response);
    }
}
