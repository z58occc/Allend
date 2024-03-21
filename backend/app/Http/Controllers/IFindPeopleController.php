<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IFindPeopleController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = DB::table('service');
        $member_query = DB::table('member');
        $establised_query = DB::table('establised_case');
        $project_query = DB::table('project');
        
        if($request->has('s_type')){
            $query->where('s_type',$request->s_type);
        }
        if($request->has('s_type')){
            $query->whereIn('s_type',explode(',',$request->s_type));
        }
        //接案身分
        if($$request->has('identity')){
            $member_query->whereIn('identity',explode(',',$request->identity));
        }
        if($request->has('seniority')){
            $member_query->whereIn('seniority',explode(',',$request->seniority));
        }
        if($request->has('s_acitve_location')){
            $query->whereIn('s_acitve_location',explode(',',$request->s_acitve_location));
        }

        if($request->has('order')){
            $order = $request->order;
            switch($order){
                case '1':
                    $establised_query->select(DB::raw('ROUND(AVG(demmand_star)) as avg_star'))
                    ->orderBy('avg_star');
                    break;
                case'2':
                    $establised_query->select('id_demmand',DB::raw('COUNT(*)'))
                    ->groupBy('id_demmand');
                case '3':
                    $project_query->select('uid',DB::raw('COUNT(*)'))
                    ->groupBy('uid')
                    ->get();
                    break;
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
            'member'=>$member_query->get(),
            'establised_case'=>$establised_query->get(),
            'project'=>$project_query->get(),
        ];

        return response()->json($Data_response);
    }
}
