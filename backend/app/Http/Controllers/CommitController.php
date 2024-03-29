<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommitController extends Controller
{
    public function __invoke(Request $request)
    {
        $mid = Auth::id();
        $this->validate($request,[
            'd_name' => ['required', 'max:255'], //案件名稱
            'd_type' => 'required', //案件類型
            'd_duration' => 'required', //期程
            'd_description' => 'required',//案件描述
            'd_amount' => 'required',//金額
            'd_unit' => 'required',//單位
            'd_active_location' => 'required',//地點
            'd_contact_name' => 'required', // 聯絡人姓名
            'd_email' => ['required', 'email'], // 聯絡人email
            'd_mobile_phone' => ['required', 'max:10'] // 聯絡人phone
        ]);

        $type = $request->d_type;
        $category_id = DB::table('category')->where('type',$type)->value('catid');

        $active_location = $request->d_active_location;
        $country = DB::table('country')->where('country_city',$active_location)->value('country_id');

        $commit = DB::table('demmand')->insert([
            'mid' => $mid,
            'd_name'=>$request->d_name,
            'd_type'=>$category_id,
            'd_duration'=>$request->d_duration,
            'd_description'=>$request->d_description,
            'd_amount'=>$request->d_amount,
            'd_unit'=>$request->d_unit,
            'd_active_location'=>$country,
            'created_at'=>now(),
            'updated_at'=>now(),
        ]);
        return response()->json([
            'message' => '發案成功'
        ]);
    }
}
