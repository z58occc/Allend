<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UpdateProjectController extends Controller
{
    public function __invoke(Request $request)
    {
        if (isset($request->image)) {
            $data = $request->image->get();
            $mime_type = $request->image->getMimeType();
            $imageData = base64_encode($data);
            // $src = "data: $mime_type;base64,$imageData";
        }
        $update = DB::table('project')->where('pid', $request->pid)->update([
            'image' => $imageData,
            'p_name'=> $request->p_name,
            'p_description'=> $request->p_description,
        ]);

        return response($update);
    }
}
