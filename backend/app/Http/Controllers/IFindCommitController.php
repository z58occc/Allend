<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IFindCommitController extends Controller
{
    public function __invoke(Request $request)
    {
        
        $query = DB::table('demmand')
        ->leftJoin('country','demmand.d_active_location','=','country.country_id')
        ->leftJoin('category','category.catid','=','demmand.d_type')
        ->select('d_name','d_required', 'type','d_description','d_amount','d_unit','country_city','updated_at');



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
        switch($order){
                case '1':
                    $query->orderBy('created_at','desc');
                    break;
                case '2':
                    $query->orderBy('updated_at','desc');
                    break;
                case '3':
                    $query->orderBy('d_amount','desc');
                    break;
                // case '4':
                    //接案人數
                default:
                    $query->orderBy('demmand.created_at', 'desc');
        
            }
        }else{ $query->orderBy('demmand.created_at', 'desc');}

        $demands = $query->get();

        foreach($demands as $demand){
            $updateAt = new \DateTime($demand->updated_at);
            $now = new \DateTime('now',new \DateTimeZone('Asia/Taipei'));
            $interval = $updateAt->diff($now);

            if($interval->h < 1 && $interval->d <1){
                $difference = $interval -> i . '分鐘前';
            }elseif($interval->d < 1 && $interval-> h > 1){
                $difference  =  '今天更新';
            }else{
                $difference = $updateAt->format('Y-m-d');
            }
            $demand ->time_difference = $difference;
        }
        return response()->json($demands);

    }

}
