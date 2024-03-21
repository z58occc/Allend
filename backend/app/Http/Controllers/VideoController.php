<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VideoController extends Controller
{
    public function __invoke(Request $request)
    {

        $this->validate($request,[
            'v_name'=>['required'],
            'v_description'=>['required'],
            'src'=>['required']
        ]);

        $video = DB::table('video')->insert([
            'v_name'=> $request['v_name'],
            'v_description' =>$request['v_description'],
            'src'=>$request['src'],
            'created_at'=>now(),
            'updated_at'=>now(),
        ]);
        return response($video);
    }
}
