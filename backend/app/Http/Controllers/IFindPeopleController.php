<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IFindPeopleController extends Controller
{
    public function __invoke(Request $request)
    {

        $members_service = DB::table('members')
        ->join('service','members.mid','=','service.mid')
        ->select('members.mid as mid','name');

        $members_project = DB::table('members')
        ->join('project', 'members.mid', '=', 'project.mid')
        ->select('members.mid as mid', DB::raw('COUNT(project.mid) as project_count'))
        ->groupBy('members.mid');
        // $member_query = DB::table('members')->select('name');
        // $establised_query = DB::table('established_case');
        // $project_query = DB::table('project')->select('mid')->groupBy('mid');

        // $avg = $establised_query
        // ->join('service','established_case.c_name','=','service.s_name')
        // ->select('sid',DB::raw('ROUND(AVG(demmand_star)) as avg_star'))->groupBy('sid');
        

        // // 選擇類別
        // if($request->has('s_type')){
        //     $query->where('s_type',$request->s_type);
        // }
        // // 選擇接案者身分
        // if($request->has('identity')){
        //     $member_query->whereIn('identity',explode(',',$request->identity));
        // }
        // // 選擇年資
        // if($request->has('seniority')){
        //     $member_query->whereIn('seniority',explode(',',$request->seniority));
        // }
        // // 選擇地點
        // if($request->has('s_acitve_location')){
        //     $query->whereIn('s_acitve_location',explode(',',$request->s_acitve_location));
        // }
        // //排序
        // if($request->has('order')){
        //     $order = $request->order;
        //     switch($order){
        //         //評價
        //         case '1':
        //             $establised_query->select(DB::raw('ROUND(AVG(demmand_star)) as avg_star'))
        //             // ->orderBy('avg_star');
        //             ->get();
        //             break;
        //         //成交數量
        //         case'2':
        //             $establised_query->select('mid_demmand',DB::raw('COUNT(*)'))
        //             ->groupBy('mid_demmand')
        //             ->get();
        //             break;
        //         //計算作品數量
        //         case '3':
        //             $project_query->select('mid',DB::raw('COUNT(*)'))
        //             ->groupBy('mid')
        //             ->get();
        //             break;
        //         //上線時間
        //         case'4':
        //             $member_query->orderBy('last_login','desc');
        //             break;
        //         default:
        //             $member_query->orderBy('last_login','desc');
        //     }
        // }else{
        //         $member_query->orderBy('last_login','desc');
        //     }



        $Data_response=[
            'service'=>$members_service->get(),
            'members'=>$members_project->get(),
            // 'established_case'=>$establised_query->get(),
            // 'project'=>$project_query->get(),
        ];
    
        return response()->json($Data_response);
    }
}
