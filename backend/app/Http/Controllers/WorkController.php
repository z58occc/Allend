<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WorkController extends Controller
{
    public function __invoke(Request $request)
    {
        $work_name = $request->work_name;
        $work_context = $request->work_context;

        if(isset($request->image)){
            $data = $request->image ->get();
            $mime_type = $request->image->getMimeType();
            $imageData = base64_encode($data);
            $src = "data: $mime_type;base64,$imageData";
        }
    }
}
