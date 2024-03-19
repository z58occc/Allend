<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// Removed unused import statement

class CommitController extends Controller
{
    public function __invoke(Request $request)
    {

        // $d_name = $request->d_name;
        // $d_type = $request->d_type;
        // $LenghDate =$request->LenghDate;
        // $Money = $request->Money;
        // $d_required = $request->d_required;
        // $Place = $request ->Place;
        // $commit_content = $request->commit_content;
        // $commit_email = $request->commit_email;
        // $commit_phone = $request->phone;
        // $commit_date = $request->commit_date;
        // $commit_unit = $request->unit;

            $this->validate($request,[
            'd_name'=>['required', 'max:255'], //案件名稱
            'd_required' => ['required'], //人數
            'd_type' => ['required'], //案件類型
            'd_duration' =>[ 'required'], //期程
            'd_description' => ['required'],//案件描述
            'd_amount' =>['required'],//金額
            'd_unit'=>['required'],//單位
            'd_active_location'=>['required'],//地點
        ]); 

        $type=$request['d_type'];
        $catid = DB::table('category')->where('type',$type)->value('catid');

        $active_location = $request['d_active_location'];
        $country = DB::table('country')->where('country_city',$active_location)->value('country_id');

        $commit = DB::table('demmand')->insert([
            'd_name'=>$request['d_name'],
            'd_required'=>$request['d_required'],
            'd_type'=>$catid,
            'd_duration'=>$request['d_duration'],
            'd_description'=>$request['d_description'],
            'd_amount'=>$request['d_amount'],
            'd_unit'=>$request['d_unit'],
            'd_active_location'=>$country,
            'created_at'=>now(),
        ]);
        return response($commit);
    }
}