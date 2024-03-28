<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\select;

class IFindPeopleController extends Controller
{
    public function PrintServiceCardContent(Request $filter)
    {
        // 撈服務的image跟他的會員資訊、作品總數、服務成交數
        $member = DB::table('service as s')
        ->join('members as m', 's.mid', '=', 'm.mid')
        ->join('project as p', 'p.mid', '=', 'm.mid')
        ->select('s.image','s.sid', 'm.mid', DB::raw('count(p.pid) as ptotal') ,'m.name','s_name','identity','seniority')
        ->groupBy('m.mid','s.sid','s.image','m.name','s_name','identity','seniority');
        
        if(isset($filter['identity']) && is_array($filter['identity']) && isset($filter['seniority']) && is_array($filter['seniority'])
             ){
            $member->whereIn('identity',$filter['identity']);
            
            foreach($filter['seniority'] as $seniority){
                switch($seniority){
                    case '1':
                        $member->where('seniority','<=',1);
                        break;
                    case '2':
                        $member->where('seniority','=',2);
                        break;
                    case '3':
                        $member->where('seniority','=',3);
                        break;
                    case '4':
                        $member->where('seniority','=',4);
                        break;
                    case '5':
                        $member->where('seniority','>=',5);
                        break;
                    default:
                        break;
                }
            }
        }
        $member_total = $member->get();

        return $member_total;
    }
    

        


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



        // $Data_response=[
            // 'service'=>$members_service->get(),
            // 'members'=>$members_project->get(),
            // 'established_case'=>$establised_query->get(),
            // 'project'=>$project_query->get(),
        // ];

        // return response()->json($Data_response);
    
}
