<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MemberServiceController extends Controller
{
    public function __invoke(Request $request)
    {
        $mid = $request->input('mid');
        if($mid){
            $service_query = DB::table('service')->select('s_name')->where('mid',$mid);

            $project_query = DB::table('project')->select('p_name','image')->where('mid',$mid);

            $video_query = DB::table('video')->select('v_name','src')->where('mid',$mid);

            //服務搜尋
            if($request->has('servicesearch')){
                $service_query->where('s_name','like','%'.$request->input('servicesearch').'%');
            }
            //作品搜尋
            if($request->has('projectsearch')){
                $project_query->where('p_name','like','%'.$request->input('projectsearch').'%');
            }
            //影音搜尋
            if($request->has('videosearch')){
                $video_query->where('v_name','like','%'.$request->input('videosearch').'%');
            }

            //分頁顯示
            $service_results = $service_query->paginate(4);
            $project_results =  $project_query->paginate(6);
            $video_results = $video_query->paginate(6);
            return response()->json([
                'service' => $service_results,
                'project' => $project_results,
                'video' => $video_results,
            ]);
        }
    }
}
