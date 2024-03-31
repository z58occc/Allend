<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\select;

class IFindPeopleController extends Controller
{
    public function __invoke(Request $request)
    {
        $identity_query = $request->input('identity');
        $seniority_query = $request->input('seniority');
        $country_query = $request->input('country');
        $sort_query = $request->input('sort');
        // 撈服務的image跟他的會員資訊、作品總數、服務成交數
        $member = DB::table('service as s')
        ->join('members as m', 's.mid', '=', 'm.mid')
        ->join('project as p', 'p.mid', '=', 'm.mid')
        ->join('country as c','c.country_id','=','m.active_location')
        ->select('s.image','s.sid', 'm.mid', DB::raw('count(p.pid) as ptotal') ,'m.name','s_name','identity','seniority','c.country_city','s.created_at','m.last_login',
            DB::raw('(SELECT COUNT(*) FROM service) as atotal'))
        ->groupBy('m.mid','s.sid','s.image','m.name','s_name','identity','seniority','c.country_city','s.created_at','m.last_login');


        if (!empty($seniority_query || !empty($identity_query || !empty($country_query)))) {


            if(!empty($identity_query)){
                $member->whereIn('identity',explode(',',$identity_query));
            }

            if(!empty($country_query)){
                $member->whereIn('active_location',explode(',',$country_query));
            }

            if(!empty($seniority_query)){
                $member->whereIn('seniority',explode(',',$seniority_query));
            }

        }

        //排序
        if($sort_query){
            switch($sort_query){
                //作品數
                case'1':
                    $member->orderBy( 'ptotal','desc');
                    break;
                //新服務
                case '2':
                    $member->orderBy('s.created_at','desc')
                    ->groupBy('mid');
                    break;
                //上線時間
                case'3':
                    $member->orderBy('last_login','desc');
                    break;
                default:
                    $member->orderBy('last_login','desc');
            }
        }else{
                $member->orderBy('last_login','desc');
            }






            $member_total = $member->paginate(9);




        return $member_total;
    }




        // $Data_response=[
            // 'service'=>$members_service->get(),
            // 'members'=>$members_project->get(),
            // 'established_case'=>$establised_query->get(),
            // 'project'=>$project_query->get(),
        // ];

        // return response()->json($Data_response);
}
