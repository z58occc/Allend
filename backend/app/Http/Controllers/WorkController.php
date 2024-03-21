<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WorkController extends Controller
{
    public function __invoke(Request $request)
    {

        $this->validate($request,[
            'p_name'=>['required'],
            'p_description'=>['required']
        ]);

        if(isset($request->image)){
            $data = $request->image->get();
            $mime_type = $request->image->getMimeType();
            $imageData = base64_encode($data);
            // $src = "data: $mime_type;base64,$imageData";
        }
        $work = DB::table('project')->insert([
            'p_name'=>$request['p_name'],
            'p_description'=>$request['p_description'],
            'image'=>$imageData,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        return response($work);
    }
}
