<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    public function __invoke(Request $request)
    {
        // $Service_name = $request->Case_name;
        // $Service_type = $request->Case_type;
        // $LenghDate =$request->LenghDate;
        // $Money = $request->Money;
        // $Place = $request ->Place;

        $this->validate($request,[
            's_name'=>['required'], //服務名稱
            's_type'=>['required'], //類別
            's_description'=>['required'],//描述
            's_amount'=>['required'],//金額
            's_unit'=>['required'],
            's_active_location'=>['required'],//地點
        ]);

        if(isset($request->image)){
            $data = $request->image ->get();
            $mime_type = $request->image->getMimeType();
            $imageData = base64_encode($data);
            // $src = "data: $mime_type;base64,$imageData";
        }

        $type = $request['s_type'];
        $catid = DB::table('category')->where('type',$type)->Value('catid');

        $active_location = $request['s_active_location'];
        $country = DB::table('country')->where('country_city',$active_location)->value('country_id');

        $service = DB::table('service')->insert([
            's_name'=>$request['s_name'],
            's_type'=>$catid,
            's_description'=>$request['s_description'],
            's_amount'=>$request['s_amount'],
            's_unit'=>$request['s_unit'],
            's_active_location'=>$country,
            'image'=>$imageData,
            'created_at'=>now(),
            'updated_at'=>now(),
        ]);
        return response($service);
}
}