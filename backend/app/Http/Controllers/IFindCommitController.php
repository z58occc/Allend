<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IFindCommitController extends Controller
{
    public function __invoke(Request $request)
    {

        $query = DB::table('demmand');

        if($request->has('d_type')){
            $query->where('d_type',$request->d_type);
        }

        if($request->has('d_duration')){
            $query->where('d_duration',$request->d_duration);
        }
    
        if($request->has('d_active_location')){
            $query->whereIn('d_active_location',explode(',',$request->d_active_location));
        }
        if($request->has('d_amount')){
            $query->whereIn('d_amount',$request->d_amount);
        }
        if($request->has('order')){
            $order = $request->order;
        }

        switch($order){
                case '1':
                    $query->orderBy('created_at','desc');
                case '2':
                    $query->orderBy('updated_at','desc');
                case '3':
                    $query->orderBy('d_amount','desc');
                // case '4':
                    //接案人數
        
        }


        $demands = $query->get();
        return response()->json($demands);

    }

}
