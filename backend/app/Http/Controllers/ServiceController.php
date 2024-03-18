<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function __invoke(Request $request)
    {
        $Service_name = $request->Case_name;
        $Service_type = $request->Case_type;
        $LenghDate =$request->LenghDate;
        $Money = $request->Money;
        $Place = $request ->Place;

        if(isset($request->image)){
            $data = $request->image ->get();
            $mime_type = $request->image->getMimeType();
            $imageData = base64_encode($data);
            $src = "data: $mime_type;base64,$imageData";
        }
        return response($Money);
    }
}
