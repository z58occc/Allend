<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IFindCaseController extends Controller
{
    public function __invoke(Request $request, $d_type = null)
    {
        $query = DB::table('demmand')
        ->leftJoin('country','demmand.d_active_location','=','country.country_id')
        ->leftJoin('category','category.catid','=','demmand.d_type')
        ->select('d_name', 'type', 'd_duration','d_description','d_amount','d_unit','country_city','updated_at');

        // 期程 (短、長)
        if($request->has('d_duration')){
            $query->where('d_duration',$request->d_duration);
        }

        // 發案地點
        if($request->has('d_active_location')){
            $query->whereIn('d_active_location',explode(',',$request->d_active_location));
        }

        // 案件金額
        if($request->has('d_amount')){
            $query->whereIn('d_amount',$request->d_amount);
        }

        // 排序
        // if($request->has('order')){
        //     $order = $request->order;
        //     switch($order){
        //             // 最新刊登
        //             case '1':
        //                 $query->orderBy('created_at','desc');
        //                 break;

        //             // 最近更新
        //             case '2':
        //                 $query->orderBy('updated_at','desc');
        //                 break;

        //             // 預算由低到高
        //             case '3':
        //                 $query->orderBy('d_amount','desc');
        //                 break;
        //             // case '4':
        //                 //接案人數
        //             default:
        //                 $query->orderBy('created_at', 'desc');

        //         }
        // }else{ $query->orderBy('created_at', 'desc');}

        $order = $request->order;
        switch($order){
            // 最新刊登
            case '1':
                $query->orderBy('created_at','desc');
                break;

            // 最近更新
            case '2':
                $query->orderBy('updated_at','desc');
                break;

            // 預算由高到低
            case '3':
                $query->orderBy('d_amount','desc');
                break;
            // case '4':
                //接案人數
            default:
                $query->orderBy('created_at', 'desc');
            }

        $demands = $query->get();

        // 案件更新時間
        foreach($demands as $demand){
            $updateAt = new \DateTime($demand->updated_at);
            $now = new \DateTime('now',new \DateTimeZone('Asia/Taipei'));
            $interval = $updateAt->diff($now);
            // if($interval->h < 1 && $interval->d <1){
            //     $difference = $interval -> i . '分鐘前';
            // }elseif($interval->d < 1 && $interval-> h > 1){
            //     $difference = '今天更新';
            // }else{
            //     $difference = $updateAt->format('Y-m-d');
            // }
            if($interval->h < 1 && $interval->d < 1){
                $difference = $interval->i . '分鐘前更新';
            }elseif($interval->d > 1){
                $difference = $interval->d . '天前更新';
            }

            $demand->updated_at = $difference;
        }
        return response()->json($demands);

    }

}
