<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MemberTakeCaseController extends Controller
{
    public function __invoke(Request $request)
    {
        // $mid = Auth::guard('api')->id();
        $mid = $request->input('mid');
        if($mid){

            $Quote_query = DB::table('quote')
            ->join('demmand','quote.did','=','demmand.did')
            ->select('demmand.d_name','q_amount')->where('quote.mid',$mid);

            $Case_in_progress_query = DB::table('established_case')
            ->select('c_name','c_amount')
            ->where('mid_service',$mid)
            ->where('c_status',1);

            $Case_completed_query = DB::table('established_case')
            ->select('c_name','c_amount')
            ->where('mid_service',$mid)
            ->where('c_status',2);

            //接案搜尋
            if($request->has('QuoteSearch')){
                $Quote_query->where('d_name','like','%'.$request->input('QuoteSearch').'%');
            }
            //接案進行中搜尋
            if($request->has('CaseInProgressSearch')){
                $Case_in_progress_query->where('c_name','like','%'.$request->input('CaseInProgressSearch').'%');
            }

            if($request->has('CaseCompletedSearch')){
                $Case_completed_query->where('c_name','like','%'.$request->input('CaseCompletedSearch').'%');
            }

            //分頁顯示
            $Quote_results = $Quote_query->get();
            $Case_in_progress_results = $Case_in_progress_query->get();
            $Case_completed_results = $Case_completed_query->get();

            if($Quote_results->count()<6){
                $Quote_paginated_results = $Quote_results;
            }else{
                $Quote_paginated_results = $Quote_query->paginate(6);
            }

            if($Case_in_progress_results->count()<6){
                $Case_in_progress_paginated_results = $Case_in_progress_results;
            }else{
                $Case_in_progress_paginated_results = $Case_in_progress_query->paginate(6);
            }
            if($Case_completed_results->count()<6){
                $Case_completed_paginated_results = $Case_completed_results;
            }else{
                $Case_completed_paginated_results = $Case_completed_query->paginate(6);
            }
            return response()->json([
                'Quote' => $Quote_paginated_results,
                'CaseInProgress' => $Case_in_progress_paginated_results,
                'CaseCompleted' => $Case_completed_paginated_results,
            ]);

        }
    }
}
